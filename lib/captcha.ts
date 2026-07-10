/**
 * Captcha proof-of-work multicapa (sin servicios externos):
 *
 *  1. El servidor emite un desafío firmado (HMAC) de un solo uso, ligado a IP.
 *  2. El cliente quema CPU buscando `solution` tal que
 *     sha256(`${nonce}:${solution}`) empiece con N bits a cero.
 *  3. Al enviar: firma válida + nonce no usado (atómico) + PoW verificado
 *     + honeypot vacío + tiempo mínimo desde emisión + rate limit por IP.
 *
 * Un bot que ataque el endpoint directamente necesita resolver un desafío
 * nuevo por mensaje, no puede reutilizarlos y tiene cuota por IP.
 */
import { createHmac, createHash, randomBytes, timingSafeEqual } from "crypto";
import { db } from "@/lib/db";

const CHALLENGE_TTL_MS = 5 * 60 * 1000;
const MIN_ELAPSED_MS = 2500;
export const BASE_DIFFICULTY = 16; // bits a cero (~65k hashes, <1s en cliente)

function secret(): string {
  const s = process.env.CAPTCHA_SECRET;
  if (!s) throw new Error("CAPTCHA_SECRET no configurado");
  return s;
}

export function hashIp(ip: string): string {
  return createHash("sha256").update(`${ip}|${secret()}`).digest("hex").slice(0, 32);
}

export interface ChallengePayload {
  nonce: string;
  difficulty: number;
  iat: number;
  exp: number;
  ip: string; // ipHash
}

function sign(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("base64url");
}

export function encodeToken(payload: ChallengePayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export function decodeToken(token: string): ChallengePayload | null {
  const [body, mac] = token.split(".");
  if (!body || !mac) return null;
  const expected = sign(body);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as ChallengePayload;
    if (typeof payload.nonce !== "string" || typeof payload.difficulty !== "number") {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

/** Dificultad adaptativa: sube con la actividad reciente de la IP. */
export async function adaptiveDifficulty(ipHash: string): Promise<number> {
  const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000);
  const recent = await db.captchaChallenge.count({
    where: { ipHash, createdAt: { gte: tenMinAgo } },
  });
  // +1 bit por cada 2 desafíos recientes: duplica el coste cada 2 intentos
  return Math.min(BASE_DIFFICULTY + Math.floor(recent / 2), 24);
}

export async function issueChallenge(ip: string) {
  const ipHash = hashIp(ip);

  // Cuota de emisión: 12 desafíos / 10 min por IP
  const tenMinAgo = new Date(Date.now() - 10 * 60 * 1000);
  const issued = await db.captchaChallenge.count({
    where: { ipHash, createdAt: { gte: tenMinAgo } },
  });
  if (issued >= 12) return null;

  const difficulty = await adaptiveDifficulty(ipHash);
  const nonce = randomBytes(16).toString("hex");
  const now = Date.now();
  const payload: ChallengePayload = {
    nonce,
    difficulty,
    iat: now,
    exp: now + CHALLENGE_TTL_MS,
    ip: ipHash,
  };

  await db.captchaChallenge.create({
    data: {
      nonce,
      ipHash,
      difficulty,
      expiresAt: new Date(payload.exp),
    },
  });

  return { token: encodeToken(payload), nonce, difficulty, iat: now };
}

function leadingZeroBits(hash: Buffer): number {
  let bits = 0;
  for (const byte of hash) {
    if (byte === 0) {
      bits += 8;
      continue;
    }
    bits += Math.clz32(byte) - 24;
    break;
  }
  return bits;
}

export function verifyPow(nonce: string, solution: string, difficulty: number): boolean {
  if (!/^[0-9]{1,12}$/.test(solution)) return false;
  const digest = createHash("sha256").update(`${nonce}:${solution}`).digest();
  return leadingZeroBits(digest) >= difficulty;
}

export type CaptchaResult =
  | { ok: true }
  | { ok: false; reason: string; status: number };

/** Verificación completa del captcha en el envío. Consume el nonce. */
export async function verifyCaptcha(
  ip: string,
  token: string,
  solution: string,
): Promise<CaptchaResult> {
  const payload = decodeToken(token);
  if (!payload) return { ok: false, reason: "captcha_invalid", status: 400 };

  const now = Date.now();
  if (now > payload.exp) return { ok: false, reason: "captcha_expired", status: 410 };
  if (now - payload.iat < MIN_ELAPSED_MS) {
    return { ok: false, reason: "too_fast", status: 429 };
  }
  if (payload.ip !== hashIp(ip)) {
    return { ok: false, reason: "captcha_ip_mismatch", status: 400 };
  }
  if (!verifyPow(payload.nonce, solution, payload.difficulty)) {
    return { ok: false, reason: "captcha_wrong", status: 400 };
  }

  // Un solo uso: update atómico sobre nonce sin usar
  const consumed = await db.captchaChallenge.updateMany({
    where: { nonce: payload.nonce, usedAt: null, expiresAt: { gte: new Date() } },
    data: { usedAt: new Date() },
  });
  if (consumed.count !== 1) {
    return { ok: false, reason: "captcha_reused", status: 409 };
  }

  return { ok: true };
}

/** Limpieza oportunista de desafíos caducados (se llama al emitir). */
export async function pruneChallenges() {
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  await db.captchaChallenge.deleteMany({ where: { createdAt: { lt: dayAgo } } });
}
