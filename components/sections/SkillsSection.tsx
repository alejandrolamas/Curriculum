"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";

interface Skill {
  name: string;
  level: number;
  category: string;
  color: string;
  icon?: string;
}

const skills: Skill[] = [
  // Languages
  { name: "HTML5", level: 100, category: "frontend", color: "#e34f26", icon: "⟨/⟩" },
  { name: "CSS3/SCSS", level: 96, category: "frontend", color: "#264de4", icon: "🎨" },
  { name: "JavaScript", level: 91, category: "frontend", color: "#f7df1e", icon: "JS" },
  { name: "TypeScript", level: 75, category: "frontend", color: "#3178c6", icon: "TS" },
  { name: "PHP 8", level: 100, category: "backend", color: "#777bb4", icon: "🐘" },
  { name: "Python", level: 40, category: "backend", color: "#3776ab", icon: "🐍" },
  
  // Frameworks
  { name: "React", level: 85, category: "frontend", color: "#61dafb", icon: "⚛" },
  { name: "Next.js", level: 70, category: "frontend", color: "#ffffff", icon: "▲" },
  { name: "Angular", level: 55, category: "frontend", color: "#dd0031", icon: "🅰" },
  { name: "Node.js", level: 70, category: "backend", color: "#339933", icon: "⬡" },
  
  // CMS
  { name: "WordPress", level: 100, category: "cms", color: "#21759b", icon: "W" },
  { name: "Prestashop", level: 87, category: "cms", color: "#df0067", icon: "🛒" },
  { name: "Shopify", level: 80, category: "cms", color: "#96bf48", icon: "🛍" },
  { name: "WIX", level: 98, category: "cms", color: "#000000", icon: "W" },
  { name: "Drupal", level: 50, category: "cms", color: "#0678be", icon: "💧" },
  { name: "Moodle", level: 75, category: "cms", color: "#f98012", icon: "🎓" },
  
  // Tools & DevOps
  { name: "GIT", level: 85, category: "tools", color: "#f05032", icon: "🌿" },
  { name: "Linux", level: 89, category: "tools", color: "#fcc624", icon: "🐧" },
  { name: "Docker", level: 60, category: "tools", color: "#2496ed", icon: "🐳" },
  
  // Design
  { name: "Photoshop", level: 69, category: "design", color: "#31a8ff", icon: "Ps" },
  { name: "Adobe XD", level: 75, category: "design", color: "#ff61f6", icon: "Xd" },
  { name: "Figma", level: 65, category: "design", color: "#f24e1e", icon: "F" },
  
  // Marketing
  { name: "Google Ads", level: 90, category: "marketing", color: "#4285f4", icon: "📈" },
  { name: "Meta Ads", level: 85, category: "marketing", color: "#1877f2", icon: "f" },
  { name: "Analytics", level: 92, category: "marketing", color: "#e37400", icon: "📊" },
  { name: "SEO", level: 88, category: "marketing", color: "#47a248", icon: "🔍" },
];

const categories = [
  { id: "all", label: "Todos", icon: "◈" },
  { id: "frontend", label: "Frontend", icon: "◇" },
  { id: "backend", label: "Backend", icon: "◆" },
  { id: "cms", label: "CMS", icon: "◎" },
  { id: "tools", label: "DevOps", icon: "⚙" },
  { id: "design", label: "Design", icon: "✦" },
  { id: "marketing", label: "Marketing", icon: "📊" },
];

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const filteredSkills = activeCategory === "all"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <div className="py-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full font-mono text-sm text-[var(--text-tertiary)] mb-4">
          <span className="text-[var(--color-danger)]">⬡</span>
          <span>MÓDULO://TECH_STACK</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          <span className="gradient-text">STACK TECNOLÓGICO</span>
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
          Mi arsenal de herramientas y tecnologías. Haz clic en el Core central 
          para expandir y explorar mi stack completo.
        </p>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap justify-center gap-2 mb-8"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300
              ${activeCategory === cat.id
                ? "bg-[var(--color-primary)] text-[var(--bg-primary)]"
                : "glass hover:bg-[var(--bg-glass-hover)] text-[var(--text-secondary)]"
              }
            `}
          >
            <span className="mr-2">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
      >
        {filteredSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <GlassCard className="relative overflow-hidden group">
              {/* Background progress */}
              <div
                className="absolute inset-0 opacity-10 transition-opacity group-hover:opacity-20"
                style={{
                  background: `linear-gradient(90deg, ${skill.color} ${skill.level}%, transparent ${skill.level}%)`,
                }}
              />

              <div className="relative flex items-center gap-3">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold shrink-0"
                  style={{
                    backgroundColor: `${skill.color}20`,
                    color: skill.color,
                    border: `1px solid ${skill.color}50`,
                  }}
                >
                  {skill.icon}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[var(--text-primary)] text-sm truncate">
                    {skill.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    {/* Progress bar */}
                    <div className="flex-1 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: hoveredSkill === skill.name || activeCategory !== "all" ? `${skill.level}%` : "0%" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                      />
                    </div>
                    <span className="text-xs font-mono text-[var(--text-tertiary)]">
                      {skill.level}%
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Skill Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12"
      >
        <GlassCard hover={false}>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-[var(--color-primary)] mb-2">
                {skills.length}+
              </div>
              <div className="text-sm font-mono text-[var(--text-tertiary)]">
                Tecnologías Dominadas
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-[var(--color-secondary)] mb-2">
                Full Stack
              </div>
              <div className="text-sm font-mono text-[var(--text-tertiary)]">
                Frontend + Backend + DevOps
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-[var(--color-accent)] mb-2">
                ∞
              </div>
              <div className="text-sm font-mono text-[var(--text-tertiary)]">
                Aprendiendo Siempre
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Learning Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-[var(--text-tertiary)] font-mono">
          <span className="text-[var(--color-success)]">●</span> Actualmente profundizando en: 
          <span className="text-[var(--color-primary)]"> Three.js, WebGL, AI/ML</span>
        </p>
      </motion.div>
    </div>
  );
}
