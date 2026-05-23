'use client';

import { useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────
interface GridBackgroundProps {
  className?: string;
  /** Primary grid colour (default neon green) */
  color?: string;
  /** Secondary accent colour (default cyan) */
  accentColor?: string;
  /** Grid cell size in px (default 60) */
  cellSize?: number;
}

// ─── Component ────────────────────────────────────────────────────────
export default function GridBackground({
  className = '',
  color = '#00ff41',
  accentColor = '#00e5ff',
  cellSize = 60,
}: GridBackgroundProps) {
  const uid = useRef(
    `grid-${Math.random().toString(36).slice(2, 8)}`,
  ).current;

  return (
    <>
      <style>{`
        [data-grid-id="${uid}"] {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }

        /* ── Perspective wrapper ────────────────────────────────── */
        [data-grid-id="${uid}"] .grid-perspective {
          position: absolute;
          inset: -50%;
          width: 200%;
          height: 200%;
          perspective: 600px;
          transform-style: preserve-3d;
        }

        /* ── Grid surface ───────────────────────────────────────── */
        [data-grid-id="${uid}"] .grid-surface {
          position: absolute;
          inset: 0;
          transform: rotateX(55deg) translateZ(0px);
          transform-origin: center center;
          background-image:
            /* Vertical lines */
            repeating-linear-gradient(
              90deg,
              ${color}12 0px,
              ${color}12 1px,
              transparent 1px,
              transparent ${cellSize}px
            ),
            /* Horizontal lines */
            repeating-linear-gradient(
              0deg,
              ${color}12 0px,
              ${color}12 1px,
              transparent 1px,
              transparent ${cellSize}px
            );
          animation: gridScroll-${uid} 20s linear infinite;
        }

        /* ── Accent lines (larger grid) ─────────────────────────── */
        [data-grid-id="${uid}"] .grid-accent {
          position: absolute;
          inset: 0;
          transform: rotateX(55deg) translateZ(1px);
          transform-origin: center center;
          background-image:
            repeating-linear-gradient(
              90deg,
              ${accentColor}18 0px,
              ${accentColor}18 1px,
              transparent 1px,
              transparent ${cellSize * 4}px
            ),
            repeating-linear-gradient(
              0deg,
              ${accentColor}18 0px,
              ${accentColor}18 1px,
              transparent 1px,
              transparent ${cellSize * 4}px
            );
          animation: gridScroll-${uid} 20s linear infinite,
                     gridPulse-${uid} 4s ease-in-out infinite;
        }

        /* ── Fade mask – hides top edge, fades into distance ──── */
        [data-grid-id="${uid}"] .grid-mask {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,1) 0%,
            transparent 30%,
            transparent 70%,
            rgba(0,0,0,1) 100%
          );
          z-index: 1;
        }

        /* ── Horizontal glow line ────────────────────────────────── */
        [data-grid-id="${uid}"] .grid-horizon {
          position: absolute;
          bottom: 40%;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            ${color}60 20%,
            ${accentColor}80 50%,
            ${color}60 80%,
            transparent 100%
          );
          box-shadow: 0 0 20px ${color}40, 0 0 60px ${color}20;
          z-index: 2;
        }

        @keyframes gridScroll-${uid} {
          from { background-position: 0 0; }
          to   { background-position: 0 ${cellSize}px; }
        }

        @keyframes gridPulse-${uid} {
          0%, 100% { opacity: 0.4; }
          50%      { opacity: 0.8; }
        }
      `}</style>

      <div data-grid-id={uid} className={className} aria-hidden="true">
        <div className="grid-perspective">
          <div className="grid-surface" />
          <div className="grid-accent" />
        </div>
        <div className="grid-mask" />
        <div className="grid-horizon" />
      </div>
    </>
  );
}
