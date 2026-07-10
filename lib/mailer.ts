import nodemailer from "nodemailer";
import { decryptSecret, getSettings, type Settings } from "@/lib/settings";

/**
 * Envío de emails vía el SMTP configurado en /admin/ajustes.
 *
 * Modos TLS:
 *  - auto: SSL implícito solo en el puerto 465; en el resto, STARTTLS
 *    oportunista (lo habitual en el 587).
 *  - ssl: TLS implícito desde el primer byte (típico 465).
 *  - starttls: conexión en claro que DEBE elevarse a TLS (falla si el
 *    servidor no soporta STARTTLS).
 */

function buildTransport(s: Settings) {
  if (!s.smtpHost) throw new Error("No hay servidor SMTP configurado.");
  const port = Number(s.smtpPort ?? 587);
  const mode = s.smtpTls ?? (s.smtpSecure === "true" ? "ssl" : "auto");
  const secure = mode === "ssl" || (mode === "auto" && port === 465);

  return nodemailer.createTransport({
    host: s.smtpHost,
    port,
    secure,
    requireTLS: mode === "starttls",
    auth: s.smtpUser
      ? { user: s.smtpUser, pass: decryptSecret(s.smtpPass ?? "") }
      : undefined,
    // fallar rápido con un error legible, no colgarse
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
  });
}

function sender(s: Settings): string {
  return s.smtpFrom || s.smtpUser || s.notifyEmail || "";
}

export async function sendContactNotification(msg: {
  name: string;
  email: string;
  subject: string | null;
  body: string;
}) {
  const s = await getSettings();
  if (!s.smtpHost || !s.notifyEmail) return;

  await buildTransport(s).sendMail({
    from: sender(s),
    to: s.notifyEmail,
    replyTo: msg.email,
    // envelope explícito: evita que el MTA rellene MAILER-DAEMON como MAIL FROM
    envelope: { from: sender(s), to: s.notifyEmail },
    subject: `[alejandrolamas.es] ${msg.subject || "Nuevo mensaje"} — ${msg.name}`,
    text: `Nombre: ${msg.name}\nEmail: ${msg.email}\n\n${msg.body}`,
  });
}

/** Prueba de configuración: verifica la conexión y envía un correo de test. */
export async function sendTestEmail(): Promise<string> {
  const s = await getSettings();
  if (!s.smtpHost) throw new Error("Falta el servidor SMTP. Guarda los ajustes primero.");
  if (!s.notifyEmail) throw new Error("Falta el email de destino. Guarda los ajustes primero.");

  const transport = buildTransport(s);
  await transport.verify();
  const info = await transport.sendMail({
    from: sender(s),
    to: s.notifyEmail,
    envelope: { from: sender(s), to: s.notifyEmail },
    subject: "[alejandrolamas.es] Correo de prueba",
    text: `La configuración SMTP funciona.\n\nServidor: ${s.smtpHost}:${s.smtpPort ?? 587}\nRemitente: ${sender(s)}\n\nLos mensajes del formulario de contacto llegarán a esta dirección.`,
  });
  return info.response ?? "aceptado";
}
