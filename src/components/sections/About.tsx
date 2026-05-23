"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const ABOUT_TEXT = [
  "I'm Drishti, an AI Engineer and Computer Science student passionate about building intelligent systems, cinematic digital experiences, and next-generation AI applications.",
  "My work focuses on Deep Learning, LLM Systems, Retrieval-Augmented Generation (RAG), AI Infrastructure, and intelligent automation workflows. I enjoy combining artificial intelligence with experimental frontend engineering to create systems that feel both technically powerful and visually immersive.",
  "I've built projects ranging from secure medical AI frameworks and structured LLM evaluation systems to semantic retrieval assistants and AI-powered workflow automation platforms.",
  "Beyond AI, I actively explore creative frontend development, cyberpunk-inspired UI systems, interactive experiences, and game-style interface design. I enjoy turning complex engineering ideas into immersive digital environments that feel alive and cinematic.",
  "Currently, I'm focused on building AI systems that merge intelligence, creativity, and engineering into meaningful real-world experiences.",
];

const SYSTEM_CAPABILITIES = [
  { label: "AI Systems Architecture", value: 95 },
  { label: "Deep Learning Engineering", value: 90 },
  { label: "LLM Pipeline Design", value: 92 },
  { label: "RAG System Development", value: 88 },
  { label: "Full-Stack Integration", value: 85 },
  { label: "Creative Frontend Engineering", value: 82 },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-cyber-black overflow-hidden"
    >
      {/* Section divider */}
      <div className="section-divider mb-20" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="font-mono text-[10px] sm:text-xs text-cyber-green/50 tracking-[0.3em] mb-3">
            / 02 — SYSTEM.PROFILE
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-gray-100">
            ABOUT
          </h2>
          <div className="h-px w-20 bg-cyber-green/50 mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Bio text - Terminal style */}
          <div className="lg:col-span-3">
            <div className="relative">
              {/* Terminal header */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mb-4 font-mono text-xs text-cyber-green/40"
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyber-red/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-cyber-orange/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-cyber-green/50" />
                </div>
                <span className="ml-2">drishti@system:~/about</span>
              </motion.div>

              {/* Terminal body */}
              <div className="holo-card rounded-sm p-5 sm:p-8">
                {ABOUT_TEXT.map((text, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                    className="mb-4 last:mb-0"
                  >
                    <span className="font-mono text-cyber-green/30 text-xs mr-2">
                      {">"}
                    </span>
                    <span className="text-sm sm:text-base text-gray-300 leading-relaxed font-body">
                      {text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: System capabilities */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="holo-card rounded-sm p-5 sm:p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-xs tracking-[0.2em] text-cyber-green">
                  SYSTEM CAPABILITIES
                </h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                  <span className="font-mono text-[10px] text-cyber-green/50">
                    ACTIVE
                  </span>
                </div>
              </div>

              {/* Capability bars */}
              {SYSTEM_CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="mb-4 last:mb-0"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-mono text-[10px] sm:text-xs text-gray-400 tracking-wide">
                      {cap.label}
                    </span>
                    <span className="font-mono text-[10px] text-cyber-green/70">
                      {cap.value}%
                    </span>
                  </div>
                  <div className="h-1 bg-cyber-green/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${cap.value}%` } : {}}
                      transition={{
                        delay: 0.6 + i * 0.1,
                        duration: 1,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #00ff41, #00e5ff)`,
                        boxShadow: "0 0 8px rgba(0,255,65,0.4)",
                      }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Core focus areas */}
              <div className="mt-6 pt-4 border-t border-cyber-green/10">
                <div className="font-mono text-[10px] text-cyber-green/40 mb-3 tracking-wider">
                  CORE MODULES
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "AI Systems",
                    "LLM Engineering",
                    "RAG Systems",
                    "Deep Learning",
                    "Automation",
                    "Full-Stack AI",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] px-2 py-1 border border-cyber-green/20 text-cyber-green/60 rounded-sm hover:border-cyber-green/50 hover:text-cyber-green transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Console snippet */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.0 }}
              className="mt-4 holo-card rounded-sm p-4"
            >
              <div className="font-mono text-[10px] text-cyber-green/40 mb-2">
                {"> CONSOLE"}
              </div>
              <div className="font-mono text-[10px] text-cyber-green/30 space-y-1">
                <div>
                  Drishti@system:~
                </div>
                <div>$ building</div>
                <div>$ innovating</div>
                <div>$ optimizing</div>
                <div className="flex items-center">
                  <span>$ creating impact</span>
                  <span className="inline-block w-1.5 h-3 bg-cyber-green/60 ml-1 animate-[blink_1s_infinite]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
