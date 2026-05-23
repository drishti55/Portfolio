"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { SITE } from "@/lib/constants";

const CONTACT_LINKS = [
  {
    label: "GITHUB",
    sublabel: "Source Control",
    url: SITE.github,
    icon: "GH",
    color: "#00ff41",
  },
  {
    label: "LINKEDIN",
    sublabel: "Professional Network",
    url: SITE.linkedin,
    icon: "LI",
    color: "#00e5ff",
  },
  {
    label: "EMAIL",
    sublabel: "Direct Channel",
    url: `mailto:${SITE.email}`,
    icon: "@",
    color: "#bf00ff",
  },
  {
    label: "RESUME",
    sublabel: "Download Dossier",
    url: SITE.resume,
    icon: "CV",
    color: "#ffaa00",
    download: true,
  },
  {
    label: "PHONE",
    sublabel: "Voice Channel",
    url: "tel:+919811267339",
    icon: "TEL",
    color: "#ff0040",
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 bg-cyber-black overflow-hidden"
    >
      <div className="section-divider mb-20" />

      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="font-mono text-[10px] sm:text-xs text-cyber-green/50 tracking-[0.3em] mb-3">
            / 08 — TRANSMISSION.CHANNEL
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-gray-100 mb-4">
            ESTABLISH
          </h2>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wider text-cyber-green">
            SECURE CONNECTION
          </h2>
          <div className="h-px w-20 bg-cyber-green/50 mt-6 mx-auto" />
        </motion.div>

        {/* Signal strength visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-1 mb-12"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.03 }}
              className="w-1 rounded-full origin-bottom"
              style={{
                height: `${8 + Math.sin(i * 0.5) * 12 + Math.random() * 8}px`,
                backgroundColor: `rgba(0, 255, 65, ${0.2 + (i / 20) * 0.5})`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
          <span className="font-mono text-[9px] text-cyber-green/40 ml-3">
            SIGNAL: STRONG
          </span>
        </motion.div>

        {/* Contact links */}
        <div className="space-y-3">
          {CONTACT_LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("http") ? "_blank" : undefined}
              rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
              download={link.download ? true : undefined}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
              className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-sm border transition-all duration-500 cursor-pointer"
              style={{
                borderColor:
                  hoveredLink === link.label
                    ? link.color + "40"
                    : "rgba(255,255,255,0.05)",
                background:
                  hoveredLink === link.label
                    ? `linear-gradient(135deg, ${link.color}06 0%, transparent 100%)`
                    : "transparent",
                boxShadow:
                  hoveredLink === link.label
                    ? `0 0 20px ${link.color}10`
                    : "none",
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-sm border font-heading text-xs sm:text-sm font-bold transition-all duration-300"
                style={{
                  borderColor:
                    hoveredLink === link.label
                      ? link.color + "50"
                      : "rgba(255,255,255,0.08)",
                  color:
                    hoveredLink === link.label ? link.color : "rgba(255,255,255,0.3)",
                  background:
                    hoveredLink === link.label ? link.color + "08" : "transparent",
                }}
              >
                {link.icon}
              </div>

              {/* Label */}
              <div className="flex-1">
                <div
                  className="font-heading text-sm sm:text-base tracking-wider transition-colors duration-300"
                  style={{
                    color:
                      hoveredLink === link.label ? link.color : "#e0e0e0",
                  }}
                >
                  {link.label}
                </div>
                <div className="font-mono text-[10px] text-gray-500">
                  {link.sublabel}
                </div>
              </div>

              {/* Arrow / Transmission indicator */}
              <div className="flex items-center gap-2">
                {hoveredLink === link.label && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    className="font-mono text-[9px] tracking-wider"
                    style={{ color: link.color + "60" }}
                  >
                    CONNECTING...
                  </motion.div>
                )}
                <svg
                  className="w-4 h-4 transition-all duration-300"
                  style={{
                    color:
                      hoveredLink === link.label
                        ? link.color
                        : "rgba(255,255,255,0.15)",
                    transform:
                      hoveredLink === link.label
                        ? "translateX(4px)"
                        : "translateX(0)",
                  }}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Email direct */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.0 }}
          className="mt-12 text-center"
        >
          <div className="font-mono text-[10px] text-gray-600 mb-2">
            DIRECT TRANSMISSION
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <a
              href={`mailto:${SITE.email}`}
              className="font-mono text-sm text-cyber-green/60 hover:text-cyber-green transition-colors duration-300"
            >
              {SITE.email}
            </a>
            <span className="hidden sm:inline text-cyber-green/20">|</span>
            <a
              href="tel:+919811267339"
              className="font-mono text-sm text-cyber-green/60 hover:text-cyber-green transition-colors duration-300"
            >
              +91 9811267339
            </a>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="mt-24 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-cyber-green/30" />
              <span>DRISHTI.EXE v1.0 — ALL SYSTEMS OPERATIONAL</span>
            </div>
            <div className="flex items-center gap-4">
              <span>SECURE CONNECTION ESTABLISHED</span>
              <span className="text-cyber-green/30">
                {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
