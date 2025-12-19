"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface TerminalTextProps {
  text: string;
  className?: string;
  speed?: number;
  showCursor?: boolean;
}

export function TerminalText({
  text,
  className = "",
  speed = 50,
  showCursor = true,
}: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span className={`font-mono ${className}`}>
      <span className="text-[var(--color-accent)] mr-2">{">"}</span>
      {displayedText}
      {showCursor && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          className="ml-1 inline-block w-3 h-[1.2em] bg-current align-middle"
        />
      )}
    </span>
  );
}
