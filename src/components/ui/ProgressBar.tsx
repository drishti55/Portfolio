'use client';

import { motion } from 'motion/react';

interface ProgressBarProps {
  value: number;
  label?: string;
  color?: string;
  className?: string;
  animated?: boolean;
}

export default function ProgressBar({
  value,
  label,
  color = '#00ff41',
  className = '',
  animated = true,
}: ProgressBarProps) {
  const clampedValue = Math.max(0, Math.min(100, value));

  // Create segments for the cyberpunk look
  const totalSegments = 20;
  const filledSegments = Math.round((clampedValue / 100) * totalSegments);

  return (
    <div className={`w-full ${className}`}>
      {/* Label + percentage row */}
      {(label || true) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-white/50">
              {label}
            </span>
          )}
          <span
            className="text-xs font-mono font-bold tabular-nums"
            style={{ color }}
          >
            {clampedValue}%
          </span>
        </div>
      )}

      {/* Bar container */}
      <div className="relative h-3 bg-white/[0.03] border border-white/[0.06] rounded-sm overflow-hidden">
        {/* Segment grid overlay */}
        <div className="absolute inset-0 flex gap-px z-10 pointer-events-none">
          {Array.from({ length: totalSegments }).map((_, i) => (
            <div key={i} className="flex-1 border-r border-[#0a0a0a]/60 last:border-r-0" />
          ))}
        </div>

        {/* Animated fill bar */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-sm"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}66, 0 0 20px ${color}22`,
          }}
          initial={animated ? { width: '0%' } : { width: `${clampedValue}%` }}
          animate={{ width: `${clampedValue}%` }}
          transition={
            animated
              ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0 }
          }
        />

        {/* Shimmer highlight on the fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-sm opacity-30"
          style={{
            background: `linear-gradient(90deg, transparent 60%, ${color}44 80%, transparent 100%)`,
          }}
          initial={animated ? { width: '0%' } : { width: `${clampedValue}%` }}
          animate={{ width: `${clampedValue}%` }}
          transition={
            animated
              ? { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
              : { duration: 0 }
          }
        />

        {/* Scan-line overlay for texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
          }}
        />
      </div>
    </div>
  );
}
