"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";

const experiences = [
  {
    year: "2024 - Actual",
    position: "Lead Developer & Project Manager",
    company: "Consejo General de Colegios Veterinarios",
    description: "Liderando proyectos digitales y desarrollo de plataformas para el Consejo General de Colegios de la Profesión Veterinaria de España.",
    color: "#00f5d4",
    icon: "◆",
    highlights: ["Gestión de equipos", "Arquitectura de software", "Transformación digital"],
  },
  {
    year: "2020 - 2024",
    position: "CEO & Founder",
    company: "Gratum Corp SL",
    description: "Gestión de proyectos para clientes de diversos sectores, manejando y desarrollando en diferentes tipos de CMS y lenguajes de programación, metodologías Kanban y SCRUM.",
    color: "#ffa001",
    icon: "◈",
    highlights: ["Fundación de empresa", "Gestión de clientes", "Full Stack Development"],
  },
  {
    year: "2019 - 2021",
    position: "Full Stack Developer",
    company: "Basico Homes Gestión SL",
    description: "Mediante el uso de últimas versiones de PHP y con control de versiones a través de GIT, dirigí un equipo para el desarrollo integral de una intranet dedicada al inquilino incluyendo firmas digitales y accesos a diferentes API.",
    color: "#3a86ff",
    icon: "◇",
    highlights: ["PHP7/8", "API Integration", "Team Lead", "GIT"],
  },
  {
    year: "2018 - 2019",
    position: "CTO / CMO",
    company: "The Internet Marketing Leading SL",
    description: "Gestión de clientes, creación y gestión de campañas integrales de marketing digital y comercio electrónico en diferentes plataformas.",
    color: "#ff006e",
    icon: "◎",
    highlights: ["Marketing Digital", "E-commerce", "Dirección Técnica"],
  },
  {
    year: "2017 - 2018",
    position: "Full Stack Developer",
    company: "Tible Technologies SL (Taptil)",
    description: "Gestión de clientes en CMS WordPress, Shopify, Prestashop y desarrollos puntuales en PHP. Desarrollo de aplicaciones móviles.",
    color: "#8338ec",
    icon: "◉",
    highlights: ["WordPress", "Shopify", "Mobile Apps", "PHP"],
  },
];

export function ExperienceSection() {
  return (
    <div className="py-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full font-mono text-sm text-[var(--text-tertiary)] mb-4">
          <span className="text-[var(--color-secondary)]">◈</span>
          <span>MÓDULO://TIMELINE</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          <span className="gradient-text">EXPERIENCIA</span>
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
          Un recorrido por los nodos principales de mi carrera profesional. 
          Cada punto representa un hito en mi evolución como desarrollador y líder técnico.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-accent)]" />

        {/* Timeline items */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex items-center gap-8 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Node point */}
              <div
                className="absolute left-8 md:left-1/2 w-4 h-4 rounded-full -translate-x-1/2 z-10"
                style={{
                  backgroundColor: exp.color,
                  boxShadow: `0 0 20px ${exp.color}`,
                }}
              />

              {/* Content */}
              <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                <GlassCard className="relative overflow-hidden">
                  {/* Color accent */}
                  <div
                    className="absolute top-0 left-0 w-1 h-full"
                    style={{ backgroundColor: exp.color }}
                  />

                  {/* Year badge */}
                  <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-4"
                    style={{
                      backgroundColor: `${exp.color}20`,
                      color: exp.color,
                      border: `1px solid ${exp.color}50`,
                    }}
                  >
                    <span>{exp.icon}</span>
                    {exp.year}
                  </div>

                  {/* Position & Company */}
                  <h3 className="text-xl font-display font-bold text-[var(--text-primary)] mb-1">
                    {exp.position}
                  </h3>
                  <p className="text-[var(--color-primary)] font-mono text-sm mb-3">
                    {exp.company}
                  </p>

                  {/* Description */}
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded text-xs font-mono bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] border border-[var(--border-color)]"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* Empty space for alternating layout */}
              <div className="hidden md:block w-1/2" />
            </motion.div>
          ))}
        </div>

        {/* End node */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute left-8 md:left-1/2 bottom-0 -translate-x-1/2"
        >
          <div className="w-8 h-8 rounded-full bg-[var(--color-success)] flex items-center justify-center text-black font-bold text-sm">
            ∞
          </div>
        </motion.div>
      </div>

      {/* Summary stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { value: "7+", label: "Años como Developer", icon: "💻" },
          { value: "3", label: "Roles de Liderazgo", icon: "👑" },
          { value: "2", label: "Empresas Fundadas", icon: "🚀" },
          { value: "50+", label: "Proyectos Completados", icon: "✓" },
        ].map((stat, index) => (
          <GlassCard key={index} className="text-center">
            <span className="text-2xl mb-2 block">{stat.icon}</span>
            <div className="text-2xl font-display font-bold text-[var(--color-primary)]">
              {stat.value}
            </div>
            <div className="text-xs font-mono text-[var(--text-tertiary)]">
              {stat.label}
            </div>
          </GlassCard>
        ))}
      </motion.div>
    </div>
  );
}
