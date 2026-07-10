"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { loginAction, type LoginState } from "@/lib/actions/auth-actions";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    loginAction,
    {},
  );

  return (
    <div className="flex min-h-svh items-center justify-center bg-[var(--ink)] px-5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        <div className="mb-10 text-center">
          <span className="font-display text-3xl font-extrabold">
            AL<span className="text-[var(--acid)]">·</span>
          </span>
          <p className="overline-label mt-3">Panel de control</p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="overline-label">Email</span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="field"
              placeholder="tu@email.com"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="overline-label">Contraseña</span>
            <input
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="field"
              placeholder="••••••••"
            />
          </label>

          {state.error ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-xs text-[var(--pink)]"
            >
              {state.error}
            </motion.p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="mt-2 rounded-xl bg-[var(--acid)] py-3.5 font-mono text-sm font-medium uppercase tracking-widest text-[var(--ink)] transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {pending ? "Entrando…" : "Entrar"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
