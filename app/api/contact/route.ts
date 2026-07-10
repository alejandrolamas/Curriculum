import { NextRequest, NextResponse, after } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashIp, verifyCaptcha } from "@/lib/captcha";
import { sendContactNotification } from "@/lib/mailer";

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "0.0.0.0";
}

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().max(140).optional().default(""),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(0), // honeypot: siempre vacío para humanos
  token: z.string().min(10).max(2000),
  solution: z.string().min(1).max(12),
});

const MAX_MESSAGES_PER_HOUR = 5;

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);
    const body = await req.json().catch(() => null);
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      // Honeypot relleno u otro fallo de validación: si el honeypot tiene
      // contenido respondemos 200 silencioso para no dar pistas al bot.
      const honeypotHit =
        body && typeof body === "object" && "website" in body &&
        typeof (body as Record<string, unknown>).website === "string" &&
        ((body as Record<string, unknown>).website as string).length > 0;
      if (honeypotHit) return NextResponse.json({ ok: true });
      return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
    }

    const { name, email, subject, message, token, solution } = parsed.data;

    // Captcha PoW: firma + un solo uso + dificultad + time-trap + IP
    const captcha = await verifyCaptcha(ip, token, solution);
    if (!captcha.ok) {
      return NextResponse.json(
        { error: captcha.reason },
        { status: captcha.status },
      );
    }

    // Rate limit de mensajes por IP
    const ipHashed = hashIp(ip);
    const hourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recent = await db.message.count({
      where: { ipHash: ipHashed, createdAt: { gte: hourAgo } },
    });
    if (recent >= MAX_MESSAGES_PER_HOUR) {
      return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    }

    await db.message.create({
      data: {
        name,
        email,
        subject: subject || null,
        body: message,
        ipHash: ipHashed,
        userAgent: req.headers.get("user-agent")?.slice(0, 250) ?? null,
      },
    });

    // Notificación por email tras responder. `after()` garantiza que la
    // función serverless no se congele antes de completar el envío.
    after(async () => {
      try {
        await sendContactNotification({
          name,
          email,
          subject: subject || null,
          body: message,
        });
      } catch (e) {
        console.error("smtp notify error", e);
      }
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("contact error", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
