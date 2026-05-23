"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { achievements } from "@/data/achievements";

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="achievements"
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
            / 06 — CLASSIFIED.RECORDS
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-gray-100">
            ACHIEVEMENTS
          </h2>
          <div className="h-px w-20 bg-cyber-orange/50 mt-4" />
        </motion.div>

        {/* Achievement cards */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl">
          {achievements.map((achievement, i) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 40, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
              className="group relative"
            >
              <div className="relative rounded-sm overflow-hidden bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.06] hover:border-cyber-orange/30 transition-all duration-500 p-6 sm:p-8">
                {/* Classification badge */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`font-mono text-[10px] px-2 py-0.5 rounded-sm border ${
                      achievement.classification === "PRIORITY-CRITICAL"
                        ? "border-cyber-red/30 text-cyber-red bg-cyber-red/5"
                        : "border-cyber-orange/30 text-cyber-orange bg-cyber-orange/5"
                    }`}
                  >
                    {achievement.classification}
                  </span>
                  <span className="font-mono text-[10px] text-gray-600">
                    RECORD.{String(i + 1).padStart(3, "0")}
                  </span>
                </div>

                {/* Position medal */}
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className="flex-shrink-0 w-14 h-14 flex items-center justify-center rounded-sm border transition-all duration-500"
                    style={{
                      borderColor:
                        achievement.position === "2nd Prize"
                          ? "rgba(0,229,255,0.3)"
                          : "rgba(255,170,0,0.3)",
                      background:
                        achievement.position === "2nd Prize"
                          ? "rgba(0,229,255,0.05)"
                          : "rgba(255,170,0,0.05)",
                      boxShadow:
                        achievement.position === "2nd Prize"
                          ? "0 0 15px rgba(0,229,255,0.1)"
                          : "0 0 15px rgba(255,170,0,0.1)",
                    }}
                  >
                    <span
                      className="font-heading text-lg font-bold"
                      style={{
                        color:
                          achievement.position === "2nd Prize"
                            ? "#00e5ff"
                            : "#ffaa00",
                      }}
                    >
                      {achievement.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-heading text-base sm:text-lg tracking-wider text-gray-100 mb-1">
                      {achievement.title}
                    </h3>
                    <div className="font-mono text-xs text-gray-500">
                      {achievement.event}
                    </div>
                  </div>
                </div>

                {/* Position */}
                <div className="font-heading text-sm tracking-wider mb-3"
                  style={{
                    color:
                      achievement.position === "2nd Prize"
                        ? "#00e5ff"
                        : "#ffaa00",
                  }}
                >
                  {achievement.position}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed font-body">
                  {achievement.description}
                </p>

                {/* Bottom decoration */}
                <div className="mt-5 pt-3 border-t border-white/[0.04]">
                  <div className="flex items-center justify-between font-mono text-[9px] text-gray-600">
                    <span>STATUS: UNLOCKED</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-1 rounded-full bg-cyber-green/50" />
                      <span>VERIFIED</span>
                    </div>
                  </div>
                </div>

                {/* Corner brackets */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 group-hover:border-cyber-orange/30 transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 group-hover:border-cyber-orange/30 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
