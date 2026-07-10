"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor personalizado: punto acid + aro con lag magnético.
 * Escala y color interpolados (sin saltos) sobre elementos interactivos;
 * muestra etiqueta en [data-cursor-label].
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || prefersReduced) return;

    document.body.dataset.cursor = "on";

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let scale = 1;
    let targetScale = 1;
    let hasLabel = false;
    let raf: number;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = (e.target as HTMLElement).closest(
        "a, button, [role='button'], [data-cursor-label]",
      );
      const text =
        target instanceof HTMLElement ? (target.dataset.cursorLabel ?? "") : "";
      hasLabel = !!text;
      if (text) label.textContent = text;
      targetScale = hasLabel ? 3.2 : target ? 1.9 : 1;
      label.style.opacity = hasLabel ? "1" : "0";
      ring.style.backgroundColor = hasLabel
        ? "var(--acid)"
        : "transparent";
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      scale += (targetScale - scale) * 0.14;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      label.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
      delete document.body.dataset.cursor;
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden [@media(pointer:fine)]:block">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-[var(--acid)] opacity-60 will-change-transform"
        style={{ transition: "background-color 0.35s ease" }}
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-[var(--acid)] will-change-transform"
      />
      <div
        ref={labelRef}
        className="absolute left-0 top-0 font-mono text-[9px] uppercase tracking-widest text-[var(--ink)] will-change-transform"
        style={{ opacity: 0, transition: "opacity 0.3s ease" }}
      />
    </div>
  );
}
