"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { SITE } from "@/lib/constants";

const STATS = [
  { label: "Repositories", value: "15+", color: "#00ff41" },
  { label: "Languages", value: "4+", color: "#00e5ff" },
  { label: "Contributions", value: "200+", color: "#bf00ff" },
  { label: "Stars", value: "Growing", color: "#ffaa00" },
];

const ACTIVE_SYSTEMS = [
  { name: "Medusa-Protocol", status: "STABLE", lang: "Python" },
  { name: "EvalLens", status: "IN-DEV", lang: "Python" },
  { name: "EduRAG", status: "STABLE", lang: "Python" },
  { name: "Spec-to-Schema", status: "STABLE", lang: "Python" },
  { name: "Navyug", status: "COMPLETE", lang: "Python" },
];

export default function GitHubStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="github"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-cyber-black overflow-hidden"
    >
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
            / 07 — COMMAND.CENTER
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-gray-100">
            GITHUB
          </h2>
          <div className="h-px w-20 bg-cyber-lime/50 mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Stats and activity */}
          <div className="space-y-6">
            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-3"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="holo-card rounded-sm p-4 text-center"
                >
                  <div
                    className="font-heading text-2xl font-bold mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] text-gray-500 tracking-wider">
                    {stat.label.toUpperCase()}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* GitHub stats image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="holo-card rounded-sm p-4 overflow-hidden"
            >
              <div className="font-mono text-[10px] text-cyber-green/40 mb-3 tracking-wider">
                ACTIVITY MONITOR
              </div>
              <div className="relative w-full aspect-[2/1] bg-black/30 rounded-sm overflow-hidden flex items-center justify-center">
                <Image
                  src={`https://github-readme-stats.vercel.app/api?username=drishti55&show_icons=true&theme=transparent&hide_border=true&title_color=00ff41&text_color=888888&icon_color=00e5ff&bg_color=00000000`}
                  alt="GitHub Stats"
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
            </motion.div>

            {/* Contribution streak */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="holo-card rounded-sm p-4 overflow-hidden"
            >
              <div className="font-mono text-[10px] text-cyber-green/40 mb-3 tracking-wider">
                STREAK ANALYSIS
              </div>
              <div className="relative w-full aspect-[2/1] bg-black/30 rounded-sm overflow-hidden flex items-center justify-center">
                <Image
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=drishti55&theme=transparent&hide_border=true&ring=00ff41&fire=ff0040&currStreakLabel=00e5ff&sideLabels=888888&dates=555555&background=00000000&currStreakNum=00ff41&sideNums=00e5ff`}
                  alt="GitHub Streak"
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
            </motion.div>
          </div>

          {/* Right: Active systems + links */}
          <div className="space-y-6">
            {/* Terminal - Active systems */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="holo-card rounded-sm overflow-hidden"
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-cyber-red/50" />
                  <div className="w-2 h-2 rounded-full bg-cyber-orange/50" />
                  <div className="w-2 h-2 rounded-full bg-cyber-green/50" />
                </div>
                <span className="font-mono text-[10px] text-gray-500 ml-2">
                  active-systems.sh
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-4 font-mono text-xs">
                <div className="text-cyber-green/40 mb-3">
                  $ ls -la /repos/active/
                </div>
                <div className="space-y-1.5">
                  {ACTIVE_SYSTEMS.map((sys, i) => (
                    <motion.div
                      key={sys.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="flex items-center gap-3 text-[11px]"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          sys.status === "IN-DEV"
                            ? "bg-cyber-orange animate-pulse"
                            : sys.status === "COMPLETE"
                            ? "bg-cyber-cyan"
                            : "bg-cyber-green"
                        }`}
                      />
                      <span className="text-gray-400 w-36 truncate">
                        {sys.name}
                      </span>
                      <span
                        className={`text-[9px] px-1.5 py-0.5 rounded-sm border ${
                          sys.status === "IN-DEV"
                            ? "border-cyber-orange/20 text-cyber-orange/70"
                            : sys.status === "COMPLETE"
                            ? "border-cyber-cyan/20 text-cyber-cyan/70"
                            : "border-cyber-green/20 text-cyber-green/70"
                        }`}
                      >
                        {sys.status}
                      </span>
                      <span className="text-gray-600 text-[9px] ml-auto">
                        {sys.lang}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-3 text-cyber-green/30 flex items-center">
                  <span>$</span>
                  <span className="inline-block w-1.5 h-3 bg-cyber-green/40 ml-1 animate-[blink_1s_infinite]" />
                </div>
              </div>
            </motion.div>

            {/* Language stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="holo-card rounded-sm p-4"
            >
              <div className="font-mono text-[10px] text-cyber-green/40 mb-3 tracking-wider">
                LANGUAGE DISTRIBUTION
              </div>
              <div className="relative w-full aspect-[2/1] bg-black/30 rounded-sm overflow-hidden flex items-center justify-center">
                <Image
                  src={`https://github-readme-stats.vercel.app/api/top-langs/?username=drishti55&layout=compact&theme=transparent&hide_border=true&title_color=00ff41&text_color=888888&bg_color=00000000`}
                  alt="Top Languages"
                  fill
                  className="object-contain p-2"
                  unoptimized
                />
              </div>
            </motion.div>

            {/* Quick links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.0 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-heading text-xs tracking-widest text-cyber-green border border-cyber-green/30 hover:border-cyber-green/60 hover:bg-cyber-green/5 transition-all duration-300 rounded-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GITHUB PROFILE
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 font-heading text-xs tracking-widest text-cyber-cyan border border-cyber-cyan/30 hover:border-cyber-cyan/60 hover:bg-cyber-cyan/5 transition-all duration-300 rounded-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LINKEDIN
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
