import Link from "next/link";
import { Marquee } from "./Marquee";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="hairline-t relative overflow-hidden">
      <Link href="/#contacto" aria-label="Ir a contacto" className="block py-10 md:py-14">
        <Marquee speed={22}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span
              key={i}
              className="font-display mx-6 text-[clamp(3rem,9vw,7rem)] font-extrabold uppercase leading-none tracking-tight"
            >
              <span className="text-outline">¿Hablamos?</span>
              <span className="mx-6 text-[var(--acid)]">✳</span>
            </span>
          ))}
        </Marquee>
      </Link>
      <div className="hairline-t flex flex-col items-start justify-between gap-6 px-6 py-8 md:flex-row md:items-center md:px-14">
        <div className="flex flex-col gap-1">
          <span className="font-display text-sm font-bold">
            Alejandro Lamas
          </span>
          <span className="font-mono text-[11px] text-[var(--muted)]">
            Technical Project Manager · E-commerce — Madrid
          </span>
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
          <a
            href="mailto:hola@alejandrolamas.es"
            className="link-sweep font-mono text-xs uppercase tracking-widest"
          >
            hola@alejandrolamas.es
          </a>
        </div>
        <span className="font-mono text-[11px] text-[var(--muted)]">
          © {year} — Hecho con Next.js {" "}
          <span className="text-[var(--acid)]">/</span> Sin plantillas
        </span>
      </div>
    </footer>
  );
}
