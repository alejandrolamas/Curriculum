/* NEURAL INTERFACE - CLEAN VERSION */
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNeuralStore, Section, getCameraPositionForNode, getCameraLookAtForNode } from "@/store/neuralStore";
import { useEffect, useState } from "react";
import { HomeSection } from "@/components/sections/HomeSection";
import { ProfileSection } from "@/components/sections/ProfileSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";

const sectionComponents: Record<Section, React.ComponentType> = {
  home: HomeSection,
  profile: ProfileSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  blog: BlogSection,
  contact: ContactSection,
};

const sectionLabels: Record<Section, { label: string; color: string }> = {
  home: { label: "NEURAL OS", color: "#C1DF1F" },
  profile: { label: "PERFIL", color: "#C1DF1F" },
  experience: { label: "EXPERIENCIA", color: "#3a86ff" },
  projects: { label: "PROYECTOS", color: "#00f5d4" },
  skills: { label: "SKILLS", color: "#ff006e" },
  blog: { label: "EL LAB", color: "#8338ec" },
  contact: { label: "CONTACTO", color: "#00ff87" },
};

export function NeuralInterface() {
  const { 
    activeSection, 
    transitionPhase, 
    targetSection,
    setActiveSection,
    setTransitionPhase,
    setCameraTarget,
    setCameraLookAt,
    isMobile,
  } = useNeuralStore();
  
  const [displayedSection, setDisplayedSection] = useState<Section>(activeSection);
  
  const ActiveComponent = sectionComponents[displayedSection];
  const sectionInfo = sectionLabels[displayedSection];
  const isTransitioning = transitionPhase !== 'idle' && transitionPhase !== 'showContent';

  // Handle transition phases - spaceship navigation
  useEffect(() => {
    // Phase: zoomOut -> wait -> then zoomToNode
    if (transitionPhase === 'zoomOut' && targetSection) {
      const timer = setTimeout(() => {
        const cameraPos = getCameraPositionForNode(targetSection, isMobile);
        const lookAt = getCameraLookAtForNode(targetSection, isMobile);
        setCameraTarget(cameraPos);
        setCameraLookAt(lookAt);
        setTransitionPhase('zoomToNode');
      }, 1000); // Time to zoom out
      return () => clearTimeout(timer);
    }
    
    // Phase: zoomToNode -> wait for camera to arrive + node centered + 500ms -> showContent
    if (transitionPhase === 'zoomToNode' && targetSection) {
      const timer = setTimeout(() => {
        setDisplayedSection(targetSection);
        setTransitionPhase('showContent');
      }, 1500); // Camera travel time (1s) + 500ms wait after arrival
      return () => clearTimeout(timer);
    }
    
    // Phase: showContent -> complete
    if (transitionPhase === 'showContent') {
      const timer = setTimeout(() => {
        setActiveSection(targetSection!);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [transitionPhase, targetSection, setTransitionPhase, setActiveSection, setCameraTarget, setCameraLookAt, isMobile]);

  // Sync displayed section when idle
  useEffect(() => {
    if (transitionPhase === 'idle') {
      setDisplayedSection(activeSection);
    }
  }, [activeSection, transitionPhase]);

  const showContent = transitionPhase === 'idle' || transitionPhase === 'showContent';
  const isNotHome = displayedSection !== 'home';

  return (
    <>
      {/* Main Content - centered max-w-5xl like Home */}
      <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
        <AnimatePresence mode="wait">
          {showContent && (
            <motion.div
              key={displayedSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full max-w-5xl"
            >
              {isNotHome ? (
                // Section layout - clean, simple
                <div>
                  {/* Section Header */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className="flex items-center gap-3 mb-6"
                  >
                    <div 
                      className="w-1.5 h-8 md:h-10 rounded-full"
                      style={{ backgroundColor: sectionInfo.color }}
                    />
                    <h2 
                      className="font-display text-2xl md:text-3xl font-bold tracking-wider"
                      style={{ color: sectionInfo.color }}
                    >
                      {sectionInfo.label}
                    </h2>
                  </motion.div>

                  {/* Glass panel content */}
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                    className="glass-panel p-6 md:p-8 rounded-2xl"
                  >
                    <ActiveComponent />
                  </motion.div>
                </div>
              ) : (
                // Home - no container, fully transparent
                <ActiveComponent />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation indicator during transition */}
      <AnimatePresence>
        {isTransitioning && targetSection && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[20]"
          >
            <div className="bg-black/70 border border-[var(--border-color)] px-5 py-2.5 rounded-full font-mono text-sm flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 border-2 border-t-transparent rounded-full"
                style={{ borderColor: `${sectionLabels[targetSection].color} transparent transparent transparent` }}
              />
              <span className="text-[var(--text-secondary)]">
                {transitionPhase === 'zoomOut' ? 'Alejando...' : 'Navegando a '}
                {transitionPhase !== 'zoomOut' && (
                  <span style={{ color: sectionLabels[targetSection].color }}>
                    {sectionLabels[targetSection].label}
                  </span>
                )}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
