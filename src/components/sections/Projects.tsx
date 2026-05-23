"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { projects } from "@/data/projects";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useGSAP(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const cards = gsap.utils.toArray<HTMLElement>(".project-card-wrapper");
    cards.forEach((card, i) => {
      // Parallax effect for each project card
      gsap.to(card, {
        y: -50 - (i * 20),
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });
  }, { scope: sectionRef });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-cyber-black overflow-hidden"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[800px] bg-cyber-purple/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="section-divider mb-20" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <div className="font-mono text-[10px] sm:text-xs text-cyber-green/50 tracking-[0.3em] mb-3">
            / 05 — PROJECT.DIMENSIONS
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-gray-100">
            PROJECTS
          </h2>
          <div className="h-px w-20 bg-cyber-red/50 mt-4" />
        </motion.div>

        {/* Projects grid */}
        <div className="space-y-32">
          {projects.map((project, i) => (
            <div key={project.id} className="project-card-wrapper perspective-1000">
              <ProjectCard
                project={project}
                index={i}
                isInView={isInView}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isInView,
}: {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.6 }}
      className="group relative"
    >
      <div
        className="relative rounded-sm overflow-hidden transition-all duration-700"
        style={{
          background: `linear-gradient(135deg, ${project.theme.secondary} 0%, #0a0a0a 40%, ${project.theme.secondary} 100%)`,
          border: `1px solid ${project.theme.primary}15`,
        }}
      >
        {/* Background effects */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          {/* Animated grid for this project */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(${project.theme.primary}08 1px, transparent 1px),
                linear-gradient(90deg, ${project.theme.primary}08 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />
          {/* Radial glow */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 80% 50%, ${project.theme.primary}08 0%, transparent 60%)`,
            }}
          />
        </div>

        <div className="relative z-10 p-6 sm:p-8 lg:p-10">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-10 items-start">
            {/* Left: Project identity */}
            <div className="lg:col-span-2">
              {/* Codename */}
              <div className="flex items-center gap-3 mb-3">
                <span
                  className="font-mono text-[10px] px-2 py-0.5 rounded-sm border"
                  style={{
                    borderColor: project.theme.primary + "30",
                    color: project.theme.primary,
                    backgroundColor: project.theme.primary + "08",
                  }}
                >
                  CODENAME: {project.codename}
                </span>
                <span className="font-mono text-[10px] text-gray-600">
                  PROJECT.{String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <h3
                className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold tracking-wider mb-4 transition-colors duration-300"
                style={{
                  color: "#e0e0e0",
                }}
              >
                <span className="group-hover:opacity-0 transition-opacity duration-300 absolute">
                  {project.title}
                </span>
                <span
                  className="opacity-100"
                  style={{
                    textShadow: `0 0 20px ${project.theme.primary}30`,
                  }}
                >
                  {project.title}
                </span>
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed mb-6 max-w-2xl font-body">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] px-2 py-1 rounded-sm border transition-colors duration-300"
                    style={{
                      borderColor: project.theme.primary + "15",
                      color: project.theme.primary + "70",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] sm:text-xs px-2.5 py-1 bg-white/5 text-gray-400 rounded-sm border border-white/5 group-hover:border-white/10 transition-colors duration-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Actions + visual */}
            <div className="flex flex-col items-start lg:items-end gap-4">
              {/* Project visual (themed) */}
              <div
                className="w-full h-32 sm:h-40 rounded-sm relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${project.theme.secondary} 0%, ${project.theme.primary}10 100%)`,
                  border: `1px solid ${project.theme.primary}10`,
                }}
              >
                {/* Decorative elements based on project theme */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="font-heading text-4xl sm:text-5xl font-black opacity-5 tracking-widest"
                    style={{ color: project.theme.primary }}
                  >
                    {project.codename}
                  </div>
                </div>
                {/* Floating data elements */}
                {[...Array(5)].map((_, j) => (
                  <div
                    key={j}
                    className="absolute rounded-full opacity-20"
                    style={{
                      width: 4 + j * 3 + "px",
                      height: 4 + j * 3 + "px",
                      backgroundColor: project.theme.primary,
                      left: `${15 + j * 18}%`,
                      top: `${20 + (j % 3) * 25}%`,
                      animation: `float ${3 + j}s ease-in-out infinite`,
                      animationDelay: `${j * 0.5}s`,
                      boxShadow: `0 0 10px ${project.theme.primary}50`,
                    }}
                  />
                ))}
                {/* Corner brackets */}
                <div
                  className="absolute top-2 left-2 w-3 h-3 border-t border-l"
                  style={{ borderColor: project.theme.primary + "30" }}
                />
                <div
                  className="absolute bottom-2 right-2 w-3 h-3 border-b border-r"
                  style={{ borderColor: project.theme.primary + "30" }}
                />
              </div>

              {/* GitHub link */}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-heading text-xs tracking-widest transition-all duration-300 px-4 py-2.5 rounded-sm border group/btn"
                style={{
                  borderColor: project.theme.primary + "30",
                  color: project.theme.primary + "80",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor =
                    project.theme.primary + "80";
                  e.currentTarget.style.color = project.theme.primary;
                  e.currentTarget.style.boxShadow = `0 0 15px ${project.theme.primary}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    project.theme.primary + "30";
                  e.currentTarget.style.color = project.theme.primary + "80";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                ACCESS REPOSITORY
              </a>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="h-px w-0 group-hover:w-full transition-all duration-700"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.theme.primary}50, transparent)`,
          }}
        />
      </div>
    </motion.div>
  );
}
