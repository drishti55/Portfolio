"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <section
      id="skills"
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
            / 04 — NEURAL.MODULES
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-gray-100">
            SKILLS
          </h2>
          <div className="h-px w-20 bg-cyber-purple/50 mt-4" />
        </motion.div>

        {/* Neural map grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: 0.2 + catIdx * 0.1,
                duration: 0.5,
                ease: "easeOut",
              }}
              onMouseEnter={() => setActiveCategory(category.id)}
              onMouseLeave={() => setActiveCategory(null)}
              className="group relative"
            >
              <div
                className="relative rounded-sm p-5 transition-all duration-500 cursor-default overflow-hidden"
                style={{
                  background:
                    activeCategory === category.id
                      ? `linear-gradient(135deg, ${category.color}08 0%, ${category.color}03 100%)`
                      : "rgba(255,255,255,0.02)",
                  border: `1px solid ${
                    activeCategory === category.id
                      ? category.color + "40"
                      : "rgba(255,255,255,0.05)"
                  }`,
                  boxShadow:
                    activeCategory === category.id
                      ? `0 0 20px ${category.color}15, inset 0 0 20px ${category.color}05`
                      : "none",
                }}
              >
                {/* Corner decorations */}
                <div
                  className="absolute top-0 left-0 w-4 h-4 border-t border-l transition-colors duration-300"
                  style={{
                    borderColor:
                      activeCategory === category.id
                        ? category.color + "60"
                        : "rgba(255,255,255,0.08)",
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 border-b border-r transition-colors duration-300"
                  style={{
                    borderColor:
                      activeCategory === category.id
                        ? category.color + "60"
                        : "rgba(255,255,255,0.08)",
                  }}
                />

                {/* Module header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-mono text-xs font-bold"
                      style={{ color: category.color }}
                    >
                      [{category.icon}]
                    </span>
                    <h3
                      className="font-heading text-xs tracking-[0.15em] transition-colors duration-300"
                      style={{
                        color:
                          activeCategory === category.id
                            ? category.color
                            : "#888",
                      }}
                    >
                      {category.title.toUpperCase()}
                    </h3>
                  </div>
                  <div
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: category.color,
                      boxShadow:
                        activeCategory === category.id
                          ? `0 0 8px ${category.color}`
                          : "none",
                      opacity: activeCategory === category.id ? 1 : 0.3,
                    }}
                  />
                </div>

                {/* Skills list */}
                <div className="space-y-2.5">
                  {category.skills.map((skill, skillIdx) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-[10px] sm:text-xs text-gray-400 tracking-wide">
                          {skill.name}
                        </span>
                        <span
                          className="font-mono text-[10px] transition-colors duration-300"
                          style={{
                            color:
                              activeCategory === category.id
                                ? category.color + "90"
                                : "rgba(255,255,255,0.2)",
                          }}
                        >
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={
                            isInView ? { width: `${skill.level}%` } : {}
                          }
                          transition={{
                            delay: 0.4 + catIdx * 0.1 + skillIdx * 0.05,
                            duration: 0.8,
                            ease: "easeOut",
                          }}
                          className="h-full rounded-full"
                          style={{
                            backgroundColor: category.color,
                            boxShadow: `0 0 6px ${category.color}50`,
                            opacity:
                              activeCategory === category.id ? 1 : 0.6,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Module status */}
                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between font-mono text-[9px] text-gray-600">
                    <span>MODULE.{category.id.toUpperCase()}</span>
                    <span
                      className="transition-colors duration-300"
                      style={{
                        color:
                          activeCategory === category.id
                            ? category.color + "60"
                            : "transparent",
                      }}
                    >
                      LOADED
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Connection lines visualization (decorative) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5 }}
          className="mt-12 text-center"
        >
          <div className="font-mono text-[10px] text-cyber-green/20 tracking-widest">
            {skillCategories.length} MODULES ACTIVE — NEURAL NETWORK
            SYNCHRONIZED
          </div>
        </motion.div>
      </div>
    </section>
  );
}
