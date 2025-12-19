"use client";

import { motion } from "framer-motion";
import { useNeuralStore } from "@/store/neuralStore";
import { GlitchText } from "@/components/ui/GlitchText";
import { TerminalText } from "@/components/ui/TerminalText";

export function HomeSection() {
  const { initiateTransition, setCoreExpanded, coreExpanded, transitionPhase } = useNeuralStore();
  
  const handleNavigate = (section: 'contact' | 'skills') => {
    if (transitionPhase === 'idle') {
      initiateTransition(section);
    }
  };

  return (
    <div className="text-center py-6 md:py-12">
      {/* Main content with glass background on mobile */}
      <div className="p-4 md:p-12 bg-black/30 md:bg-transparent border border-[var(--border-color)] md:border-transparent rounded-2xl md:rounded-none">
        {/* Terminal header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-black/30 border border-[var(--border-color)] rounded-full font-mono text-xs md:text-sm text-[var(--text-tertiary)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse" />
            <span>NEURAL_OS v2.0 // ONLINE</span>
          </div>
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 md:mb-6"
        >
          <h1 className="text-4xl md:text-7xl font-display font-bold mb-4">
            <GlitchText text="ALEJANDRO" />
            <br />
            <span className="gradient-text">LAMAS</span>
          </h1>
        </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-6 md:mb-8"
      >
        <TerminalText 
          text="Full Stack Developer & Project Manager"
          className="text-lg md:text-2xl text-[var(--color-primary)] font-mono"
        />
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="max-w-2xl mx-auto text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-8 md:mb-12 px-2 md:px-0"
      >
        Desarrollador full stack con perfil técnico-estratégico, especializado en 
        desarrollo web, gestión de proyectos y marketing digital.
        <br /><br />
        Más de <span className="text-[var(--color-primary)] font-semibold">10 años de experiencia</span> combinando 
        tecnología, liderazgo y orientación a resultados. He trabajado como CTO, fundado y dirigido empresas, 
        y actualmente lidero el desarrollo de proyectos digitales clave en el sector veterinario.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="flex flex-wrap justify-center gap-4"
      >
        <button
          onClick={() => handleNavigate('skills')}
          className="
            group relative px-8 py-4 rounded-xl font-mono font-semibold
            bg-[var(--color-primary)] text-[var(--bg-primary)]
            hover:shadow-lg transition-all duration-300
            overflow-hidden
          "
          style={{ boxShadow: "var(--glow-primary)" }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <span>⬡</span>
            EXPLORAR STACK
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>

        <button
          onClick={() => handleNavigate('contact')}
          className="
            group px-8 py-4 rounded-xl font-mono font-semibold
            bg-black/30 border border-[var(--border-color)]
            hover:border-[var(--color-primary)] hover:bg-black/50
            text-[var(--text-primary)]
            transition-all duration-300 rounded-xl
          "
        >
          <span className="flex items-center gap-2">
            <span>⬢</span>
            CONECTAR
          </span>
        </button>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { value: "10+", label: "Años Experiencia" },
          { value: "50+", label: "Proyectos" },
          { value: "3", label: "Empresas Fundadas" },
          { value: "∞", label: "Curiosidad" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-black/30 border border-[var(--border-color)] p-4 rounded-xl text-center"
          >
            <div className="text-3xl md:text-4xl font-display font-bold text-[var(--color-primary)]">
              {stat.value}
            </div>
            <div className="text-sm font-mono text-[var(--text-tertiary)] mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="mt-16 text-center"
      >
        <div className="inline-flex flex-col items-center text-[var(--text-tertiary)] font-mono text-sm">
          <span className="mb-2">Haz clic en los nodos para navegar</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="text-2xl">◇</span>
          </motion.div>
        </div>
      </motion.div>
      </div> {/* Close glass-panel */}
    </div>
  );
}
