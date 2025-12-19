import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting simple (en memoria - para producción usar Redis)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const RATE_LIMIT_MAX_REQUESTS = 3; // Máximo 3 requests por minuto

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Validar el captcha (suma simple)
function validateCaptcha(
  num1: number,
  num2: number,
  answer: number,
  timestamp: number
): boolean {
  // Verificar que no haya pasado más de 5 minutos
  const now = Date.now();
  if (now - timestamp > 5 * 60 * 1000) {
    return false;
  }

  // Verificar la respuesta
  return num1 + num2 === answer;
}

// Configurar transporter de Nodemailer
function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function POST(request: Request) {
  try {
    // Obtener IP para rate limiting
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "unknown";

    // Verificar rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Demasiados intentos. Espera un momento antes de volver a intentar." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const {
      name,
      email,
      phone,
      company,
      subject,
      message,
      honeypot,
      captchaNum1,
      captchaNum2,
      captchaAnswer,
      captchaTimestamp,
    } = body;

    // Honeypot check - si tiene valor, es un bot
    if (honeypot) {
      // Responder success pero no hacer nada
      return NextResponse.json({ success: true });
    }

    // Validar campos requeridos
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Email inválido" },
        { status: 400 }
      );
    }

    // Validar captcha
    if (
      !validateCaptcha(
        captchaNum1,
        captchaNum2,
        parseInt(captchaAnswer),
        captchaTimestamp
      )
    ) {
      return NextResponse.json(
        { error: "Verificación de seguridad incorrecta" },
        { status: 400 }
      );
    }

    // Preparar el email
    const transporter = getTransporter();

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_FROM}>`,
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #C1DF1F 0%, #00D4FF 100%); padding: 30px; text-align: center;">
            <h1 style="margin: 0; color: #0a0a0f; font-size: 24px;">📨 Nuevo Mensaje</h1>
            <p style="margin: 10px 0 0; color: #0a0a0f; opacity: 0.8;">desde alejandrolamas.es</p>
          </div>
          
          <div style="padding: 30px;">
            <div style="background: rgba(193, 223, 31, 0.1); border-left: 3px solid #C1DF1F; padding: 15px; margin-bottom: 20px; border-radius: 0 8px 8px 0;">
              <p style="margin: 0; color: #888;"><strong style="color: #C1DF1F;">De:</strong></p>
              <p style="margin: 5px 0 0; font-size: 18px;">${name}</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                  <span style="color: #888;">Email:</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                  <a href="mailto:${email}" style="color: #00D4FF; text-decoration: none;">${email}</a>
                </td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                  <span style="color: #888;">Teléfono:</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                  <a href="tel:${phone}" style="color: #00D4FF; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              ` : ''}
              ${company ? `
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                  <span style="color: #888;">Empresa:</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                  ${company}
                </td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                  <span style="color: #888;">Asunto:</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #222;">
                  <strong>${subject}</strong>
                </td>
              </tr>
            </table>
            
            <div style="background: #111; border-radius: 8px; padding: 20px; margin-top: 20px;">
              <p style="color: #888; margin: 0 0 10px; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Mensaje:</p>
              <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          
          <div style="background: #111; padding: 20px; text-align: center; border-top: 1px solid #222;">
            <p style="margin: 0; color: #666; font-size: 12px;">
              📍 IP: ${ip} | 🕐 ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
            </p>
          </div>
        </div>
      `,
      text: `
Nuevo mensaje desde alejandrolamas.es

De: ${name}
Email: ${email}
${phone ? `Teléfono: ${phone}` : ''}
${company ? `Empresa: ${company}` : ''}
Asunto: ${subject}

Mensaje:
${message}

---
IP: ${ip}
Fecha: ${new Date().toLocaleString('es-ES', { timeZone: 'Europe/Madrid' })}
      `,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Error al enviar el mensaje. Inténtalo de nuevo más tarde." },
      { status: 500 }
    );
  }
}
