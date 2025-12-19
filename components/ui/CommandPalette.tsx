"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useNeuralStore, Section } from "@/store/neuralStore";

interface CommandItem {
  id: string;
  section?: Section;
  label: string;
  description: string;
  icon: string;
  shortcut?: string;
  action?: () => void;
}

const commands: CommandItem[] = [
  { id: "home", section: "home", label: "Ir a Inicio", description: "Volver al centro", icon: "⌂", shortcut: "H" },
  { id: "profile", section: "profile", label: "Ver Perfil", description: "Información personal", icon: "◉", shortcut: "P" },
  { id: "experience", section: "experience", label: "Timeline", description: "Historial profesional", icon: "◈", shortcut: "T" },
  { id: "projects", section: "projects", label: "Proyectos", description: "Portfolio de trabajos", icon: "◇", shortcut: "R" },
  { id: "skills", section: "skills", label: "Tech Stack", description: "Tecnologías y habilidades", icon: "⬡", shortcut: "S" },
  { id: "blog", section: "blog", label: "El Lab", description: "Blog y artículos", icon: "◎", shortcut: "L" },
  { id: "contact", section: "contact", label: "Contacto", description: "Enviar mensaje", icon: "⬢", shortcut: "C" },
  { id: "download", label: "Descargar CV", description: "Obtener currículum en PDF", icon: "↓" },
  { id: "linkedin", label: "LinkedIn", description: "Ver perfil profesional", icon: "in" },
  { id: "github", label: "GitHub", description: "Ver repositorios", icon: "⌥" },
];

export function CommandPalette() {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { activeSection, initiateTransition, setCommandPaletteOpen, transitionPhase } = useNeuralStore();

  const filteredCommands = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(search.toLowerCase()) ||
      cmd.description.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const executeCommand = (command: CommandItem) => {
    if (command.section) {
      if (command.section !== activeSection && transitionPhase === 'idle') {
        initiateTransition(command.section);
      }
    } else if (command.id === "download") {
      window.open("/cv-alejandro-lamas.pdf", "_blank");
    } else if (command.id === "linkedin") {
      window.open("https://www.linkedin.com/in/alejandrolamasperez/", "_blank");
    } else if (command.id === "github") {
      window.open("https://github.com/alejandrolamas", "_blank");
    }
    
    setCommandPaletteOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => 
        prev < filteredCommands.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        executeCommand(filteredCommands[selectedIndex]);
      }
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
        onClick={() => setCommandPaletteOpen(false)}
      />

      {/* Palette */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="command-palette"
      >
        <div className="glass overflow-hidden">
          {/* Search input */}
          <div className="flex items-center gap-3 p-4 border-b border-[var(--border-color)]">
            <span className="text-[var(--color-primary)] text-xl">⌘</span>
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe un comando o busca..."
              className="
                flex-1 bg-transparent outline-none
                font-mono text-[var(--text-primary)]
                placeholder:text-[var(--text-tertiary)]
              "
            />
            <kbd className="px-2 py-1 text-xs font-mono bg-[var(--bg-tertiary)] rounded text-[var(--text-tertiary)]">
              ESC
            </kbd>
          </div>

          {/* Command list */}
          <div className="max-h-[400px] overflow-y-auto">
            {filteredCommands.length === 0 ? (
              <div className="p-8 text-center text-[var(--text-tertiary)] font-mono">
                <span className="text-2xl block mb-2">∅</span>
                No se encontraron comandos
              </div>
            ) : (
              <ul className="p-2">
                {filteredCommands.map((command, index) => (
                  <li key={command.id}>
                    <button
                      onClick={() => executeCommand(command)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`
                        w-full flex items-center gap-4 p-3 rounded-lg
                        transition-colors duration-150
                        ${index === selectedIndex
                          ? "bg-[var(--bg-glass-hover)] border border-[var(--color-primary)]"
                          : "hover:bg-[var(--bg-glass)]"
                        }
                      `}
                    >
                      <span className={`
                        w-10 h-10 flex items-center justify-center rounded-lg
                        font-mono text-lg
                        ${index === selectedIndex
                          ? "bg-[var(--color-primary)] text-[var(--bg-primary)]"
                          : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                        }
                      `}>
                        {command.icon}
                      </span>
                      
                      <div className="flex-1 text-left">
                        <span className="block font-medium text-[var(--text-primary)]">
                          {command.label}
                        </span>
                        <span className="block text-sm text-[var(--text-tertiary)]">
                          {command.description}
                        </span>
                      </div>

                      {command.shortcut && (
                        <kbd className="px-2 py-1 text-xs font-mono bg-[var(--bg-tertiary)] rounded text-[var(--text-tertiary)]">
                          {command.shortcut}
                        </kbd>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-3 border-t border-[var(--border-color)] text-xs font-mono text-[var(--text-tertiary)]">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[var(--bg-tertiary)] rounded">↑↓</kbd>
                navegar
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[var(--bg-tertiary)] rounded">↵</kbd>
                seleccionar
              </span>
            </div>
            <span className="text-[var(--color-primary)]">Neural OS v2.0</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
