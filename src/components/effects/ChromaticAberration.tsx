'use client';

import { type ReactNode, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────
interface ChromaticAberrationProps {
  children: ReactNode;
  /** Force the effect on (overrides hover) */
  active?: boolean;
  /** Pixel offset intensity 0–1 (default 0.5 → ~3px) */
  intensity?: number;
  className?: string;
  /** Trigger mode: 'hover' activates on mouseenter (default) */
  trigger?: 'hover' | 'always' | 'prop';
}

// ─── Component ────────────────────────────────────────────────────────
export default function ChromaticAberration({
  children,
  active,
  intensity = 0.5,
  className = '',
  trigger = 'hover',
}: ChromaticAberrationProps) {
  const [hovering, setHovering] = useState(false);
  const uid = useRef(
    `chroma-${Math.random().toString(36).slice(2, 8)}`,
  ).current;

  const isActive =
    trigger === 'always' ||
    (trigger === 'hover' && hovering) ||
    (trigger === 'prop' && active);

  const offset = Math.max(1, Math.round(intensity * 6)); // 1–6 px

  return (
    <>
      <style>{`
        [data-chroma-id="${uid}"] {
          position: relative;
          display: inline-block;
        }

        /* ── R & B offset layers ────────────────────────────────── */
        [data-chroma-id="${uid}"] .chroma-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          mix-blend-mode: screen;
        }

        [data-chroma-id="${uid}"] .chroma-r {
          color: #ff0040;
          filter: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><filter id="r"><feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"/></filter></svg>#r');
        }

        [data-chroma-id="${uid}"] .chroma-b {
          color: #0080ff;
          filter: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"><filter id="b"><feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"/></filter></svg>#b');
        }

        /* ── Active state ────────────────────────────────────────── */
        [data-chroma-id="${uid}"][data-active="true"] .chroma-r {
          opacity: 0.7;
          transform: translate(${offset}px, -${Math.round(offset * 0.5)}px);
        }

        [data-chroma-id="${uid}"][data-active="true"] .chroma-b {
          opacity: 0.7;
          transform: translate(-${offset}px, ${Math.round(offset * 0.5)}px);
        }

        /* Subtle jitter when active */
        [data-chroma-id="${uid}"][data-active="true"] .chroma-r {
          animation: chromaJitterR-${uid} 0.3s steps(2) infinite;
        }

        [data-chroma-id="${uid}"][data-active="true"] .chroma-b {
          animation: chromaJitterB-${uid} 0.3s steps(2) infinite;
        }

        @keyframes chromaJitterR-${uid} {
          0%   { transform: translate(${offset}px, -${Math.round(offset * 0.5)}px); }
          50%  { transform: translate(${offset + 1}px, -${Math.round(offset * 0.5) + 1}px); }
          100% { transform: translate(${offset}px, -${Math.round(offset * 0.5)}px); }
        }

        @keyframes chromaJitterB-${uid} {
          0%   { transform: translate(-${offset}px, ${Math.round(offset * 0.5)}px); }
          50%  { transform: translate(-${offset + 1}px, ${Math.round(offset * 0.5) + 1}px); }
          100% { transform: translate(-${offset}px, ${Math.round(offset * 0.5)}px); }
        }
      `}</style>

      <div
        data-chroma-id={uid}
        data-active={isActive}
        className={className}
        onMouseEnter={() => trigger === 'hover' && setHovering(true)}
        onMouseLeave={() => trigger === 'hover' && setHovering(false)}
      >
        {/* Red offset layer */}
        <div className="chroma-layer chroma-r" aria-hidden="true">
          {children}
        </div>

        {/* Blue offset layer */}
        <div className="chroma-layer chroma-b" aria-hidden="true">
          {children}
        </div>

        {/* Original content */}
        <div style={{ position: 'relative' }}>
          {children}
        </div>
      </div>
    </>
  );
}
