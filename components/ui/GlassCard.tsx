"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  onClick,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.01, y: -2 } : undefined}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`
        glass p-6 rounded-2xl
        ${hover ? "glass-hover cursor-pointer" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
