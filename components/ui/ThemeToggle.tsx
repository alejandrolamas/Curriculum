"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 z-50 w-12 h-12 rounded-xl glass" />
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={toggleTheme}
      className="
        fixed top-6 right-6 z-50
        w-12 h-12 rounded-xl
        glass glass-hover
        flex items-center justify-center
        transition-all duration-300
        group
      "
      title={theme === "dark" ? "Activar modo claro" : "Activar modo oscuro"}
    >
      <div className="relative w-6 h-6">
        {/* Sun icon */}
        <motion.svg
          animate={{
            scale: theme === "light" ? 1 : 0,
            rotate: theme === "light" ? 0 : 180,
            opacity: theme === "light" ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 text-[var(--color-primary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </motion.svg>

        {/* Moon icon */}
        <motion.svg
          animate={{
            scale: theme === "dark" ? 1 : 0,
            rotate: theme === "dark" ? 0 : -180,
            opacity: theme === "dark" ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 text-[var(--color-accent)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </motion.svg>
      </div>

      {/* Tooltip */}
      <span className="
        absolute right-full mr-3 px-3 py-1.5 rounded-lg
        bg-[var(--bg-secondary)] border border-[var(--border-color)]
        text-sm font-mono text-[var(--text-primary)]
        opacity-0 group-hover:opacity-100
        pointer-events-none transition-opacity duration-200
        whitespace-nowrap
      ">
        {theme === "dark" ? "Modo Claro" : "Modo Oscuro"}
        <span className="ml-2 text-[var(--text-tertiary)]">[D]</span>
      </span>
    </motion.button>
  );
}
