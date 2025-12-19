"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ 
  code, 
  language = "javascript", 
  filename,
  showLineNumbers = true 
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-[var(--border-color)] bg-[#0d1117]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[var(--border-color)]">
        <div className="flex items-center gap-3">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27ca3f]" />
          </div>
          {/* Filename or language */}
          <span className="text-xs font-mono text-[var(--text-tertiary)]">
            {filename || language}
          </span>
        </div>
        
        {/* Copy button */}
        <motion.button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono transition-colors ${
            copied 
              ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]' 
              : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
          }`}
          animate={copied ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            animate={copied ? { rotate: [0, 360] } : {}}
            transition={{ duration: 0.3 }}
          >
            {copied ? '✓' : '⧉'}
          </motion.span>
          <span>{copied ? 'Copiado' : 'Copiar'}</span>
        </motion.button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono leading-relaxed">
          <code>
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none w-8 pr-4 text-right text-[var(--text-tertiary)] opacity-50">
                    {index + 1}
                  </span>
                )}
                <span className="flex-1 text-[#e6edf3]">
                  {highlightSyntax(line, language)}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

// Simple syntax highlighting
function highlightSyntax(line: string, language: string): React.ReactNode {
  // Keywords
  const keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'from', 'default', 'async', 'await', 'class', 'extends', 'new', 'this', 'try', 'catch', 'throw', 'npm', 'npx', 'install', 'cd', 'mkdir'];
  const types = ['string', 'number', 'boolean', 'null', 'undefined', 'true', 'false'];
  
  // Simple regex-based highlighting
  let result = line;
  
  // Highlight strings
  result = result.replace(/(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, '<span class="text-[#a5d6ff]">$&</span>');
  
  // Highlight comments
  result = result.replace(/(\/\/.*$)/g, '<span class="text-[#8b949e] italic">$1</span>');
  
  // Highlight keywords
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
    result = result.replace(regex, '<span class="text-[#ff7b72]">$1</span>');
  });
  
  // Highlight types/values
  types.forEach(type => {
    const regex = new RegExp(`\\b(${type})\\b`, 'g');
    result = result.replace(regex, '<span class="text-[#79c0ff]">$1</span>');
  });
  
  // Highlight numbers
  result = result.replace(/\b(\d+)\b/g, '<span class="text-[#a5d6ff]">$1</span>');
  
  // Highlight functions
  result = result.replace(/(\w+)(?=\()/g, '<span class="text-[#d2a8ff]">$1</span>');

  return <span dangerouslySetInnerHTML={{ __html: result }} />;
}

// Inline code component
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-[var(--bg-tertiary)] text-[var(--color-primary)] font-mono text-sm border border-[var(--border-color)]">
      {children}
    </code>
  );
}

// Command line component
export function CommandLine({ command, output }: { command: string; output?: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-[var(--border-color)] bg-[#0d1117]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[var(--border-color)]">
        <span className="text-xs font-mono text-[var(--text-tertiary)]">terminal</span>
        <motion.button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-mono transition-colors ${
            copied 
              ? 'bg-[var(--color-success)]/20 text-[var(--color-success)]' 
              : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
          }`}
          animate={copied ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.2 }}
        >
          <motion.span
            animate={copied ? { rotate: [0, 360] } : {}}
            transition={{ duration: 0.3 }}
          >
            {copied ? '✓' : '⧉'}
          </motion.span>
          <span>{copied ? 'Copiado' : 'Copiar'}</span>
        </motion.button>
      </div>
      <div className="p-4 font-mono text-sm">
        <div className="flex items-center gap-2">
          <span className="text-[var(--color-success)]">$</span>
          <span className="text-[#e6edf3]">{command}</span>
        </div>
        {output && (
          <div className="mt-2 text-[var(--text-tertiary)]">{output}</div>
        )}
      </div>
    </div>
  );
}
