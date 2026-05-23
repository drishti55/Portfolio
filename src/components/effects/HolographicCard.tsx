'use client';

import {
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react';

// ─── Types ────────────────────────────────────────────────────────────
interface HolographicCardProps {
  children: ReactNode;
  className?: string;
  /** Glow / accent colour (default neon green) */
  glowColor?: string;
  /** Max tilt angle in degrees (default 12) */
  maxTilt?: number;
}

// ─── Component ────────────────────────────────────────────────────────
export default function HolographicCard({
  children,
  className = '',
  glowColor = '#00ff41',
  maxTilt = 12,
}: HolographicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  const uid = useRef(
    `holo-${Math.random().toString(36).slice(2, 8)}`,
  ).current;

  // ── Mouse move handler ────────────────────────────────────────────
  const handleMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width; // 0–1
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (y - 0.5) * -maxTilt; // rotate around X
      const tiltY = (x - 0.5) * maxTilt; // rotate around Y

      setStyle({
        transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
      });

      setSheenPos({ x: x * 100, y: y * 100 });
    },
    [maxTilt],
  );

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)',
    });
    setSheenPos({ x: 50, y: 50 });
  };

  return (
    <>
      <style>{`
        /* ── Card base ──────────────────────────────────────────── */
        [data-holo-id="${uid}"] {
          position: relative;
          border-radius: 12px;
          transition: transform 0.15s ease-out;
          transform-style: preserve-3d;
        }

        /* ── Glassmorphism inner ────────────────────────────────── */
        [data-holo-id="${uid}"] .holo-glass {
          position: relative;
          z-index: 2;
          background: rgba(10, 10, 15, 0.65);
          backdrop-filter: blur(16px) saturate(1.4);
          -webkit-backdrop-filter: blur(16px) saturate(1.4);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.06);
          overflow: hidden;
        }

        /* ── Holographic sheen ──────────────────────────────────── */
        [data-holo-id="${uid}"] .holo-sheen {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
          z-index: 3;
          mix-blend-mode: overlay;
        }

        [data-holo-id="${uid}"]:hover .holo-sheen {
          opacity: 0.45;
        }

        /* ── Animated glowing border ───────────────────────────── */
        [data-holo-id="${uid}"] .holo-border {
          position: absolute;
          inset: -1px;
          border-radius: 13px;
          z-index: 1;
          opacity: 0.5;
          transition: opacity 0.3s ease;
          background: conic-gradient(
            from var(--border-angle, 0deg),
            ${glowColor}00 0%,
            ${glowColor} 12.5%,
            #0080ff 25%,
            ${glowColor}00 37.5%,
            ${glowColor}00 50%,
            ${glowColor} 62.5%,
            #0080ff 75%,
            ${glowColor}00 87.5%
          );
          animation: rotateBorder-${uid} 4s linear infinite;
        }

        [data-holo-id="${uid}"]:hover .holo-border {
          opacity: 1;
        }

        /* Inner mask to make border only 1-2px visible */
        [data-holo-id="${uid}"] .holo-border-mask {
          position: absolute;
          inset: 1.5px;
          border-radius: 11px;
          background: rgba(10, 10, 15, 1);
          z-index: 1;
        }

        @property --border-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes rotateBorder-${uid} {
          to { --border-angle: 360deg; }
        }

        /* ── Corner brackets ───────────────────────────────────── */
        [data-holo-id="${uid}"] .holo-corner {
          position: absolute;
          width: 16px;
          height: 16px;
          z-index: 4;
          pointer-events: none;
        }

        [data-holo-id="${uid}"] .holo-corner::before,
        [data-holo-id="${uid}"] .holo-corner::after {
          content: '';
          position: absolute;
          background: ${glowColor};
          opacity: 0.6;
          transition: opacity 0.3s ease;
        }

        [data-holo-id="${uid}"]:hover .holo-corner::before,
        [data-holo-id="${uid}"]:hover .holo-corner::after {
          opacity: 1;
        }

        /* Horizontal bar */
        [data-holo-id="${uid}"] .holo-corner::before {
          width: 16px;
          height: 1.5px;
        }

        /* Vertical bar */
        [data-holo-id="${uid}"] .holo-corner::after {
          width: 1.5px;
          height: 16px;
        }

        [data-holo-id="${uid}"] .corner-tl { top: 6px; left: 6px; }
        [data-holo-id="${uid}"] .corner-tl::before { top: 0; left: 0; }
        [data-holo-id="${uid}"] .corner-tl::after  { top: 0; left: 0; }

        [data-holo-id="${uid}"] .corner-tr { top: 6px; right: 6px; }
        [data-holo-id="${uid}"] .corner-tr::before { top: 0; right: 0; }
        [data-holo-id="${uid}"] .corner-tr::after  { top: 0; right: 0; }

        [data-holo-id="${uid}"] .corner-bl { bottom: 6px; left: 6px; }
        [data-holo-id="${uid}"] .corner-bl::before { bottom: 0; left: 0; }
        [data-holo-id="${uid}"] .corner-bl::after  { bottom: 0; left: 0; }

        [data-holo-id="${uid}"] .corner-br { bottom: 6px; right: 6px; }
        [data-holo-id="${uid}"] .corner-br::before { bottom: 0; right: 0; }
        [data-holo-id="${uid}"] .corner-br::after  { bottom: 0; right: 0; }

        /* ── Card scanlines ─────────────────────────────────────── */
        [data-holo-id="${uid}"] .holo-scanlines {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(0,0,0,0.15) 2px,
            rgba(0,0,0,0.15) 3px
          );
          opacity: 0.08;
          pointer-events: none;
          z-index: 4;
        }
      `}</style>

      <div
        ref={cardRef}
        data-holo-id={uid}
        className={className}
        style={style}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated border */}
        <div className="holo-border" />
        <div className="holo-border-mask" />

        {/* Glass panel */}
        <div className="holo-glass">
          {/* Holographic sheen */}
          <div
            className="holo-sheen"
            style={{
              background: `radial-gradient(circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(255,100,200,0.25) 0%, rgba(100,200,255,0.2) 30%, rgba(100,255,150,0.15) 60%, transparent 80%)`,
            }}
          />

          {/* Scanlines */}
          <div className="holo-scanlines" />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 5 }}>
            {children}
          </div>
        </div>

        {/* Corner brackets */}
        <div className="holo-corner corner-tl" />
        <div className="holo-corner corner-tr" />
        <div className="holo-corner corner-bl" />
        <div className="holo-corner corner-br" />
      </div>
    </>
  );
}
