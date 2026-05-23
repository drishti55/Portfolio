'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

interface TerminalProps {
  lines: string[];
  title?: string;
  autoType?: boolean;
  typingSpeed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function Terminal({
  lines,
  title = 'terminal',
  autoType = true,
  typingSpeed = 35,
  className = '',
  onComplete,
}: TerminalProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(autoType);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Show all lines immediately if not auto-typing
  useEffect(() => {
    if (!autoType) {
      setDisplayedLines(lines);
      setIsComplete(true);
    }
  }, [autoType, lines]);

  // Typewriter effect
  useEffect(() => {
    if (!isTyping || !autoType || currentLineIndex >= lines.length) {
      if (autoType && currentLineIndex >= lines.length && !isComplete) {
        setIsComplete(true);
        onCompleteRef.current?.();
      }
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex <= currentLine.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];
          updated[currentLineIndex] = currentLine.slice(0, currentCharIndex);
          return updated;
        });

        if (currentCharIndex === currentLine.length) {
          // Move to next line after a brief pause
          setTimeout(() => {
            setCurrentLineIndex((i) => i + 1);
            setCurrentCharIndex(0);
            setDisplayedLines((prev) => [...prev, '']);
          }, 100);
        } else {
          setCurrentCharIndex((c) => c + 1);
        }
      }, typingSpeed);

      return () => clearTimeout(timeout);
    }
  }, [isTyping, autoType, currentLineIndex, currentCharIndex, lines, typingSpeed, isComplete]);

  // Init first line
  useEffect(() => {
    if (autoType && displayedLines.length === 0) {
      setDisplayedLines(['']);
    }
  }, [autoType, displayedLines.length]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [displayedLines]);

  return (
    <>
      <style>{`
        @keyframes terminal-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
      <motion.div
        className={`rounded-md overflow-hidden border border-[#00ff41]/20 bg-[#0a0a0a] ${className}`}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-[#111] border-b border-white/5">
          {/* Traffic lights */}
          <span className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
          </span>
          <span className="ml-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
            {title}
          </span>
        </div>

        {/* Terminal body */}
        <div
          ref={containerRef}
          className="p-4 max-h-80 overflow-y-auto font-mono text-sm leading-relaxed"
          style={{ color: '#00ff41' }}
        >
          {displayedLines.map((line, i) => (
            <div key={i} className="flex">
              <span className="text-[#00ff41]/40 mr-2 select-none">{'>'}</span>
              <span>
                {line}
                {/* Blinking cursor on the current typing line */}
                {autoType && i === currentLineIndex && !isComplete && (
                  <span
                    className="inline-block w-2 h-4 ml-0.5 align-middle bg-[#00ff41]"
                    style={{ animation: 'terminal-blink 1s step-end infinite' }}
                  />
                )}
              </span>
            </div>
          ))}

          {/* Cursor after completion */}
          {isComplete && (
            <div className="flex mt-1">
              <span className="text-[#00ff41]/40 mr-2 select-none">{'>'}</span>
              <span
                className="inline-block w-2 h-4 bg-[#00ff41]"
                style={{ animation: 'terminal-blink 1s step-end infinite' }}
              />
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
}
