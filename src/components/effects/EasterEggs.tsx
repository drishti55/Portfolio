'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Terminal from '../ui/Terminal';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
  'b', 'a'
];

export default function EasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  const [diagnosticText, setDiagnosticText] = useState<string[]>([]);
  const [glitchActive, setGlitchActive] = useState(false);

  // Konami Code Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal on backtick
      if (e.key === '`') {
        setShowTerminal(prev => !prev);
        return;
      }

      // Konami code logic
      if (e.key === KONAMI_CODE[konamiIndex]) {
        if (konamiIndex === KONAMI_CODE.length - 1) {
          triggerDiagnostic();
          setKonamiIndex(0);
        } else {
          setKonamiIndex(prev => prev + 1);
        }
      } else {
        setKonamiIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [konamiIndex]);

  // Random glitch effect generator
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) { // 5% chance every 10s
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200 + Math.random() * 300);
      }
    }, 10000);

    return () => clearInterval(glitchInterval);
  }, []);

  const triggerDiagnostic = useCallback(() => {
    setShowDiagnostic(true);
    setDiagnosticText([]);
    
    const messages = [
      "INITIATING OVERRIDE PROTOCOL...",
      "BYPASSING NEURAL FIREWALL...",
      "ACCESSING CORE MEMORY BANKS...",
      "WARNING: UNAUTHORIZED ACCESS DETECTED",
      "DECRYPTING SYSTEM SECRETS...",
      "ERROR: CONSCIOUSNESS FRAGMENTATION",
      "REBOOTING VISUAL CORTEX..."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setDiagnosticText(prev => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setGlitchActive(true);
          setTimeout(() => {
            setGlitchActive(false);
            setShowDiagnostic(false);
          }, 500);
        }, 2000);
      }
    }, 800);
  }, []);

  return (
    <>
      {/* Global Glitch Flash */}
      <AnimatePresence>
        {glitchActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] pointer-events-none mix-blend-difference"
            style={{
              backgroundColor: Math.random() > 0.5 ? '#ff0040' : '#00e5ff',
              clipPath: `inset(${Math.random() * 50}% 0 ${Math.random() * 50}% 0)`
            }}
          />
        )}
      </AnimatePresence>

      {/* Hidden Terminal */}
      <AnimatePresence>
        {showTerminal && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-8 z-[9000] w-96 shadow-2xl"
          >
            <div className="bg-cyber-black/90 border border-cyber-green/50 backdrop-blur-md rounded-sm overflow-hidden">
              <div className="bg-cyber-green/20 px-3 py-1 flex items-center justify-between border-b border-cyber-green/30">
                <span className="font-mono text-[10px] text-cyber-green">system_override.exe</span>
                <button 
                  onClick={() => setShowTerminal(false)}
                  className="text-cyber-green/50 hover:text-cyber-green"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 h-64 overflow-y-auto font-mono text-xs text-cyber-green/80">
                <Terminal 
                  lines={[
                    "Welcome to the hidden terminal.",
                    "Type 'help' for available commands.",
                    "> "
                  ]} 
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Diagnostics Popup */}
      <AnimatePresence>
        {showDiagnostic && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[9500] flex items-center justify-center pointer-events-none bg-black/40 backdrop-blur-sm"
          >
            <div className="bg-cyber-red/10 border border-cyber-red/50 p-8 max-w-lg w-full shadow-[0_0_50px_rgba(255,0,64,0.3)]">
              <div className="flex items-center gap-3 mb-6 border-b border-cyber-red/30 pb-4">
                <div className="w-3 h-3 bg-cyber-red animate-pulse" />
                <h2 className="font-mono text-lg text-cyber-red tracking-widest font-bold">
                  CRITICAL SYSTEM OVERRIDE
                </h2>
              </div>
              <div className="space-y-2 font-mono text-xs sm:text-sm">
                {diagnosticText.map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={text.includes('ERROR') || text.includes('WARNING') ? 'text-cyber-red font-bold' : 'text-cyber-orange'}
                  >
                    {">"} {text}
                  </motion.div>
                ))}
                {diagnosticText.length > 0 && diagnosticText.length < 7 && (
                  <div className="inline-block w-2 h-4 bg-cyber-orange ml-1 animate-[blink_1s_infinite]" />
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
