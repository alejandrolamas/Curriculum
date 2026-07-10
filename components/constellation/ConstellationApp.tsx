"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Starfield } from "./Starfield";
import { ORBITS, orbitPos } from "./orbits";

/**
 * Sistema orbital: Inicio es la estrella central y cada sección es un
 * planeta en su propia elipse anidada (misma inclinación, tamaños
 * crecientes: nunca se cruzan). Velocidad kepleriana: las órbitas
 * interiores giran más rápido. Los planetas se pueden arrastrar (vuelven
 * elásticamente a su órbita) y clicar para viajar.
 */

export interface PanelDef {
  id: string;
  label: string;
  accent: string;
  content: ReactNode;
}

export interface HeroData {
  name: string;
  role: string;
  tagline: string;
  availability: string;
  stats: { value: string; label: string }[];
}

function KineticWord({ word, delay, outline = false }: { word: string; delay: number; outline?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <span className="inline-block overflow-hidden pb-[0.06em] align-top">
      {word.split("").map((char, i) => (
        <motion.span
          key={i}
          className={`inline-block ${outline ? "text-outline" : ""}`}
          initial={reduced ? false : { y: "110%" }}
          animate={{ y: "0%" }}
          transition={{ duration: 0.7, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

export function ConstellationApp({
  hero,
  panels,
}: {
  hero: HeroData;
  panels: PanelDef[];
}) {
  const reduced = useReducedMotion();
  const ids = useMemo(() => ["inicio", ...panels.map((p) => p.id)], [panels]);

  const [active, setActive] = useState(0);
  const [mapMode, setMapMode] = useState(false);
  const [revealing, setRevealing] = useState(false);
  const revealTimer = useRef(0);
  const [dims, setDims] = useState({ w: 1280, h: 800, ux: 4.6, uy: 2.7, mobile: false });
  const lastNav = useRef(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  /* refs del bucle de animación (sin re-renders) */
  const nodeEls = useRef<(HTMLButtonElement | null)[]>([]);
  const posRef = useRef<{ x: number; y: number }[]>(
    Array.from({ length: ids.length }, () => ({ x: 0, y: 0 })),
  );
  const timeRef = useRef(Math.random() * 500);
  const dragRef = useRef<{
    idx: number;
    startX: number;
    startY: number;
    baseX: number;
    baseY: number;
    moved: boolean;
  } | null>(null);
  const offsetsRef = useRef(
    Array.from({ length: ids.length }, () => ({ x: 0, y: 0 })),
  );

  const springCfg = reduced
    ? { stiffness: 900, damping: 80 }
    : { stiffness: 50, damping: 15.5, mass: 0.9 };
  const camX = useSpring(0, springCfg);
  const camY = useSpring(0, springCfg);

  const view = mapMode || revealing ? "map" : active === 0 ? "hero" : "panel";
  const dimRef = useRef(true);
  useEffect(() => {
    dimRef.current = view === "hero";
  }, [view]);

  /* Medidas responsive */
  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mobile = w < 768;
      const ux = w * (mobile ? 0.0033 : 0.0036);
      const uy = h * (mobile ? 0.0036 : 0.0034);
      setDims({ w, h, ux, uy, mobile });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => () => window.clearTimeout(revealTimer.current), []);

  /* La home es un lienzo: sin scroll de documento */
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  /* Bucle orbital: posiciones, decaimiento del drag y cámara-seguimiento */
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduced) timeRef.current += dt;

      for (let i = 0; i < ids.length; i++) {
        const off = offsetsRef.current[i];
        // retorno elástico tras soltar un drag
        if (!dragRef.current || dragRef.current.idx !== i) {
          off.x *= Math.exp(-dt * 5);
          off.y *= Math.exp(-dt * 5);
        }
        const base = i === 0 ? { x: 0, y: 0 } : orbitPos(ORBITS[i - 1], timeRef.current);
        const px = (base.x + off.x) * dims.ux;
        const py = (base.y + off.y) * dims.uy;
        posRef.current[i] = { x: px, y: py };
        const el = nodeEls.current[i];
        if (el) {
          el.style.transform = `translate3d(${px}px, ${py}px, 0) translate(-50%, -50%)`;
        }
      }

      // cámara: sigue al nodo activo (o encuadra todo en modo mapa)
      const overview = mapMode || revealing;
      const anchorX = overview
        ? dims.w / 2
        : active === 0
          ? dims.w / 2
          : dims.mobile
            ? dims.w / 2
            : dims.w * 0.26;
      const anchorY = overview
        ? dims.h / 2
        : active === 0
          ? dims.h * 0.46
          : dims.mobile
            ? dims.h * 0.065
            : dims.h * 0.5;
      const target = overview ? { x: 0, y: 0 } : posRef.current[active];
      camX.set(anchorX - target.x);
      camY.set(anchorY - target.y);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ids.length, dims, active, mapMode, revealing, reduced, camX, camY]);

  const goTo = useCallback(
    (i: number, fromHero?: boolean) => {
      const clamped = Math.max(0, Math.min(ids.length - 1, i));
      if (revealing) return;
      // Salida del hero: primer acto, revelar el sistema; segundo, viajar
      if (fromHero && clamped > 0 && !mapMode) {
        setRevealing(true);
        window.clearTimeout(revealTimer.current);
        revealTimer.current = window.setTimeout(() => {
          setActive(clamped);
          setRevealing(false);
          history.replaceState(null, "", `#${ids[clamped]}`);
        }, 950);
        return;
      }
      setActive(clamped);
      setMapMode(false);
      history.replaceState(null, "", clamped === 0 ? "/" : `#${ids[clamped]}`);
    },
    [ids, revealing, mapMode],
  );

  const step = useCallback(
    (dir: 1 | -1) => {
      const now = performance.now();
      if (now - lastNav.current < 650 || revealing) return;
      lastNav.current = now;
      const next = Math.max(0, Math.min(ids.length - 1, active + dir));
      if (next !== active) goTo(next, active === 0);
    },
    [ids, active, goTo, revealing],
  );

  /* Hash: menú superior, enlaces externos y carga inicial */
  useEffect(() => {
    const onHash = () => {
      const id = window.location.hash.slice(1);
      const i = ids.indexOf(id);
      if (i >= 0) {
        setActive(i);
        setMapMode(false);
      }
    };
    onHash();
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [ids]);

  /* Rueda (fuera del panel) */
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if ((e.target as HTMLElement).closest("[data-panel]")) return;
      if (Math.abs(e.deltaY) < 20 && Math.abs(e.deltaX) < 20) return;
      step(e.deltaY + e.deltaX > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [step]);

  /* Teclado */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea, select")) return;
      if (e.key === "Escape") {
        setMapMode(false);
        return;
      }
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        step(1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Home") {
        goTo(0);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, goTo]);

  /* Swipe táctil (fuera del panel y fuera de un planeta) */
  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest("[data-node]")) return;
      const t = e.touches[0];
      touchStart.current = { x: t.clientX, y: t.clientY };
    };
    const onEnd = (e: TouchEvent) => {
      const start = touchStart.current;
      touchStart.current = null;
      if (!start) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.x;
      const dy = t.clientY - start.y;
      const insidePanel = (e.target as HTMLElement).closest("[data-panel]");
      if (insidePanel) {
        if (Math.abs(dx) > 80 && Math.abs(dx) > Math.abs(dy) * 2.2) {
          step(dx < 0 ? 1 : -1);
        }
        return;
      }
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) {
        step(dx < 0 ? 1 : -1);
      } else if (Math.abs(dy) > 60) {
        step(dy < 0 ? 1 : -1);
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [step]);

  /* Drag de planetas: agarrar, arrastrar y soltar (vuelven a su órbita) */
  const onNodePointerDown = (i: number) => (e: React.PointerEvent<HTMLButtonElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = {
      idx: i,
      startX: e.clientX,
      startY: e.clientY,
      baseX: offsetsRef.current[i].x,
      baseY: offsetsRef.current[i].y,
      moved: false,
    };
  };
  const onNodePointerMove = (i: number) => (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = dragRef.current;
    if (!d || d.idx !== i) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (Math.abs(dx) + Math.abs(dy) > 7) d.moved = true;
    offsetsRef.current[i] = {
      x: d.baseX + dx / dims.ux,
      y: d.baseY + dy / dims.uy,
    };
  };
  const onNodePointerUp = (i: number) => () => {
    const d = dragRef.current;
    if (d && d.idx === i) {
      // el click posterior decide con d.moved; se limpia ahí
      window.setTimeout(() => {
        if (dragRef.current === d) dragRef.current = null;
      }, 0);
    }
  };
  const onNodeClick = (i: number) => (e: React.MouseEvent) => {
    const d = dragRef.current;
    dragRef.current = null;
    if (d?.moved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    goTo(i);
  };

  const nodes = useMemo(
    () =>
      ids.map((id, i) => ({
        id,
        label: i === 0 ? "Inicio" : panels[i - 1].label,
        accent: i === 0 ? "#c8f31d" : panels[i - 1].accent,
      })),
    [ids, panels],
  );

  return (
    <div className="fixed inset-0 overflow-hidden bg-[var(--ink)]" data-view={view}>
      <Starfield
        camX={camX}
        camY={camY}
        positionsRef={posRef}
        orbits={ORBITS}
        accents={nodes.map((n) => n.accent)}
        activeIndex={active}
        dimRef={dimRef}
        ux={dims.ux}
        uy={dims.uy}
      />

      {/* Mundo */}
      <motion.div className="absolute left-0 top-0 z-10" style={{ x: camX, y: camY }}>
        {/* Velo tras el texto del hero: los planetas pierden protagonismo */}
        <div
          aria-hidden
          className="hero-veil pointer-events-none absolute left-0 top-0 h-[160vmax] w-[160vmax] -translate-x-1/2 -translate-y-1/2"
        />

        {nodes.map((node, i) => (
          <button
            key={node.id}
            ref={(el) => {
              nodeEls.current[i] = el;
            }}
            data-node
            onPointerDown={onNodePointerDown(i)}
            onPointerMove={onNodePointerMove(i)}
            onPointerUp={onNodePointerUp(i)}
            onClick={onNodeClick(i)}
            aria-label={node.label}
            aria-current={i === active ? "true" : undefined}
            className="group absolute left-0 top-0 cursor-grab touch-none active:cursor-grabbing"
            style={{ transform: "translate3d(0,0,0) translate(-50%,-50%)" }}
          >
            <motion.span
              className="planet relative block"
              style={{ "--accent": node.accent } as React.CSSProperties}
              data-active={i === active || undefined}
              data-core={i === 0 || undefined}
              initial={reduced ? false : { scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.25 + i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
            <span
              className={`node-label absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.22em] transition-all duration-500 ${
                i === active ? "text-[var(--acid)]" : "text-[var(--muted)] group-hover:text-[var(--bone)]"
              }`}
            >
              {String(i).padStart(2, "0")} · {node.label}
            </span>
          </button>
        ))}

        {/* Hero sobre la estrella */}
        <div
          className="hero-block pointer-events-none absolute left-0 top-0 w-[min(90vw,640px)] -translate-x-1/2 -translate-y-[46%]"
          style={{ opacity: view === "hero" ? 1 : 0 }}
        >
          <div
            className="text-center"
            style={{ pointerEvents: view === "hero" ? "auto" : "none" }}
          >
            <h1 className="font-display text-[clamp(2.2rem,6.5vw,4rem)] font-extrabold uppercase leading-[0.92] tracking-tight">
              <KineticWord word={hero.name.split(" ")[0]} delay={0.15} />{" "}
              <KineticWord word={hero.name.split(" ")[1] ?? ""} delay={0.4} outline />
            </h1>
            <motion.p
              className="mt-3 font-mono text-[clamp(0.68rem,1.5vw,0.82rem)] uppercase tracking-[0.28em] text-[var(--acid)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {hero.role}
            </motion.p>
            <motion.p
              className="hero-tagline mx-auto mt-4 max-w-md text-sm font-light leading-relaxed md:text-base"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.5 }}
            >
              {hero.tagline}
            </motion.p>
            <motion.div
              className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.15 }}
            >
              {hero.stats.map((s) => (
                <span key={s.label} className="flex items-baseline gap-2">
                  <span className="font-display text-lg font-bold text-[var(--acid)]">
                    {s.value}
                  </span>
                  <span className="overline-label">{s.label}</span>
                </span>
              ))}
            </motion.div>
            <motion.button
              onClick={() => goTo(1, true)}
              className="mt-6 inline-flex items-center gap-3 rounded-full border border-[rgba(255,255,255,0.35)] px-7 py-3 font-mono text-xs uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-[var(--acid)] hover:text-[var(--acid)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.35 }}
            >
              Explorar
              <span aria-hidden>→</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Paneles */}
      {panels.map((panel, i) => {
        const isOpen = active === i + 1 && !mapMode;
        return (
          <motion.aside
            key={panel.id}
            data-panel
            aria-hidden={!isOpen}
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              x: dims.mobile ? 0 : isOpen ? 0 : 60,
              y: dims.mobile ? (isOpen ? 0 : 80) : 0,
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed z-30 ${
              dims.mobile
                ? "inset-x-2 bottom-[68px] top-[13svh] rounded-3xl"
                : "bottom-4 right-4 top-20 w-[min(46vw,700px)] rounded-3xl"
            } border border-[var(--line)] bg-[color-mix(in_srgb,var(--ink-2)_92%,transparent)] ${
              isOpen ? "" : "pointer-events-none"
            }`}
            style={{ backdropFilter: "blur(14px)" }}
          >
            <div className="panel-scroll h-full overflow-y-auto overscroll-contain px-5 py-6 md:px-8 md:py-8">
              {panel.content}
            </div>
          </motion.aside>
        );
      })}

      {/* Botón de mapa (esquina) */}
      <button
        onClick={() => setMapMode((v) => !v)}
        aria-label={mapMode ? "Cerrar mapa" : "Ver constelación completa"}
        aria-pressed={mapMode}
        className={`fixed right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border font-mono text-base transition-all duration-500 md:right-6 ${
          dims.mobile ? "top-[70px]" : "bottom-6"
        } ${
          mapMode
            ? "border-[var(--acid)] bg-[var(--acid)] text-[var(--ink)]"
            : "border-[var(--line)] bg-[color-mix(in_srgb,var(--ink)_80%,transparent)] text-[var(--bone)] hover:border-[var(--acid)] hover:text-[var(--acid)]"
        }`}
      >
        {mapMode ? "✕" : "✦"}
      </button>

      {/* Barra inferior: flechas + puntos */}
      <nav
        aria-label="Secciones"
        className={`fixed inset-x-0 bottom-0 z-40 flex items-center justify-center gap-3 pb-3 pt-2 transition-all duration-500 md:gap-4 md:pb-5 ${
          mapMode ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
        }`}
      >
        <button
          onClick={() => step(-1)}
          disabled={active === 0}
          aria-label="Anterior"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--bone)] transition-all duration-300 hover:border-[var(--acid)] hover:text-[var(--acid)] disabled:opacity-25 md:h-10 md:w-10"
        >
          ←
        </button>
        <div className="flex items-center gap-2.5 rounded-full border border-[var(--line)] bg-[color-mix(in_srgb,var(--ink)_80%,transparent)] px-4 py-2.5">
          {ids.map((id, i) => (
            <button
              key={id}
              onClick={() => goTo(i)}
              aria-label={i === 0 ? "Inicio" : panels[i - 1].label}
              className="group relative flex h-4 w-4 items-center justify-center"
            >
              <span
                className={`block rounded-full transition-all duration-500 ${
                  i === active
                    ? "h-2.5 w-2.5 bg-[var(--acid)]"
                    : "h-1.5 w-1.5 bg-[var(--muted)] group-hover:bg-[var(--bone)]"
                }`}
              />
            </button>
          ))}
        </div>
        <button
          onClick={() => step(1)}
          disabled={active === ids.length - 1}
          aria-label="Siguiente"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--line)] text-[var(--bone)] transition-all duration-300 hover:border-[var(--acid)] hover:text-[var(--acid)] disabled:opacity-25 md:h-10 md:w-10"
        >
          →
        </button>
      </nav>
    </div>
  );
}
