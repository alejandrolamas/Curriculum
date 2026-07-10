"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

export interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number;
  featured: boolean;
}

/** Panel Arsenal: skills filtrables por categoría. */
export function SkillsArsenal({ skills }: { skills: SkillItem[] }) {
  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const s of skills) if (!seen.includes(s.category)) seen.push(s.category);
    return ["Todo", ...seen];
  }, [skills]);

  const [active, setActive] = useState("Todo");
  const visible =
    active === "Todo" ? skills : skills.filter((s) => s.category === active);

  return (
    <div>
      <header className="mb-7">
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-xs text-[var(--acid)]">03</span>
          <span className="h-px flex-1 bg-[var(--line)]" />
        </div>
        <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          Arsenal
        </h2>
      </header>

      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`relative rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-300 ${
              active === cat
                ? "text-[var(--ink)]"
                : "text-[var(--muted)] hover:text-[var(--bone)]"
            }`}
          >
            {active === cat && (
              <motion.span
                layoutId="skill-pill"
                className="absolute inset-0 rounded-full bg-[var(--acid)]"
                transition={{ type: "spring", bounce: 0.25, duration: 0.55 }}
              />
            )}
            <span className="relative">{cat}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-px overflow-hidden rounded-xl bg-[var(--line-soft)] sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((skill) => (
            <motion.div
              layout
              key={skill.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-[var(--ink-2)] p-4"
            >
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-[3px] bg-[var(--acid)] transition-[width] duration-700 ease-out"
                style={{ width: `${skill.level}%` }}
              />
              <div className="flex items-baseline justify-between gap-3">
                <h3
                  className={`font-display text-[15px] font-bold leading-tight ${
                    skill.featured ? "text-[var(--acid)]" : ""
                  }`}
                >
                  {skill.name}
                </h3>
                <span className="font-mono text-[11px] tabular-nums text-[var(--muted)] transition-colors group-hover:text-[var(--acid)]">
                  {skill.level}
                </span>
              </div>
              <span className="overline-label mt-1 block">{skill.category}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
