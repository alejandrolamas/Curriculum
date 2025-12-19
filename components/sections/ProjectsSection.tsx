"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { GlassCard } from "@/components/ui/GlassCard";

interface Project {
  id: number;
  name: string;
  client: string;
  type: string;
  description: string;
  technologies: string[];
  link?: string;
  category: string;
  featured?: boolean;
  color: string;
}

const historicalProjects = [
  {
    id: 0,
    name: "Sixtema GIS",
    client: "Sixtema",
    type: "Sistema de Información Geográfica",
    description: "Desarrollo de plataforma GIS para gestión territorial y análisis geoespacial. Implementación de mapas interactivos y herramientas de análisis de datos geográficos.",
    technologies: ["GIS", "JavaScript", "PostgreSQL", "PostGIS", "Leaflet"],
    category: "histórico",
    featured: true,
    color: "#00f5d4",
  },
  {
    id: 1,
    name: "Taptil Mobile",
    client: "Tible Technologies SL",
    type: "Desarrollo Mobile",
    description: "Desarrollo de aplicaciones móviles multiplataforma para diversos clientes. Integración con sistemas backend y APIs REST.",
    technologies: ["React Native", "iOS", "Android", "REST API", "Firebase"],
    category: "histórico",
    featured: true,
    color: "#8338ec",
  },
  {
    id: 2,
    name: "Gratum Corp Agency",
    client: "Gratum Corp SL",
    type: "Agencia Digital",
    description: "Fundación y dirección de agencia de desarrollo web y marketing digital. Gestión de cartera de clientes y proyectos de alto nivel.",
    technologies: ["WordPress", "Shopify", "PHP", "React", "Google Ads", "META"],
    category: "histórico",
    featured: true,
    color: "#ffa001",
  },
];

const projects: Project[] = [
  ...historicalProjects,
  {
    id: 3,
    name: "Miguel Rios",
    client: "Miguel Rios",
    type: "Web Corporativa",
    description: "Desarrollo de página web corporativa para el legendario artista Miguel Rios.",
    technologies: ["WordPress", "PHP", "CSS", "JavaScript"],
    link: "https://miguel-rios.com/",
    category: "desarrollo",
    color: "#3a86ff",
  },
  {
    id: 4,
    name: "Mecano Experience",
    client: "Producciones Roma",
    type: "Web + Marketing",
    description: "Desarrollo web para un evento musical dedicado a Mecano. Campañas de marketing digital integradas.",
    technologies: ["WordPress", "Analytics", "Google Ads", "TikTok", "META"],
    link: "https://mecanoexperience.com",
    category: "marketing",
    color: "#ff006e",
  },
  {
    id: 5,
    name: "Juan Vidal Fashion",
    client: "Juan Vidal",
    type: "E-commerce + Marketing",
    description: "Desarrollo web Shopify para el prestigioso diseñador de moda Juan Vidal.",
    technologies: ["Shopify", "Liquid", "Figma", "Google Ads", "META"],
    link: "https://juan-vidal.com/",
    category: "desarrollo",
    color: "#00ff87",
  },
  {
    id: 6,
    name: "Basico Homes Intranet",
    client: "Basico Homes Gestión SL",
    type: "Full Stack Development",
    description: "Desarrollo full stack para la creación de una intranet para la compañía inmobiliaria. Gestión de inquilinos, firma digital de contratos y acceso a diferentes API de scoring.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP7", "GIT", "Kanban"],
    link: "https://intranet.basico.es/",
    category: "desarrollo",
    color: "#3a86ff",
  },
  {
    id: 7,
    name: "Fundación Ortega y Gasset",
    client: "FUNDACIÓN JOSÉ ORTEGA Y GASSET",
    type: "Imagen + Web + Moodle + Marketing",
    description: "Rediseño de la imagen corporativa, desarrollo web en WordPress, Moodle y campañas de marketing digital, aula virtual para doctorados.",
    technologies: ["WordPress", "Moodle", "Adobe XD", "Google Ads", "META", "PHP7"],
    link: "https://iuiog.com/",
    category: "marketing",
    color: "#ffa001",
  },
];

const categories = [
  { id: "all", label: "Todos", icon: "◈" },
  { id: "histórico", label: "Históricos", icon: "◆" },
  { id: "desarrollo", label: "Desarrollo", icon: "◇" },
  { id: "marketing", label: "Marketing", icon: "◎" },
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="py-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full font-mono text-sm text-[var(--text-tertiary)] mb-4">
          <span className="text-[var(--color-accent)]">◇</span>
          <span>MÓDULO://PROYECTOS</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          <span className="gradient-text">PORTFOLIO</span>
        </h2>
        <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
          Una selección de proyectos que representan mi trayectoria profesional.
          Desde startups hasta corporaciones, cada proyecto es una historia de innovación.
        </p>
      </motion.div>

      {/* Featured Historical Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h3 className="text-sm font-mono text-[var(--color-primary)] mb-4 flex items-center gap-2">
          <span>◆</span> HITOS HISTÓRICOS
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {historicalProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <GlassCard
                className="h-full relative overflow-hidden group"
                onClick={() => setSelectedProject(project)}
              >
                {/* Accent line */}
                <div
                  className="absolute top-0 left-0 w-full h-1"
                  style={{ backgroundColor: project.color }}
                />
                
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: project.color }}
                />

                <div className="relative">
                  <div
                    className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center text-xl"
                    style={{
                      backgroundColor: `${project.color}20`,
                      border: `1px solid ${project.color}`,
                    }}
                  >
                    {project.id === 0 ? "🗺️" : project.id === 1 ? "📱" : "🏢"}
                  </div>

                  <h4 className="text-lg font-display font-bold text-[var(--text-primary)] mb-1">
                    {project.name}
                  </h4>
                  <p className="text-xs font-mono text-[var(--color-primary)] mb-3">
                    {project.type}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
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

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {filteredProjects.filter(p => !p.featured).map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard
              className="h-full group cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${project.color}20`,
                    border: `1px solid ${project.color}`,
                  }}
                >
                  <span className="text-lg">◇</span>
                </div>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="text-[var(--text-tertiary)] hover:text-[var(--color-primary)] transition-colors"
                  >
                    ↗
                  </a>
                )}
              </div>

              <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-1 group-hover:text-[var(--color-primary)] transition-colors">
                {project.name}
              </h4>
              <p className="text-xs font-mono text-[var(--text-tertiary)] mb-3">
                {project.type}
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-xs font-mono bg-[var(--bg-tertiary)] text-[var(--text-tertiary)]"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-0.5 rounded text-xs font-mono text-[var(--text-tertiary)]">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Project Modal - Using Portal to ensure visibility on mobile */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
}

// Modal component using Portal
function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !project) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
        style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 9999 
        }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 20 }}
          className="glass p-6 md:p-8 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-2xl font-display font-bold text-[var(--text-primary)]">
                {project.name}
              </h3>
              <p className="text-[var(--color-primary)] font-mono text-sm">
                {project.client}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              ✕
            </button>
          </div>

          <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="mb-6">
            <h4 className="text-sm font-mono text-[var(--color-accent)] mb-3">
              TECNOLOGÍAS
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm font-mono bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-primary)] text-[var(--bg-primary)] font-mono font-semibold hover:opacity-90 transition-opacity"
            >
              Ver Proyecto ↗
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
