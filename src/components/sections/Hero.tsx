"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { SITE } from "@/lib/constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SCAN_LINES_COUNT = 80;

interface HeroProps {
  isReady: boolean;
}

export default function Hero({ isReady }: HeroProps) {
  const [phase, setPhase] = useState<
    "scanning" | "identifying" | "revealed" | "complete"
  >("scanning");
  const [scanProgress, setScanProgress] = useState(0);
  const [identityLines, setIdentityLines] = useState<string[]>([]);
  const [glitchActive, setGlitchActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    // Cinematic parallax effect on scroll
    gsap.to(parallaxRef.current, {
      yPercent: 30,
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  const IDENTITY_SEQUENCE = [
    "SUBJECT DETECTED",
    "ANALYZING NEURAL SIGNATURE...",
    "MATCH FOUND: 99.7%",
    "───────────────────",
    "NAME: DRISHTI",
    "ROLE: AI ENGINEER",
    "CLEARANCE: LEVEL-7",
    "STATUS: ACTIVE",
    "───────────────────",
    "SYSTEM ACCESS: GRANTED",
  ];

  // Scanning phase
  useEffect(() => {
    if (!isReady) return;

    const scanInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(scanInterval);
          setPhase("identifying");
          return 100;
        }
        return prev + 1.5;
      });
    }, 30);

    return () => clearInterval(scanInterval);
  }, [isReady]);

  // Identity reveal phase
  useEffect(() => {
    if (phase !== "identifying") return;

    let lineIndex = 0;
    const lineInterval = setInterval(() => {
      if (lineIndex < IDENTITY_SEQUENCE.length) {
        setIdentityLines((prev) => [...prev, IDENTITY_SEQUENCE[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(lineInterval);
        // Trigger glitch
        setGlitchActive(true);
        setTimeout(() => {
          setGlitchActive(false);
          setPhase("revealed");
        }, 600);
        setTimeout(() => setPhase("complete"), 1200);
      }
    }, 200);

    return () => clearInterval(lineInterval);
  }, [phase]);

  // Random ambient glitches
  useEffect(() => {
    if (phase !== "complete") return;
    const glitchTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      }
    }, 5000);
    return () => clearInterval(glitchTimer);
  }, [phase]);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cyber-black"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      {/* Vertical data streams */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 w-px opacity-20"
            style={{
              left: `${12 + i * 12}%`,
              height: "100%",
              background: `linear-gradient(180deg, transparent 0%, ${
                i % 2 === 0 ? "#00ff41" : "#00e5ff"
              } 50%, transparent 100%)`,
              animation: `data-flow ${6 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div ref={parallaxRef} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left: Profile with scanline reconstruction */}
          <AnimatePresence>
            {isReady && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative flex justify-center lg:justify-start"
              >
                <div className="relative w-72 h-96 sm:w-80 sm:h-[28rem] lg:w-96 lg:h-[32rem]">
                  {/* Profile image with scanline reveal */}
                  <div
                    className="relative w-full h-full overflow-hidden rounded-sm"
                    style={{
                      clipPath:
                        phase === "scanning"
                          ? `inset(0 0 ${100 - scanProgress}% 0)`
                          : "inset(0 0 0 0)",
                    }}
                  >
                    <Image
                      src="/profile.png"
                      alt="Drishti - AI Engineer"
                      fill
                      className="object-cover object-top"
                      style={{
                        filter: glitchActive
                          ? "hue-rotate(90deg) contrast(1.5) brightness(1.2)"
                          : phase === "complete"
                          ? "none"
                          : "grayscale(0.5) contrast(1.2) brightness(0.9)",
                        transition: "filter 0.3s ease",
                      }}
                      priority
                    />

                    {/* Scanline sweep effect */}
                    {phase === "scanning" && (
                      <div
                        className="absolute left-0 right-0 h-1 z-10"
                        style={{
                          top: `${scanProgress}%`,
                          background:
                            "linear-gradient(180deg, transparent, #00ff41, transparent)",
                          boxShadow: "0 0 20px #00ff41, 0 0 40px #00ff41",
                        }}
                      />
                    )}

                    {/* CRT scanlines overlay on image */}
                    <div
                      className="absolute inset-0 pointer-events-none z-20"
                      style={{
                        background:
                          "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
                      }}
                    />

                    {/* Glitch overlay */}
                    {glitchActive && (
                      <div className="absolute inset-0 z-30 mix-blend-screen">
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              "linear-gradient(transparent 50%, rgba(0,255,65,0.1) 50%)",
                            backgroundSize: "100% 4px",
                            animation: "glitch-1 0.3s infinite",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* HUD frame corners */}
                  <div className="absolute -inset-2 pointer-events-none">
                    {/* Top-left */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-cyber-green opacity-80" />
                    {/* Top-right */}
                    <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-cyber-green opacity-80" />
                    {/* Bottom-left */}
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-cyber-green opacity-80" />
                    {/* Bottom-right */}
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-cyber-green opacity-80" />
                  </div>

                  {/* AI Identity scan overlay */}
                  <AnimatePresence>
                    {(phase === "identifying" || phase === "revealed") && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute -right-4 top-4 sm:-right-8 z-40 font-mono text-[10px] sm:text-xs"
                      >
                        <div className="bg-black/80 border border-cyber-green/30 p-2 sm:p-3 rounded-sm backdrop-blur-sm">
                          <div className="text-cyber-green/60 mb-1">
                            AI IDENTITY SCAN
                          </div>
                          {identityLines.map((line, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`${
                                line?.includes("DRISHTI") ||
                                line?.includes("GRANTED")
                                  ? "text-cyber-green font-bold"
                                  : line?.includes("ACTIVE")
                                  ? "text-cyber-cyan"
                                  : "text-cyber-green/70"
                              }`}
                            >
                              {line?.includes("───") ? (
                                <span className="text-cyber-green/20">
                                  {line}
                                </span>
                              ) : (
                                <>
                                  <span className="text-cyber-green/40">
                                    {">"}{" "}
                                  </span>
                                  {line}
                                </>
                              )}
                            </motion.div>
                          ))}
                          {phase === "identifying" && (
                            <span className="inline-block w-2 h-3 bg-cyber-green ml-1 animate-[blink_1s_infinite]" />
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Scan progress */}
                  {phase === "scanning" && (
                    <div className="absolute -bottom-8 left-0 right-0">
                      <div className="flex items-center gap-2 font-mono text-[10px] text-cyber-green/60">
                        <span>SCAN</span>
                        <div className="flex-1 h-px bg-cyber-green/20 relative">
                          <div
                            className="absolute top-0 left-0 h-full bg-cyber-green transition-all duration-100"
                            style={{ width: `${scanProgress}%` }}
                          />
                        </div>
                        <span>{Math.round(scanProgress)}%</span>
                      </div>
                    </div>
                  )}

                  {/* MATCH confirmation */}
                  {phase === "complete" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -bottom-6 left-0 right-0 text-center"
                    >
                      <span className="font-mono text-[10px] text-cyber-green/80 tracking-widest">
                        MATCH: 100% — IDENTITY VERIFIED
                      </span>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right: Title and CTA */}
          <AnimatePresence>
            {isReady && (
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center lg:text-left"
              >
                {/* System header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="font-mono text-[10px] sm:text-xs text-cyber-green/50 tracking-[0.3em] mb-4"
                >
                  / 01 — PROFILE.AI
                </motion.div>

                {/* DRISHTI title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-wider mb-2"
                  style={{
                    color: "#e0e0e0",
                    textShadow: glitchActive
                      ? "3px 0 #ff0040, -3px 0 #00e5ff"
                      : "0 0 20px rgba(0,255,65,0.15)",
                  }}
                >
                  DRISHTI
                </motion.h1>

                {/* Role */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="flex items-center gap-3 justify-center lg:justify-start mb-6"
                >
                  <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-cyber-green/50" />
                  <span className="font-heading text-sm sm:text-base tracking-[0.25em] text-cyber-cyan">
                    AI ENGINEER
                  </span>
                  <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-cyber-cyan/50" />
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="text-sm sm:text-base lg:text-lg text-gray-400 leading-relaxed max-w-lg mx-auto lg:mx-0 mb-10 font-body"
                >
                  Building intelligent systems, AI infrastructures, and
                  cinematic digital experiences.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 }}
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  {/* View Projects */}
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="group relative px-6 py-3 font-heading text-xs tracking-widest text-cyber-green border border-cyber-green/50 hover:border-cyber-green bg-cyber-green/5 hover:bg-cyber-green/10 transition-all duration-300 rounded-sm"
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                    }}
                  >
                    <span className="relative z-10">VIEW PROJECTS</span>
                    <div className="absolute inset-0 bg-cyber-green/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>

                  {/* Download Resume */}
                  <a
                    href={SITE.resume}
                    download
                    className="group relative px-6 py-3 font-heading text-xs tracking-widest text-cyber-cyan border border-cyber-cyan/30 hover:border-cyber-cyan bg-cyber-cyan/5 hover:bg-cyber-cyan/10 transition-all duration-300 rounded-sm"
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                    }}
                  >
                    DOWNLOAD RESUME
                  </a>

                  {/* Contact */}
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="group relative px-6 py-3 font-heading text-xs tracking-widest text-cyber-purple border border-cyber-purple/30 hover:border-cyber-purple bg-cyber-purple/5 hover:bg-cyber-purple/10 transition-all duration-300 rounded-sm"
                    style={{
                      clipPath:
                        "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                    }}
                  >
                    CONTACT
                  </button>
                </motion.div>

                {/* System status bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.0 }}
                  className="mt-12 font-mono text-[10px] text-cyber-green/30 flex flex-wrap gap-x-6 gap-y-1 justify-center lg:justify-start"
                >
                  <span>SYS.STATUS: ONLINE</span>
                  <span>NEURAL.SYNC: ACTIVE</span>
                  <span>MEM.ALLOC: 94%</span>
                  <span>
                    UPTIME:{" "}
                    <LiveUptime />
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom HUD bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isReady ? 0.4 : 0 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyber-green to-transparent"
      />

      {/* Scroll indicator */}
      {phase === "complete" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[10px] text-cyber-green/30 tracking-widest">
            SCROLL
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-6 bg-gradient-to-b from-cyber-green/50 to-transparent"
          />
        </motion.div>
      )}
    </section>
  );
}

function LiveUptime() {
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
      const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
      const s = String(elapsed % 60).padStart(2, "0");
      setUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return <span>{uptime}</span>;
}
