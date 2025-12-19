"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNeuralStore, Section } from "@/store/neuralStore";

interface NavItem {
  id: Section;
  label: string;
  icon: string;
  shortcut: string;
}

const navItems: NavItem[] = [
  { id: "home", label: "Inicio", icon: "⌂", shortcut: "H" },
  { id: "profile", label: "Perfil", icon: "◉", shortcut: "P" },
  { id: "experience", label: "Timeline", icon: "◈", shortcut: "T" },
  { id: "projects", label: "Proyectos", icon: "◇", shortcut: "R" },
  { id: "skills", label: "Stack", icon: "⬡", shortcut: "S" },
  { id: "blog", label: "Lab", icon: "◎", shortcut: "L" },
  { id: "contact", label: "Link", icon: "⬢", shortcut: "C" },
];

// Desktop Navigation
function DesktopNav() {
  const { activeSection, initiateTransition, transitionPhase } = useNeuralStore();
  
  const handleNavClick = (sectionId: Section) => {
    if (sectionId !== activeSection && transitionPhase === 'idle') {
      initiateTransition(sectionId);
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="glass p-2 rounded-2xl"
      >
        <ul className="flex flex-col gap-2">
          {navItems.map((item, index) => {
            const isActive = activeSection === item.id;
            
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <button
                  onClick={() => handleNavClick(item.id)}
                  disabled={transitionPhase !== 'idle'}
                  className={`
                    group relative flex items-center justify-center w-12 h-12 rounded-xl
                    transition-all duration-300 font-mono text-lg
                    disabled:cursor-not-allowed
                    ${isActive
                      ? "bg-[var(--color-primary)] text-[var(--bg-primary)] shadow-lg"
                      : "hover:bg-[var(--bg-glass-hover)] text-[var(--text-secondary)]"
                    }
                  `}
                  style={{
                    boxShadow: isActive ? "var(--glow-primary)" : "none",
                  }}
                  title={`${item.label} (${item.shortcut})`}
                >
                  <span className="text-xl">{item.icon}</span>
                  
                  {/* Tooltip */}
                  <span className="
                    absolute right-full mr-3 px-3 py-1.5 rounded-lg
                    bg-[var(--bg-secondary)] border border-[var(--border-color)]
                    text-sm font-mono text-[var(--text-primary)]
                    opacity-0 group-hover:opacity-100
                    pointer-events-none transition-opacity duration-200
                    whitespace-nowrap
                  ">
                    {item.label}
                    <span className="ml-2 text-[var(--text-tertiary)]">[{item.shortcut}]</span>
                  </span>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </nav>
  );
}

// Mobile Navigation
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const { activeSection, initiateTransition, transitionPhase } = useNeuralStore();
  
  const handleNavClick = (sectionId: Section) => {
    if (sectionId !== activeSection && transitionPhase === 'idle') {
      initiateTransition(sectionId);
      setIsOpen(false);
    }
  };

  const activeItem = navItems.find(item => item.id === activeSection);

  return (
    <div className="fixed top-4 right-4 z-50 md:hidden">
      {/* Hamburger Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 glass rounded-xl flex items-center justify-center"
        style={{
          boxShadow: isOpen ? "var(--glow-primary)" : "none",
        }}
      >
        <div className="flex flex-col gap-1.5 w-5">
          <motion.span 
            animate={{ 
              rotate: isOpen ? 45 : 0,
              y: isOpen ? 6 : 0,
            }}
            className="w-full h-0.5 bg-[var(--color-primary)] rounded-full origin-center"
          />
          <motion.span 
            animate={{ 
              opacity: isOpen ? 0 : 1,
              scaleX: isOpen ? 0 : 1,
            }}
            className="w-full h-0.5 bg-[var(--color-primary)] rounded-full"
          />
          <motion.span 
            animate={{ 
              rotate: isOpen ? -45 : 0,
              y: isOpen ? -6 : 0,
            }}
            className="w-full h-0.5 bg-[var(--color-primary)] rounded-full origin-center"
          />
        </div>
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 glass rounded-2xl p-3 min-w-[200px]"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: 0.03 * index }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      disabled={transitionPhase !== 'idle'}
                      className={`
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl
                        transition-all duration-200 font-mono text-sm
                        disabled:cursor-not-allowed
                        ${isActive
                          ? "bg-[var(--color-primary)] text-[var(--bg-primary)]"
                          : "hover:bg-[var(--bg-glass-hover)] text-[var(--text-primary)]"
                        }
                      `}
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navigation() {
  return (
    <>
      <DesktopNav />
      <MobileNav />
    </>
  );
}
