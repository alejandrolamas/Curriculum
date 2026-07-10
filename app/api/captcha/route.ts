import { NextRequest, NextResponse } from "next/server";
import { issueChallenge, pruneChallenges } from "@/lib/captcha";

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "0.0.0.0";
}

export async function POST(req: NextRequest) {
  try {
    const challenge = await issueChallenge(clientIp(req));
    if (!challenge) {
      return NextResponse.json(
        { error: "rate_limited" },
        { status: 429 },
      );
    }
    // Limpieza oportunista, sin bloquear la respuesta
    pruneChallenges().catch(() => {});
    return NextResponse.json(challenge, {
      headers: { "cache-control": "no-store" },
    });
  } catch (e) {
    console.error("captcha issue error", e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
