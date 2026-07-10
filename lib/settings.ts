import { createCipheriv, createDecipheriv, createHash, randomBytes } from "crypto";
import { db } from "@/lib/db";

/**
 * Ajustes clave-valor del sitio (SMTP, analytics…).
 * La contraseña SMTP se guarda cifrada (AES-256-GCM) con una clave derivada
 * de SESSION_SECRET.
 */

export const SETTING_KEYS = [
  "notifyEmail",
  "smtpHost",
  "smtpPort",
  "smtpUser",
  "smtpPass",
  "smtpSecure",
  "smtpTls",
  "smtpFrom",
  "analyticsCode",
] as const;

export type SettingKey = (typeof SETTING_KEYS)[number];
export type Settings = Partial<Record<SettingKey, string>>;

function encKey(): Buffer {
  const s = process.env.SESSION_SECRET;
  if (!s) throw new Error("SESSION_SECRET no configurado");
  return createHash("sha256").update(`settings|${s}`).digest();
}

export function encryptSecret(plain: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", encKey(), iv);
  const enc = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  return `enc:${iv.toString("base64url")}.${cipher.getAuthTag().toString("base64url")}.${enc.toString("base64url")}`;
}

export function decryptSecret(stored: string): string {
  if (!stored.startsWith("enc:")) return stored;
  try {
    const [iv, tag, data] = stored.slice(4).split(".");
    const decipher = createDecipheriv("aes-256-gcm", encKey(), Buffer.from(iv, "base64url"));
    decipher.setAuthTag(Buffer.from(tag, "base64url"));
    return Buffer.concat([
      decipher.update(Buffer.from(data, "base64url")),
      decipher.final(),
    ]).toString("utf8");
  } catch {
    return "";
  }
}

export async function getSettings(): Promise<Settings> {
  const rows = await db.setting.findMany();
  const out: Settings = {};
  for (const row of rows) {
    if ((SETTING_KEYS as readonly string[]).includes(row.key)) {
      out[row.key as SettingKey] = row.value;
    }
  }
  return out;
}

export async function setSetting(key: SettingKey, value: string) {
  if (!value) {
    await db.setting.deleteMany({ where: { key } });
    return;
  }
  await db.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value },
  });
}
