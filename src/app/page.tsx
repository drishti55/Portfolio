"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import BootSequence from "@/components/boot/BootSequence";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Achievements from "@/components/sections/Achievements";
import GitHubStats from "@/components/sections/GitHubStats";
import Contact from "@/components/sections/Contact";

// Dynamic imports for heavy components (no SSR)
const Navbar = dynamic(() => import("@/components/ui/Navbar"), { ssr: false });
const SmoothScroll = dynamic(
  () => import("@/components/layout/SmoothScroll"),
  { ssr: false }
);
const MagneticCursor = dynamic(
  () => import("@/components/cursor/MagneticCursor"),
  { ssr: false }
);
const ScanlineOverlay = dynamic(
  () => import("@/components/effects/ScanlineOverlay"),
  { ssr: false }
);
const GridBackground = dynamic(
  () => import("@/components/effects/GridBackground"),
  { ssr: false }
);
const SceneWrapper = dynamic(
  () => import("@/components/scene/SceneWrapper"),
  { ssr: false }
);
const EasterEggs = dynamic(
  () => import("@/components/effects/EasterEggs"),
  { ssr: false }
);

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if boot was already completed this session
    if (typeof window !== "undefined") {
      const completed = sessionStorage.getItem("bootCompleted");
      if (completed === "true") {
        setBootComplete(true);
      }
    }
  }, []);

  const handleBootComplete = () => {
    setBootComplete(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("bootCompleted", "true");
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="font-mono text-cyber-green/30 text-xs animate-pulse">
          LOADING SYSTEMS...
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Boot Sequence */}
      {!bootComplete && <BootSequence onComplete={handleBootComplete} />}

      {/* Main Content */}
      {bootComplete && (
        <SmoothScroll>
          {/* Global overlays */}
          <MagneticCursor />
          <ScanlineOverlay />
          <Navbar />
          <SceneWrapper />
          <EasterEggs />

          {/* Sections */}
          <main className="relative z-10">
            <Hero isReady={bootComplete} />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Achievements />
            <GitHubStats />
            <Contact />
          </main>
        </SmoothScroll>
      )}
    </>
  );
}
