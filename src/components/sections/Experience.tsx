"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { experiences } from "@/data/experience";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
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
            / 03 — MISSION.LOG
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-gray-100">
            EXPERIENCE
          </h2>
          <div className="h-px w-20 bg-cyber-cyan/50 mt-4" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-8 lg:left-1/2 lg:-translate-x-px top-0 bottom-0 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="w-full h-full origin-top"
              style={{
                background:
                  "linear-gradient(180deg, #00ff41 0%, #00e5ff 50%, #bf00ff 100%)",
              }}
            />
          </div>

          {/* Experience entries */}
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.3, duration: 0.6 }}
              className="relative pl-12 sm:pl-20 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-12 mb-16 last:mb-0"
            >
              {/* Timeline node */}
              <div className="absolute left-2.5 sm:left-6.5 lg:left-1/2 lg:-translate-x-1/2 top-2 z-10">
                <div className="relative">
                  <div className="w-3 h-3 rounded-full bg-cyber-green" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full bg-cyber-green animate-ping opacity-30" />
                  <div
                    className="absolute -inset-2 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(0,255,65,0.2) 0%, transparent 70%)",
                    }}
                  />
                </div>
              </div>

              {/* Left side: Date + Status */}
              <div className="hidden lg:flex lg:flex-col lg:items-end lg:text-right lg:pr-8">
                <div className="font-heading text-sm tracking-widest text-cyber-cyan mb-2">
                  {exp.period}
                </div>
                <div className="font-mono text-[10px] flex items-center gap-2">
                  <span className="text-cyber-green/50">STATUS:</span>
                  <span className="text-cyber-green px-2 py-0.5 border border-cyber-green/30 rounded-sm">
                    {exp.status}
                  </span>
                </div>
              </div>

              {/* Right side (or full width on mobile): Content */}
              <div className="lg:pl-8">
                {/* Mobile date */}
                <div className="lg:hidden font-heading text-xs tracking-widest text-cyber-cyan mb-2">
                  {exp.period}
                </div>

                <div className="holo-card rounded-sm p-5 sm:p-6 relative overflow-hidden">
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyber-green/20" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyber-green/20" />

                  {/* Company */}
                  <h3 className="font-heading text-lg sm:text-xl tracking-wider text-gray-100 mb-1">
                    {exp.company}
                  </h3>
                  <div className="font-mono text-xs text-cyber-cyan/70 mb-4">
                    {exp.role}
                  </div>

                  {/* Mobile status */}
                  <div className="lg:hidden font-mono text-[10px] mb-4">
                    <span className="text-cyber-green/50">STATUS: </span>
                    <span className="text-cyber-green">{exp.status}</span>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2.5">
                    {exp.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.8 + i * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <span className="text-cyber-green/50 mt-1 text-xs">
                          //
                        </span>
                        <span className="text-sm text-gray-400 font-body">
                          {h}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Tech tags */}
                  <div className="mt-4 pt-3 border-t border-cyber-green/10 flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 border border-cyber-cyan/20 text-cyber-cyan/60 rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
