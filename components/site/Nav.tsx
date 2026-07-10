"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

/* Enlaces de sección como <a>: el cambio de hash dispara `hashchange`,
   que es lo que escucha la constelación. Con Link de Next no se emitía. */
const links = [
  { href: "/#perfil", label: "Perfil", index: "01" },
  { href: "/#trayectoria", label: "Trayectoria", index: "02" },
  { href: "/#arsenal", label: "Arsenal", index: "03" },
  { href: "/#proyectos", label: "Proyectos", index: "04" },
  { href: "/blog", label: "Blog", index: "05", isPage: true },
  { href: "/#contacto", label: "Contacto", index: "06" },
];

function MadridClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          timeZone: "Europe/Madrid",
        }).format(new Date()),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="font-mono text-[11px] tabular-nums text-[var(--muted)]">
      MAD {time}
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference">
        <div className="flex items-center justify-between px-5 py-4 md:px-10">
          {/* El logo devuelve a la posición inicial de la constelación */}
          <a
            href="/#inicio"
            aria-label="Volver al inicio"
            className="font-display text-lg font-extrabold tracking-tight text-white"
          >
            AL<span className="text-[var(--acid)]">·</span>
          </a>
          <div className="flex items-center gap-6">
            <div className="hidden md:block">
              <MadridClock />
            </div>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              className="group flex h-10 w-10 flex-col items-center justify-center gap-1.5"
            >
              <span
                className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-6 bg-white transition-transform duration-300 ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-[var(--ink-2)] px-6 pb-10 pt-28 md:px-14"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="flex flex-col gap-1">
              {links.map((link, i) => {
                const inner = (
                  <>
                    <span className="font-mono text-xs text-[var(--acid)]">
                      {link.index}
                    </span>
                    <span className="font-display text-[clamp(2rem,6.5vw,4rem)] font-bold uppercase leading-none tracking-tight text-[var(--bone)] transition-transform duration-300 group-hover:translate-x-3 group-hover:text-[var(--acid)]">
                      {link.label}
                    </span>
                  </>
                );
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.5 }}
                  >
                    {link.isPage ? (
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 py-2 md:py-3"
                      >
                        {inner}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 py-2 md:py-3"
                      >
                        {inner}
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </nav>
            <motion.div
              className="flex flex-wrap items-center justify-between gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="overline-label">Madrid, España</span>
              <div className="flex gap-6">
                <a
                  href="https://www.linkedin.com/in/alejandrolamasperez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep font-mono text-xs uppercase tracking-widest text-[var(--bone)]"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/alejandrolamas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-sweep font-mono text-xs uppercase tracking-widest text-[var(--bone)]"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
