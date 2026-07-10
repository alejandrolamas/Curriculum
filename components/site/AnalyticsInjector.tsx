"use client";

import { useEffect } from "react";

/**
 * Inyecta el snippet de analítica configurado en /admin/ajustes.
 * Se añade al <head> tras el montaje (los <script> de un fragmento se
 * ejecutan al insertarse con createContextualFragment).
 */
export function AnalyticsInjector({ code }: { code: string }) {
  useEffect(() => {
    if (!code.trim()) return;
    try {
      const fragment = document
        .createRange()
        .createContextualFragment(code);
      const marker = document.createComment("analytics");
      document.head.appendChild(marker);
      document.head.appendChild(fragment);
    } catch (e) {
      console.error("analytics inject error", e);
    }
  }, [code]);

  return null;
}
