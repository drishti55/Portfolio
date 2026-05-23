'use client';

import { useRef } from 'react';

// ─── Types ────────────────────────────────────────────────────────────
interface ScanlineOverlayProps {
  /** Opacity of the scanlines – keep very low (default 0.04) */
  opacity?: number;
  /** Opacity of the vignette darkening (default 0.5) */
  vignetteOpacity?: number;
  /** Scanline gap in pixels (default 3) */
  lineGap?: number;
}

// ─── Component ────────────────────────────────────────────────────────
export default function ScanlineOverlay({
  opacity = 0.04,
  vignetteOpacity = 0.5,
  lineGap = 3,
}: ScanlineOverlayProps) {
  const uid = useRef(
    `scanline-${Math.random().toString(36).slice(2, 8)}`,
  ).current;

  return (
    <>
      <style>{`
        [data-scanline-id="${uid}"] {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          overflow: hidden;
        }

        /* ── Scanlines ─────────────────────────────────────────── */
        [data-scanline-id="${uid}"] .scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent ${lineGap - 1}px,
            rgba(0, 0, 0, 0.3) ${lineGap - 1}px,
            rgba(0, 0, 0, 0.3) ${lineGap}px
          );
          opacity: ${opacity};
          animation: crtFlicker-${uid} 8s steps(4) infinite;
        }

        /* ── CRT flicker ───────────────────────────────────────── */
        @keyframes crtFlicker-${uid} {
          0%   { opacity: ${opacity}; }
          5%   { opacity: ${opacity * 1.3}; }
          10%  { opacity: ${opacity}; }
          15%  { opacity: ${opacity * 0.8}; }
          20%  { opacity: ${opacity}; }
          50%  { opacity: ${opacity * 1.1}; }
          52%  { opacity: ${opacity * 1.4}; }
          53%  { opacity: ${opacity}; }
          100% { opacity: ${opacity}; }
        }

        /* ── Vignette ──────────────────────────────────────────── */
        [data-scanline-id="${uid}"] .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at center,
            transparent 50%,
            rgba(0, 0, 0, ${vignetteOpacity}) 100%
          );
        }
      `}</style>

      <div data-scanline-id={uid} aria-hidden="true">
        <div className="scanlines" />
        <div className="vignette" />
      </div>
    </>
  );
}
