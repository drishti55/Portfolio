'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────
interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  enableHover?: boolean;
  glitchInterval?: [number, number]; // [min, max] seconds between random glitches
  glitchIntensity?: number; // 0–1, controls chromatic offset & scramble speed
  glitchColors?: { r?: string; g?: string; b?: string };
}

// Characters used for the scramble effect
const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`01アイウエオカキクケコ';

function randomChar() {
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

// ─── Component ────────────────────────────────────────────────────────
export default function GlitchText({
  text,
  className = '',
  as: Tag = 'span',
  enableHover = true,
  glitchInterval = [3, 8],
  glitchIntensity = 0.5,
  glitchColors,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);
  const scrambleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const periodicRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);

  const rColor = glitchColors?.r ?? '#ff0040';
  const gColor = glitchColors?.g ?? '#00ff41';
  const bColor = glitchColors?.b ?? '#0080ff';

  // Chromatic offset in px, scaled by intensity (1–4 px range)
  const offset = Math.max(1, Math.round(glitchIntensity * 4));

  // ── Character scramble ────────────────────────────────────────────
  const scramble = useCallback(
    (onComplete?: () => void) => {
      const original = text;
      const length = original.length;
      let iteration = 0;
      const speed = Math.max(30, 80 - glitchIntensity * 50); // ms per tick

      const tick = () => {
        setDisplayText(
          original
            .split('')
            .map((char, idx) => (idx < iteration ? char : randomChar()))
            .join(''),
        );
        iteration += 1;
        if (iteration <= length) {
          scrambleRef.current = setTimeout(tick, speed);
        } else {
          setDisplayText(original);
          onComplete?.();
        }
      };

      tick();
    },
    [text, glitchIntensity],
  );

  // ── Periodic random glitch ────────────────────────────────────────
  useEffect(() => {
    const scheduleNext = () => {
      const [min, max] = glitchInterval;
      const delay = (min + Math.random() * (max - min)) * 1000;
      periodicRef.current = setTimeout(() => {
        setIsGlitching(true);
        scramble(() => {
          setIsGlitching(false);
          scheduleNext();
        });
      }, delay);
    };

    scheduleNext();

    return () => {
      if (periodicRef.current) clearTimeout(periodicRef.current);
      if (scrambleRef.current) clearTimeout(scrambleRef.current);
    };
  }, [glitchInterval, scramble]);

  // ── Hover handler ─────────────────────────────────────────────────
  const handleMouseEnter = () => {
    if (!enableHover) return;
    if (scrambleRef.current) clearTimeout(scrambleRef.current);
    setIsGlitching(true);
    scramble(() => setIsGlitching(false));
  };

  // Unique id for scoped styles
  const uid = useRef(
    `glitch-${Math.random().toString(36).slice(2, 8)}`,
  ).current;

  return (
    <>
      <style>{`
        [data-glitch-id="${uid}"] {
          position: relative;
          display: inline-block;
        }

        /* ── Chromatic aberration layers ────────────────────────── */
        [data-glitch-id="${uid}"]::before,
        [data-glitch-id="${uid}"]::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        [data-glitch-id="${uid}"]::before {
          color: ${rColor};
          z-index: -1;
        }

        [data-glitch-id="${uid}"]::after {
          color: ${bColor};
          z-index: -1;
        }

        /* Show layers when glitching */
        [data-glitch-id="${uid}"][data-glitching="true"]::before,
        [data-glitch-id="${uid}"][data-glitching="true"]::after {
          opacity: 0.7;
        }

        [data-glitch-id="${uid}"][data-glitching="true"]::before {
          animation: glitchShiftR-${uid} 0.3s steps(2) infinite;
        }

        [data-glitch-id="${uid}"][data-glitching="true"]::after {
          animation: glitchShiftB-${uid} 0.3s steps(2) infinite reverse;
        }

        /* ── Glitch slice via clip-path ────────────────────────── */
        [data-glitch-id="${uid}"][data-glitching="true"] {
          animation: glitchSlice-${uid} 0.4s steps(3) infinite;
        }

        @keyframes glitchShiftR-${uid} {
          0%   { transform: translate(${offset}px, -${offset}px); clip-path: inset(20% 0 40% 0); }
          25%  { transform: translate(-${offset}px, ${offset}px); clip-path: inset(60% 0 10% 0); }
          50%  { transform: translate(${offset}px, 0); clip-path: inset(30% 0 30% 0); }
          75%  { transform: translate(-${offset}px, -${offset}px); clip-path: inset(10% 0 60% 0); }
          100% { transform: translate(${offset}px, ${offset}px); clip-path: inset(50% 0 20% 0); }
        }

        @keyframes glitchShiftB-${uid} {
          0%   { transform: translate(-${offset}px, ${offset}px); clip-path: inset(50% 0 10% 0); }
          25%  { transform: translate(${offset}px, -${offset}px); clip-path: inset(10% 0 50% 0); }
          50%  { transform: translate(-${offset}px, 0); clip-path: inset(40% 0 20% 0); }
          75%  { transform: translate(${offset}px, ${offset}px); clip-path: inset(20% 0 40% 0); }
          100% { transform: translate(-${offset}px, -${offset}px); clip-path: inset(30% 0 30% 0); }
        }

        @keyframes glitchSlice-${uid} {
          0%   { clip-path: inset(0 0 0 0); transform: translate(0); }
          20%  { clip-path: inset(15% -2px 60% 0); transform: translate(${offset}px, 0); }
          40%  { clip-path: inset(50% -2px 20% 0); transform: translate(-${offset}px, 0); }
          60%  { clip-path: inset(30% -2px 40% 0); transform: translate(${offset * 0.5}px, 0); }
          100% { clip-path: inset(0 0 0 0); transform: translate(0); }
        }
      `}</style>

// In the component:
      {React.createElement(
        Tag as unknown as string,
        {
          ref: elementRef,
          'data-glitch-id': uid,
          'data-text': displayText,
          'data-glitching': isGlitching,
          className,
          onMouseEnter: handleMouseEnter,
          style: { willChange: isGlitching ? 'transform' : 'auto' },
        },
        displayText
      )}
    </>
  );
}
