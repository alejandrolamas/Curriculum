"use client";

import { motion } from "framer-motion";

/**
 * Cabecera de sección editorial: índice mono + título que pasa de contorno
 * a relleno al entrar en viewport. `compact` para estaciones (cabe en 100vh).
 */
export function SectionHeading({
  index,
  title,
  hint,
  compact = false,
}: {
  index: string;
  title: string;
  hint?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "relative mb-6 md:mb-8" : "relative mb-14 md:mb-20"}>
      <div className="mb-3 flex items-center gap-4">
        <span className="font-mono text-xs text-[var(--acid)]">{index}</span>
        <span className="h-px flex-1 bg-[var(--line)]" />
        {hint ? <span className="overline-label">{hint}</span> : null}
      </div>
      <h2
        className={`font-display font-extrabold uppercase leading-[0.95] tracking-tight ${
          compact
            ? "text-[clamp(2.2rem,5vw,4rem)]"
            : "text-[clamp(2.6rem,8vw,6.5rem)]"
        }`}
      >
        <span className="relative inline-block">
          <span className="text-outline absolute inset-0 select-none" aria-hidden>
            {title}
          </span>
          <motion.span
            className="relative text-[var(--bone)]"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            whileInView={{ clipPath: "inset(0 0% 0 0)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          >
            {title}
          </motion.span>
        </span>
      </h2>
    </div>
  );
}
