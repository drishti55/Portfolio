'use client';

import { motion } from 'motion/react';

interface BadgeProps {
  text: string;
  color?: string;
  className?: string;
}

export default function Badge({ text, color = '#00ff41', className = '' }: BadgeProps) {
  return (
    <>
      <style>{`
        @keyframes badge-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
      <motion.span
        className={`
          group relative inline-flex items-center
          px-3 py-1 rounded-full
          text-xs font-mono uppercase tracking-wider
          border cursor-default overflow-hidden
          ${className}
        `}
        style={{
          color,
          borderColor: `${color}44`,
          backgroundColor: `${color}08`,
          boxShadow: `0 0 6px ${color}22`,
        }}
        whileHover={{
          boxShadow: `0 0 14px ${color}55, 0 0 28px ${color}20`,
          borderColor: `${color}88`,
          scale: 1.05,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      >
        {/* Holographic shimmer overlay */}
        <span
          className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(
              120deg,
              transparent 25%,
              ${color}18 38%,
              ${color}28 42%,
              transparent 55%
            )`,
            backgroundSize: '200% 100%',
            animation: 'badge-shimmer 1.5s ease-in-out infinite',
          }}
        />

        {/* Dot indicator */}
        <span
          className="relative mr-1.5 inline-block h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 4px ${color}` }}
        />

        {/* Label */}
        <span className="relative z-10">{text}</span>
      </motion.span>
    </>
  );
}
