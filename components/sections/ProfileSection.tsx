"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { GlassCard } from "@/components/ui/GlassCard";

const personalInfo = {
  name: "Alejandro Lamas",
  role: "Full Stack Developer & Project Manager",
  location: "Madrid, España",
  email: "hola@alejandrolamas.es",
  phone: "+34 667 894 561",
  availability: "Disponibilidad inmediata",
  mobility: "Movilidad geográfica: Sí",
  vehicle: "Vehículo propio: Sí",
  languages: ["Español (Nativo)", "Inglés (Profesional)"],
};

const biography = `+10 años de experiencia en desarrollo web y marketing digital. 
Ex-CTO, fundador de empresas. Especialista en desarrollo web, gestión y marketing. 
Actualmente liderando proyectos digitales en el Consejo General de Colegios de la Profesión Veterinaria de España.`;

const differentiator = `Formación continua: Doble Máster MBA + IA Empresarial (UNIR), 
aplicando visión estratégica y tecnológica a cada proyecto.`;

const objectives = `Mi objetivo profesional, tras haber estado durante mi última etapa 
laboral como autónomo dirigiendo no solo mi propia empresa, sino gestionando proyectos 
con personal a cargo, es la de formar parte de un equipo multidisciplinar en el que 
pueda aportar mis conocimientos y experiencia a fin de lograr los objetivos de la empresa.`;

const aptitudes = [
  "Liderazgo",
  "Negociación",
  "Autodidacta y resolutivo",
  "Implicación y flexibilidad",
  "Buenas dotes de comunicación",
  "Trabajo en equipo",
  "Trabajo bajo presión",
  "Disponibilidad",
];

const education = [
  {
    year: "2024 - 2025",
    degree: "Doble Máster MBA + Inteligencia Artificial Empresarial",
    institution: "Universidad UNIR",
    icon: "🎓",
  },
  {
    year: "2018 - 2020",
    degree: "Master en Marketing Digital y Comercio Electrónico",
    institution: "EAE Business School",
    icon: "📈",
  },
  {
    year: "2016 - 2018",
    degree: "Grado Superior en Desarrollo de Aplicaciones Web (DAW)",
    institution: "IES Virgen de la Paloma",
    icon: "💻",
  },
];

export function ProfileSection() {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  return (
    <div className="py-8">
      {/* Profile Image Modal */}
      <AnimatePresence>
        {isImageModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsImageModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsImageModalOpen(false)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors text-sm font-mono flex items-center gap-2"
              >
                <span>Cerrar</span>
                <span className="text-lg">✕</span>
              </button>
              
              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-[var(--color-primary)]/30 shadow-2xl shadow-[var(--color-primary)]/20">
                <Image
                  src="/profile.jpg"
                  alt="Alejandro Lamas - Full Stack Developer"
                  width={600}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
                {/* Gradient overlay at bottom */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-white font-display font-bold text-lg">Alejandro Lamas</p>
                  <p className="text-[var(--color-primary)] font-mono text-sm">Full Stack Developer</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full font-mono text-sm text-[var(--text-tertiary)] mb-4">
          <span className="text-[var(--color-primary)]">◉</span>
          <span>MÓDULO://PERFIL</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-display font-bold">
          <span className="gradient-text">PERFIL</span>
        </h2>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <GlassCard className="h-full">
            <div className="flex items-start gap-4 mb-6">
              {/* Profile Image - clickable */}
              <button
                onClick={() => setIsImageModalOpen(true)}
                className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 
                  ring-2 ring-[var(--color-primary)]/30 hover:ring-[var(--color-primary)] 
                  transition-all duration-300 hover:scale-105 cursor-pointer group"
                aria-label="Ver foto de perfil"
              >
                <Image
                  src="/profile.jpg"
                  alt="Alejandro Lamas"
                  fill
                  className="object-cover object-top"
                  sizes="64px"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[var(--color-primary)]/0 group-hover:bg-[var(--color-primary)]/20 transition-colors flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono">
                    👁
                  </span>
                </div>
              </button>
              <div>
                <h3 className="text-2xl font-display font-bold text-[var(--text-primary)]">
                  {personalInfo.name}
                </h3>
                <p className="text-[var(--color-primary)] font-mono text-sm">
                  {personalInfo.role}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-mono text-[var(--color-accent)] mb-2 flex items-center gap-2">
                  <span>▸</span> BIOGRAFÍA
                </h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {biography}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)]">
                <h4 className="text-sm font-mono text-[var(--color-accent)] mb-2 flex items-center gap-2">
                  <span>▸</span> DIFERENCIADOR
                </h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {differentiator}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--border-color)]">
                <h4 className="text-sm font-mono text-[var(--color-accent)] mb-2 flex items-center gap-2">
                  <span>▸</span> OBJETIVOS
                </h4>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {objectives}
                </p>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Sidebar Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Contact Info */}
          <GlassCard>
            <h4 className="text-sm font-mono text-[var(--color-primary)] mb-4 flex items-center gap-2">
              <span>◈</span> DATOS DE CONTACTO
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-accent)]">📍</span>
                <span className="text-[var(--text-secondary)]">{personalInfo.location}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-accent)]">📧</span>
                <a href={`mailto:${personalInfo.email}`} className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  {personalInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[var(--color-accent)]">📱</span>
                <a href={`tel:${personalInfo.phone.replace(/\s/g, '')}`} className="text-[var(--text-secondary)] hover:text-[var(--color-primary)] transition-colors">
                  {personalInfo.phone}
                </a>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-[var(--border-color)] space-y-2 text-sm text-[var(--text-tertiary)]">
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-success)]">●</span>
                {personalInfo.availability}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-success)]">●</span>
                {personalInfo.mobility}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-success)]">●</span>
                {personalInfo.vehicle}
              </div>
            </div>
          </GlassCard>

          {/* Aptitudes */}
          <GlassCard>
            <h4 className="text-sm font-mono text-[var(--color-primary)] mb-4 flex items-center gap-2">
              <span>⬡</span> APTITUDES
            </h4>
            <div className="flex flex-wrap gap-2">
              {aptitudes.map((apt, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)]"
                >
                  {apt}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <GlassCard>
          <h4 className="text-sm font-mono text-[var(--color-primary)] mb-6 flex items-center gap-2">
            <span>🎓</span> FORMACIÓN ACADÉMICA
          </h4>
          <div className="grid md:grid-cols-3 gap-4">
            {education.map((edu, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-[var(--bg-glass)] border border-[var(--border-color)] hover:border-[var(--color-primary)] transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{edu.icon}</span>
                  <span className="text-xs font-mono text-[var(--color-accent)]">
                    {edu.year}
                  </span>
                </div>
                <h5 className="font-semibold text-[var(--text-primary)] text-sm mb-1">
                  {edu.degree}
                </h5>
                <p className="text-xs text-[var(--text-tertiary)]">
                  {edu.institution}
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
