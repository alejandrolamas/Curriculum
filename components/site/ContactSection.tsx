"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useCallback, useRef, useState } from "react";
import { solvePow } from "@/lib/pow-client";

type ShieldState =
  | { phase: "idle" }
  | { phase: "solving" }
  | { phase: "ready"; token: string; solution: string; iat: number }
  | { phase: "error"; message: string };

type SendState = "idle" | "sending" | "sent" | "error";

const MIN_ELAPSED_MS = 2700;

export function ContactSection({ email, phone }: { email: string; phone: string }) {
  const [shield, setShield] = useState<ShieldState>({ phase: "idle" });
  const [send, setSend] = useState<SendState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const solvingRef = useRef(false);

  const arm = useCallback(async (): Promise<{
    token: string;
    solution: string;
    iat: number;
  } | null> => {
    if (solvingRef.current) return null;
    solvingRef.current = true;
    try {
      const res = await fetch("/api/captcha", { method: "POST" });
      if (!res.ok) {
        setShield({
          phase: "error",
          message:
            res.status === 429
              ? "Demasiados intentos. Espera unos minutos."
              : "No se pudo iniciar la verificación.",
        });
        return null;
      }
      const { token, nonce, difficulty, iat } = await res.json();
      setShield({ phase: "solving" });
      const solution = await solvePow(nonce, difficulty);
      if (!solution) {
        setShield({ phase: "error", message: "Verificación interrumpida." });
        return null;
      }
      const ready = { token, solution, iat };
      setShield({ phase: "ready", ...ready });
      return ready;
    } catch {
      setShield({ phase: "error", message: "Error de red en la verificación." });
      return null;
    } finally {
      solvingRef.current = false;
    }
  }, []);

  const onFirstFocus = useCallback(() => {
    if (shield.phase === "idle" || shield.phase === "error") void arm();
  }, [shield.phase, arm]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (send === "sending") return;
    setSend("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    let proof =
      shield.phase === "ready" && Date.now() - shield.iat < 4 * 60 * 1000
        ? { token: shield.token, solution: shield.solution, iat: shield.iat }
        : await arm();
    if (!proof) proof = await arm();
    if (!proof) {
      setSend("error");
      setErrorMsg("No se pudo completar la verificación. Recarga e inténtalo de nuevo.");
      return;
    }

    const elapsed = Date.now() - proof.iat;
    if (elapsed < MIN_ELAPSED_MS) {
      await new Promise((r) => setTimeout(r, MIN_ELAPSED_MS - elapsed));
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          subject: data.get("subject") || undefined,
          message: data.get("message"),
          website: data.get("website") ?? "",
          token: proof.token,
          solution: proof.solution,
        }),
      });

      if (res.ok) {
        setSend("sent");
        form.reset();
        setShield({ phase: "idle" });
        return;
      }
      const { error } = await res.json().catch(() => ({ error: "unknown" }));
      setSend("error");
      setShield({ phase: "idle" });
      setErrorMsg(
        error === "rate_limited"
          ? "Has alcanzado el límite de mensajes por ahora. Inténtalo más tarde."
          : "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      );
    } catch {
      setSend("error");
      setErrorMsg("Error de red. Comprueba tu conexión e inténtalo de nuevo.");
    }
  }

  return (
    <div>
      <header className="mb-7">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--acid)]">06</span>
          <span className="h-px flex-1 bg-[var(--line)]" />
        </div>
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          Contacto
        </h2>
      </header>

      <AnimatePresence mode="wait">
        {send === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-[var(--acid)] p-8 text-center"
          >
            <motion.span
              className="font-display text-5xl text-[var(--acid)]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
            >
              ✓
            </motion.span>
            <h3 className="font-display mt-5 text-2xl font-bold">Mensaje enviado</h3>
            <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
              Gracias por escribir. Te responderé lo antes posible.
            </p>
            <button
              onClick={() => setSend("idle")}
              className="link-sweep mt-6 font-mono text-xs uppercase tracking-widest text-[var(--acid)]"
            >
              Enviar otro mensaje
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="overline-label">Nombre</span>
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={80}
                  onFocus={onFirstFocus}
                  className="field"
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="overline-label">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={120}
                  onFocus={onFirstFocus}
                  className="field"
                />
              </label>
            </div>
            <label className="flex flex-col gap-1.5">
              <span className="overline-label">Asunto</span>
              <input
                name="subject"
                maxLength={140}
                onFocus={onFirstFocus}
                className="field"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="overline-label">Mensaje</span>
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={4000}
                rows={5}
                onFocus={onFirstFocus}
                className="field resize-none"
              />
            </label>

            {/* Honeypot */}
            <div
              aria-hidden
              className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
            >
              <label>
                Deja este campo vacío
                <input name="website" type="text" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            {errorMsg ? (
              <p className="font-mono text-xs text-[var(--pink)]">{errorMsg}</p>
            ) : null}

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={send === "sending"}
                className="rounded-full bg-[var(--acid)] px-9 py-3.5 font-mono text-xs font-medium uppercase tracking-widest text-[var(--ink)] transition-transform duration-300 hover:scale-[1.03] disabled:opacity-60"
              >
                {send === "sending" ? "Enviando…" : "Enviar mensaje"}
              </button>
              {shield.phase === "solving" || send === "sending" ? (
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--cyan)]">
                  <span className="mr-2 inline-block h-1.5 w-1.5 animate-ping rounded-full bg-[var(--cyan)]" />
                  Verificando
                </span>
              ) : shield.phase === "ready" ? (
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--acid)]">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[var(--acid)]" />
                  Verificado
                </span>
              ) : shield.phase === "error" ? (
                <span className="font-mono text-[11px] uppercase tracking-widest text-[var(--pink)]">
                  {shield.message}
                </span>
              ) : null}
            </div>

            <p className="text-xs leading-relaxed text-[var(--muted)]">
              Formulario protegido con verificación invisible, sin captchas de
              terceros.{" "}
              <Link
                href="/blog/escudo-anti-bots-proof-of-work"
                className="text-[var(--acid)] underline underline-offset-4"
              >
                Cómo funciona
              </Link>
            </p>
          </motion.form>
        )}
      </AnimatePresence>

      <div className="hairline-t mt-8 flex flex-col gap-4 pt-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <a
            href={`mailto:${email}`}
            className="link-sweep font-display text-lg font-bold text-[var(--bone)]"
          >
            {email}
          </a>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="link-sweep font-mono text-sm text-[var(--muted)]"
          >
            {phone}
          </a>
        </div>
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://www.linkedin.com/in/alejandrolamasperez/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep font-mono text-xs uppercase tracking-widest"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/alejandrolamas"
            target="_blank"
            rel="noopener noreferrer"
            className="link-sweep font-mono text-xs uppercase tracking-widest"
          >
            GitHub
          </a>
          <span className="ml-auto font-mono text-[10px] text-[var(--muted)]">
            © {new Date().getFullYear()} Alejandro Lamas
          </span>
        </div>
      </div>
    </div>
  );
}
