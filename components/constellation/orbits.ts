/**
 * Física orbital compartida entre la app y el canvas.
 * Elipses anidadas con la misma inclinación (nunca se cruzan) y velocidad
 * kepleriana: ω ∝ a^-1.5 — las órbitas interiores giran más rápido.
 */

export interface OrbitDef {
  a: number; // semieje mayor en unidades u
  theta0: number; // fase inicial
}

export const ORBIT_TILT = -0.21; // rad (~-12°)
export const ORBIT_RATIO = 0.75; // b/a

export const ORBITS: OrbitDef[] = [
  { a: 40, theta0: 0.7 },
  { a: 52, theta0: 2.6 },
  { a: 65, theta0: 4.6 },
  { a: 80, theta0: 1.5 },
  { a: 98, theta0: 3.6 },
  { a: 118, theta0: 5.6 },
];

const BASE_PERIOD_S = 110; // periodo de la órbita interior

export function orbitPos(orbit: OrbitDef, t: number): { x: number; y: number } {
  const omega =
    (Math.PI * 2) / (BASE_PERIOD_S * Math.pow(orbit.a / ORBITS[0].a, 1.5));
  const theta = orbit.theta0 + omega * t;
  const ex = orbit.a * Math.cos(theta);
  const ey = orbit.a * ORBIT_RATIO * Math.sin(theta);
  return {
    x: ex * Math.cos(ORBIT_TILT) - ey * Math.sin(ORBIT_TILT),
    y: ex * Math.sin(ORBIT_TILT) + ey * Math.cos(ORBIT_TILT),
  };
}

/** Punto de la elipse i en fase θ (para dibujar el trazado). */
export function orbitPoint(orbit: OrbitDef, theta: number): { x: number; y: number } {
  const ex = orbit.a * Math.cos(theta);
  const ey = orbit.a * ORBIT_RATIO * Math.sin(theta);
  return {
    x: ex * Math.cos(ORBIT_TILT) - ey * Math.sin(ORBIT_TILT),
    y: ex * Math.sin(ORBIT_TILT) + ey * Math.cos(ORBIT_TILT),
  };
}
