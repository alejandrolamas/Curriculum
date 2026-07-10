"use client";

import { MotionValue } from "framer-motion";
import { MutableRefObject, useEffect, useRef } from "react";
import { ORBITS, orbitPoint, type OrbitDef } from "./orbits";

/**
 * Fondo del sistema: estrellas con parallax por capas + trazados de las
 * órbitas elípticas. La órbita del planeta activo se ilumina con su acento.
 * Canvas 2D: coste por frame despreciable.
 */
export function Starfield({
  camX,
  camY,
  positionsRef,
  orbits,
  accents,
  activeIndex,
  dimRef,
  ux,
  uy,
}: {
  camX: MotionValue<number>;
  camY: MotionValue<number>;
  positionsRef: MutableRefObject<{ x: number; y: number }[]>;
  orbits: OrbitDef[];
  accents: string[];
  activeIndex: number;
  dimRef: MutableRefObject<boolean>;
  ux: number;
  uy: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(activeIndex);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let stars: Array<{ x: number; y: number; r: number; p: number; tw: number; ph: number }> = [];

    const extent = Math.max(...ORBITS.map((o) => o.a)) + 90;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.max(140, Math.min(260, Math.round((w * h) / 9000)));
      stars = Array.from({ length: count }, () => ({
        x: -extent + Math.random() * extent * 2,
        y: -extent + Math.random() * extent * 2,
        r: 0.4 + Math.random() * 1.1,
        p: [0.25, 0.5, 0.8][Math.floor(Math.random() * 3)],
        tw: 0.4 + Math.random() * 1.6,
        ph: Math.random() * Math.PI * 2,
      }));
    };

    let raf = 0;
    const draw = (t: number) => {
      const cx = camX.get();
      const cy = camY.get();
      ctx.clearRect(0, 0, w, h);

      // estrellas (parallax por capas)
      for (const s of stars) {
        const px = s.x * ux + cx * s.p + (w / 2) * (1 - s.p);
        const py = s.y * uy + cy * s.p + (h / 2) * (1 - s.p);
        if (px < -8 || px > w + 8 || py < -8 || py > h + 8) continue;
        const twinkle = reduced ? 0.75 : 0.55 + 0.45 * Math.sin(t * 0.001 * s.tw + s.ph);
        ctx.globalAlpha = 0.5 * twinkle * (0.35 + s.p);
        ctx.fillStyle = "#f2efe6";
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // trazados de las órbitas (el origen del sistema está en cam)
      const orbitDim = dimRef.current ? 0.3 : 1;
      const activeOrbit = activeRef.current - 1;
      for (let i = 0; i < orbits.length; i++) {
        const isActive = i === activeOrbit;
        ctx.strokeStyle = isActive
          ? (accents[i + 1] ?? "#c8f31d")
          : "rgba(242, 239, 230, 1)";
        ctx.globalAlpha = (isActive ? 0.35 : 0.08) * orbitDim;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let k = 0; k <= 72; k++) {
          const p = orbitPoint(orbits[i], (k / 72) * Math.PI * 2);
          const px = cx + p.x * ux;
          const py = cy + p.y * uy;
          if (k === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // hilo sutil de la estrella al planeta activo
      if (activeOrbit >= 0 && !dimRef.current && positionsRef.current[activeOrbit + 1]) {
        const p = positionsRef.current[activeOrbit + 1];
        ctx.strokeStyle = accents[activeOrbit + 1] ?? "#c8f31d";
        ctx.globalAlpha = 0.25;
        ctx.setLineDash([2, 6]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + p.x, cy + p.y);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      draw(0);
    } else {
      raf = requestAnimationFrame(draw);
    }
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [camX, camY, positionsRef, orbits, accents, dimRef, ux, uy]);

  return <canvas ref={canvasRef} aria-hidden className="fixed inset-0 z-0" />;
}
