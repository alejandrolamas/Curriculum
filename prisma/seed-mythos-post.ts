/** Publica el artículo sobre Claude Mythos 5. Idempotente (upsert). */
import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });

const content = `El 9 de junio de 2026 Anthropic hizo algo inusual en la industria de la IA: lanzó su modelo más potente dos veces. El mismo cerebro, dos puertas de entrada. **Claude Fable 5** para todo el mundo, con salvaguardas reforzadas; y **Claude Mythos 5** para un grupo reducido de organizaciones autorizadas, con parte de esas salvaguardas retiradas. Esta es la historia de la clase Mythos: qué es, quién puede usarla, el mes de drama regulatorio que vivió, y —lo más interesante— lo que ya está aportando en ciencia y ciberseguridad.

## Qué es la clase Mythos

Hasta 2026, la jerarquía de modelos de Claude era conocida: Haiku (rápido), Sonnet (equilibrado) y Opus (el tope de gama). La clase **Mythos** se estrenó como un escalón por encima de Opus: modelos cuya capacidad es tan alta que Anthropic decidió que no podían publicarse "tal cual".

La solución fue partir el lanzamiento en dos:

- **Fable 5**: el modelo Mythos "domesticado" para uso general. Salvaguardas adicionales en capacidades de doble uso (las que sirven tanto para defender como para atacar: ciberseguridad ofensiva, biología avanzada…). Es el modelo que cualquiera puede usar hoy en Claude.ai, la API o Claude Code.
- **Mythos 5**: el mismo modelo subyacente, con salvaguardas retiradas en áreas concretas, disponible solo para organizaciones aprobadas.

Según Anthropic, Fable 5 es estado del arte en prácticamente todos los benchmarks: ingeniería de software, trabajo de conocimiento, visión, análisis financiero e investigación científica. Y Mythos 5 es, en palabras de la propia compañía, **el modelo con las capacidades de ciberseguridad más potentes del mundo**.

## Quién tiene acceso a Mythos 5

Aquí está la parte más novedosa del experimento. El acceso a Mythos 5 no se compra: se aprueba.

- **Project Glasswing**: una colaboración con el gobierno de Estados Unidos que da acceso a *ciberdefensores* — organizaciones que operan y defienden infraestructura crítica (energía, agua, telecomunicaciones, sanidad).
- **Programa de acceso confiable**: en expansión gradual hacia organizaciones aprobadas de ciberseguridad y **biomedicina**.

La lógica es la de un principio clásico de seguridad: las capacidades que pueden usarse para atacar deben llegar antes (y con ventaja) a quienes defienden.

## Un mes de junio de película

La historia no fue un lanzamiento tranquilo:

- **9 de junio**: lanzamiento de Fable 5 y Mythos 5, a 10 $/millón de tokens de entrada y 50 $/millón de salida — menos de la mitad que el Mythos Preview anterior.
- **12 de junio**: investigadores de Amazon descubren un método para eludir los controles de seguridad de Fable 5 pidiéndole identificar vulnerabilidades de software. El gobierno estadounidense aplica **controles de exportación** al modelo y Anthropic suspende el acceso globalmente, al no poder verificar la nacionalidad de los usuarios en tiempo real.
- **26 de junio**: el gobierno aprueba restaurar Mythos 5 para organizaciones estadounidenses de defensa de infraestructura crítica.
- **30 de junio**: se levantan los controles de exportación; el 1 de julio Fable 5 vuelve a estar disponible globalmente, con una corrección de seguridad y nuevos límites de uso.

De ese episodio salieron cuatro compromisos formales entre Anthropic y el gobierno de EE. UU.: acceso pre-lanzamiento a modelos frontera, intercambio rápido de información sobre jailbreaks, investigación conjunta y estándares voluntarios comunes para la industria.

## Lo que ya ha aportado: ciencia y defensa

Es pronto — el modelo tiene semanas — pero los primeros resultados documentados apuntan alto:

**Diseño de fármacos.** Según Anthropic, Mythos 5 identificó candidatos sólidos de diseño de fármacos en **nueve de catorce dianas proteicas** evaluadas, y produce hipótesis moleculares novedosas que los evaluadores prefirieron en torno al **80% de las veces** frente a las de los modelos de clase Opus.

**Investigación genómica autónoma.** En una demostración, el modelo condujo investigación genómica de forma autónoma durante **una semana**, produciendo modelos computacionales unas **100 veces más pequeños** que los publicados en la revista *Science* para el mismo problema. Es el tipo de resultado que sugiere que la IA puede comprimir meses de trabajo de laboratorio computacional.

**Ciberdefensa real.** El caso más tangible no es de laboratorio: el **Gobierno de Alberta** (Canadá) lleva desde 2025 usando Claude Code para revisar sus sistemas, encontrar vulnerabilidades y repararlas. Con Mythos 5, ese mismo flujo de trabajo se aplica ahora a infraestructura crítica estadounidense dentro de Project Glasswing: encontrar los agujeros antes que los atacantes.

**Biomedicina.** La expansión del programa de acceso a organizaciones biomédicas apunta a diseño de proteínas y desarrollo de terapias — el área donde un modelo con menos filtros sobre biología avanzada puede acelerar de verdad, y también la razón por la que ese acceso se concede con cuentagotas.

## Mi lectura

Como técnico, lo que más me interesa de Mythos 5 no es el benchmark sino el **modelo de gobernanza**: aceptar que una misma capacidad es medicina o veneno según quién la use, y construir la infraestructura institucional (verificación, programas de acceso, compromisos con reguladores) para repartirla de forma asimétrica a favor de la defensa. Es incómodo, imperfecto y probablemente inevitable: los modelos no van a volverse menos capaces.

Para los que trabajamos en producto y e-commerce, la consecuencia práctica es más sencilla: Fable 5 —la versión pública de esa misma inteligencia— ya escribe, revisa y depura código a un nivel que hace un año parecía ciencia ficción. Esta misma web, con su panel de administración y su escudo anti-bots, se construyó con su ayuda.

---

*Fuentes: [anuncio oficial de Claude Fable 5 y Mythos 5](https://www.anthropic.com/news/claude-fable-5-mythos-5), [redespliegue de Fable 5](https://www.anthropic.com/news/redeploying-fable-5) y [CNBC sobre el levantamiento de los controles de exportación](https://www.cnbc.com/2026/06/30/anthropic-says-trump-admin-has-lifted-export-controls-on-claude-fable-5-and-mythos-5.html). Los resultados científicos citados son los reportados por Anthropic en sus anuncios.*`;

async function main() {
  const post = await db.post.upsert({
    where: { slug: "claude-mythos-5-historia-y-avances" },
    update: { content },
    create: {
      slug: "claude-mythos-5-historia-y-avances",
      title:
        "Claude Mythos 5: la IA que no se vende, se aprueba — historia, acceso y primeros avances",
      excerpt:
        "Anthropic lanzó su modelo más potente en dos versiones: Fable 5 para todos y Mythos 5 solo para organizaciones aprobadas. Qué es la clase Mythos, el drama regulatorio de junio de 2026 y lo que ya está aportando en diseño de fármacos, genómica y ciberdefensa.",
      content,
      tags: ["Inteligencia Artificial", "Anthropic", "Ciberseguridad", "Ciencia"],
      readTime: "14 min",
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
