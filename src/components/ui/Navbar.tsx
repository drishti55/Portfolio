'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NAV_ITEMS } from '@/lib/constants';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [glitchId, setGlitchId] = useState<string | null>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // --- Scroll direction detection (hide on scroll down, show on scroll up) ---
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;

      requestAnimationFrame(() => {
        const currentY = window.scrollY;

        if (currentY < 80) {
          setIsVisible(true);
        } else if (currentY > lastScrollY.current + 5) {
          setIsVisible(false);
          setIsMobileOpen(false);
        } else if (currentY < lastScrollY.current - 5) {
          setIsVisible(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // --- Active section tracking via IntersectionObserver ---
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection((prev) => {
              if (prev !== item.id) {
                // trigger glitch flash
                setGlitchId(item.id);
                setTimeout(() => setGlitchId(null), 200);
              }
              return item.id;
            });
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // --- Smooth scroll handler ---
  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsMobileOpen(false);
    },
    []
  );

  return (
    <>
      <style>{`
        @keyframes nav-glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 1px); }
          40% { transform: translate(2px, -1px); }
          60% { transform: translate(-1px, -1px); }
          80% { transform: translate(1px, 1px); }
          100% { transform: translate(0); }
        }
      `}</style>

      {/* Desktop / Main Navbar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="pointer-events-auto mx-auto max-w-7xl px-4 py-3">
          <div
            className="flex items-center justify-between rounded-md px-4 py-2.5 border border-white/[0.06]"
            style={{
              background: 'rgba(10, 10, 10, 0.75)',
              backdropFilter: 'blur(16px) saturate(1.3)',
              WebkitBackdropFilter: 'blur(16px) saturate(1.3)',
            }}
          >
            {/* Logo */}
            <button
              onClick={() => scrollTo('hero')}
              className="text-sm font-mono font-bold tracking-[0.25em] text-[#00ff41] uppercase cursor-pointer"
            >
              DRISHTI<span className="text-white/30">.EXE</span>
            </button>

            {/* Desktop nav items */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                const isGlitching = glitchId === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`
                      group relative flex items-center gap-1.5 px-3 py-1.5 rounded-sm
                      text-[11px] font-mono uppercase tracking-wider
                      transition-colors duration-200 cursor-pointer
                      ${isActive ? 'text-[#00ff41]' : 'text-white/40 hover:text-white/70'}
                    `}
                    style={
                      isGlitching
                        ? { animation: 'nav-glitch 0.2s linear' }
                        : undefined
                    }
                  >
                    {/* Active bg highlight */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-bg"
                        className="absolute inset-0 rounded-sm bg-[#00ff41]/[0.06] border border-[#00ff41]/20"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    <span className={`relative z-10 text-[9px] ${isActive ? 'text-[#00ff41]/60' : 'text-white/20'}`}>
                      {item.index}
                    </span>
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileOpen((prev) => !prev)}
              className="md:hidden flex flex-col gap-1 p-2 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              <motion.span
                className="block w-5 h-px bg-[#00ff41]"
                animate={isMobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-5 h-px bg-[#00ff41]"
                animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block w-5 h-px bg-[#00ff41]"
                animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center md:hidden"
            style={{
              background: 'rgba(5, 5, 5, 0.95)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="absolute top-5 right-5 p-3 text-white/50 hover:text-[#00ff41] cursor-pointer"
              aria-label="Close navigation menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="flex flex-col items-center gap-2">
              {NAV_ITEMS.map((item, i) => {
                const isActive = activeSection === item.id;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`
                      flex items-center gap-3 px-6 py-3
                      font-mono uppercase tracking-[0.2em] cursor-pointer
                      transition-colors duration-200
                      ${isActive ? 'text-[#00ff41]' : 'text-white/40'}
                    `}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                  >
                    <span className="text-xs text-white/20">{item.index}</span>
                    <span className="text-lg">{item.label}</span>
                    <span className="text-[10px] text-white/15">{item.sublabel}</span>
                  </motion.button>
                );
              })}
            </div>

            {/* Decorative scan lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.05) 2px, rgba(0,255,65,0.05) 4px)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
