/** Publica el artículo sobre el escudo anti-bots. Idempotente (upsert). */
import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

const content = `Los captchas clásicos tienen un problema: castigan al humano para frenar a la máquina. Marcar semáforos, descifrar letras torcidas, depender de un servicio de terceros que rastrea a tus usuarios… Hay una alternativa elegante que uso en el formulario de esta web: **proof-of-work**. El navegador del visitante resuelve un pequeño desafío criptográfico invisible. Para una persona son ~200 ms de CPU que ni nota; para un bot que quiera spamear, es un coste computacional por cada mensaje que convierte el ataque en algo carísimo.

En este artículo te cuento la arquitectura completa, con código, para que la implementes en tu web. Sin dependencias externas: solo Web Crypto API en el cliente y HMAC en el servidor.

## Las capas del escudo

Una sola defensa siempre se puede saltar. El escudo funciona porque apila seis, y todas se verifican en el servidor:

1. **Desafío firmado (HMAC)**: el servidor emite un token con nonce, dificultad, timestamp y huella de IP, firmado con un secreto. Nadie puede fabricar ni manipular desafíos.
2. **Proof-of-work**: el cliente busca por fuerza bruta una solución cuyo hash SHA-256 empiece por N bits a cero.
3. **Un solo uso**: cada nonce se consume de forma atómica en base de datos. Reenviar un desafío resuelto devuelve un 409.
4. **Time-trap**: si el envío llega demasiado pronto tras emitir el desafío (menos de ~2,5 s), se rechaza. Ningún humano rellena un formulario en milisegundos.
5. **Honeypot**: un campo invisible para humanos. Si llega relleno, el servidor responde un 200 falso y descarta el mensaje sin dar pistas.
6. **Rate limiting por IP**: cuota de desafíos emitidos y de mensajes aceptados por ventana de tiempo, persistida en base de datos (sobrevive a reinicios y funciona en serverless).

## Emitir el desafío

El endpoint \`POST /api/captcha\` genera un nonce aleatorio, lo guarda con su caducidad y devuelve un token firmado:

\`\`\`typescript
import { createHmac, randomBytes } from "crypto";

function sign(data: string): string {
  return createHmac("sha256", process.env.CAPTCHA_SECRET!)
    .update(data)
    .digest("base64url");
}

export function encodeToken(payload: ChallengePayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return \`\${body}.\${sign(body)}\`;
}

// payload: { nonce, difficulty, iat, exp, ip: hashIp(ip) }
\`\`\`

La IP se guarda como hash con sal (nunca en claro) y sirve para ligar el desafío a quien lo pidió: un bot no puede pedir desafíos desde una IP y gastarlos desde otra.

## Resolver el proof-of-work en el navegador

El cliente busca un número \`solution\` tal que \`sha256(nonce + ":" + solution)\` empiece por \`difficulty\` bits a cero:

\`\`\`typescript
export async function solvePow(nonce: string, difficulty: number) {
  const encoder = new TextEncoder();
  for (let candidate = 0; ; candidate++) {
    const data = encoder.encode(\`\${nonce}:\${candidate}\`);
    const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", data));
    if (leadingZeroBits(hash) >= difficulty) return String(candidate);
    // cede el hilo cada 2048 intentos para no congelar la UI
    if ((candidate & 2047) === 0) await new Promise(r => setTimeout(r, 0));
  }
}
\`\`\`

Con dificultad 16 son ~65.000 hashes: unos 100-300 ms en cualquier dispositivo moderno. El usuario no ve nada; como mucho, un indicador de "verificando" que ya está en verde cuando termina de escribir su mensaje.

## Verificar en el servidor

Al recibir el formulario, el servidor comprueba **todo** de nuevo:

\`\`\`typescript
export async function verifyCaptcha(ip: string, token: string, solution: string) {
  const payload = decodeToken(token);           // firma HMAC válida
  if (!payload) return fail("captcha_invalid");
  if (Date.now() > payload.exp) return fail("captcha_expired");
  if (Date.now() - payload.iat < 2500) return fail("too_fast");     // time-trap
  if (payload.ip !== hashIp(ip)) return fail("ip_mismatch");
  if (!verifyPow(payload.nonce, solution, payload.difficulty))
    return fail("captcha_wrong");

  // un solo uso: update atómico sobre el nonce sin consumir
  const consumed = await db.captchaChallenge.updateMany({
    where: { nonce: payload.nonce, usedAt: null, expiresAt: { gte: new Date() } },
    data: { usedAt: new Date() },
  });
  if (consumed.count !== 1) return fail("captcha_reused");          // replay

  return { ok: true };
}
\`\`\`

El \`updateMany\` condicional es la clave del "un solo uso": aunque dos peticiones lleguen a la vez con el mismo token, solo una consigue consumir el nonce.

## Dificultad adaptativa

Si una IP pide muchos desafíos seguidos, el coste sube solo:

\`\`\`typescript
const recent = await db.captchaChallenge.count({
  where: { ipHash, createdAt: { gte: hace10min } },
});
const difficulty = Math.min(16 + Math.floor(recent / 2), 24);
\`\`\`

Cada bit extra **duplica** el trabajo. Un visitante normal nunca pasa de 16; un bot insistente se encuentra la puerta cada vez más pesada, hasta 256 veces más cara.

## Los detalles que marcan la diferencia

- **El honeypot responde 200.** Si el campo trampa llega relleno, devuelve éxito falso y descarta. El bot cree que funcionó y no muta su estrategia.
- **Rate limiting en base de datos, no en memoria.** En serverless cada invocación puede ser un proceso nuevo: un contador en memoria no sirve de nada.
- **Comparación de firmas en tiempo constante** (\`timingSafeEqual\`) para evitar ataques de temporización.
- **Caducidad corta** (5 minutos) y limpieza periódica de desafíos viejos.
- **El endpoint queda protegido igual que el formulario**: atacar \`/api/contact\` directamente exige pedir desafío, quemarlo en CPU y respetar las cuotas. No hay atajo.

## ¿Qué NO resuelve esto?

Honestidad: el proof-of-work no detiene a un atacante humano que escriba spam a mano, ni a una granja con mucho hardware dispuesta a pagar el coste. Para un portfolio o una web corporativa, ese atacante no existe: el spam real viene de bots baratos que disparan formularios a miles de webs por hora, y a esos el coste por mensaje los expulsa. Si tu caso es banca u operas con incentivos económicos fuertes, necesitarás señales adicionales.

La recompensa: formularios sin fricción para las personas, sin cookies de terceros, sin enviar datos de tus usuarios a nadie, y una bandeja de entrada limpia.`;

async function main() {
  const post = await db.post.upsert({
    where: { slug: "escudo-anti-bots-proof-of-work" },
    update: { content },
    create: {
      slug: "escudo-anti-bots-proof-of-work",
      title:
        "Un escudo anti-bots sin captchas: proof-of-work en tu formulario de contacto",
      excerpt:
        "Cómo proteger un formulario (y su endpoint) con desafíos criptográficos invisibles: HMAC, proof-of-work, honeypot, time-trap y rate limiting. Sin servicios de terceros y con el código completo.",
      content,
      tags: ["Seguridad", "Next.js", "Anti-spam", "Tutorial"],
      readTime: "12 min",
      featured: true,
      published: true,
      publishedAt: new Date(),
    },
  });
  console.log("Post publicado:", post.slug);
  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
