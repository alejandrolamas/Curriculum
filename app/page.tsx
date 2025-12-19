"use client";

import { NeuralScene } from "@/components/three/NeuralScene";
import { NeuralInterface } from "@/components/ui/NeuralInterface";
import { CommandPalette } from "@/components/ui/CommandPalette";
import { Navigation } from "@/components/ui/Navigation";
import { useNeuralStore, Section } from "@/store/neuralStore";
import { useEffect } from "react";
import { AnimatePresence } from "framer-motion";

const validSections: Section[] = ['home', 'profile', 'experience', 'projects', 'skills', 'blog', 'contact'];

export default function Home() {
  const { 
    setActiveSection, 
    commandPaletteOpen, 
    setCommandPaletteOpen, 
    setIsMobile,
    initiateTransition,
    setActiveBlogPostId,
  } = useNeuralStore();

  // Detect mobile and set in store
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setIsMobile]);

  // Handle URL hash on load and hash changes (deep linking)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // Remove #
      
      if (!hash) {
        setActiveSection('home', false);
        return;
      }
      
      // Check for blog post with slug: #blog/slug-del-articulo
      const blogSlugMatch = hash.match(/^blog\/([a-z0-9-]+)$/);
      if (blogSlugMatch) {
        const slug = blogSlugMatch[1];
        // We'll need to resolve slug to id in BlogSection
        // For now, store a special marker that BlogSection will handle
        setActiveSection('blog', false);
        // Pass slug as string, BlogSection will resolve it
        (window as any).__pendingBlogSlug = slug;
        return;
      }
      
      // Legacy: Check for blog post by ID: #blog/post/123
      const blogPostMatch = hash.match(/^blog\/post\/(\d+)$/);
      if (blogPostMatch) {
        const postId = parseInt(blogPostMatch[1], 10);
        setActiveSection('blog', false);
        setActiveBlogPostId(postId, false);
        return;
      }
      
      // Check for section: #profile, #experience, etc.
      if (validSections.includes(hash as Section)) {
        setActiveSection(hash as Section, false);
        return;
      }
    };

    // Handle initial load
    handleHashChange();
    
    // Listen for hash changes (browser back/forward)
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [setActiveSection, setActiveBlogPostId]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Palette: Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      // Close on Escape
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* 3D Neural Background */}
      <div className="canvas-container interactive">
        <NeuralScene />
      </div>

      {/* Grid Background Overlay */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-[1]" />
      
      {/* Scan Line Effect */}
      <div className="fixed inset-0 scan-line pointer-events-none z-[4]" />

      {/* Navigation */}
      <Navigation />

      {/* Main UI Layer */}
      <div className="ui-layer">
        <NeuralInterface />
      </div>

      {/* Command Palette */}
      <AnimatePresence>
        {commandPaletteOpen && <CommandPalette />}
      </AnimatePresence>

      {/* Keyboard Shortcut Hint - Hidden on mobile */}
      <div className="fixed bottom-4 left-4 z-50 hidden md:block">
        <div className="glass px-3 py-2 text-xs font-mono text-[var(--text-tertiary)]">
          <kbd className="px-1.5 py-0.5 bg-[var(--bg-tertiary)] rounded mr-1">Ctrl</kbd>
          <span className="mr-1">+</span>
          <kbd className="px-1.5 py-0.5 bg-[var(--bg-tertiary)] rounded">K</kbd>
          <span className="ml-2">Command Palette</span>
        </div>
      </div>
    </main>
  );
}
