'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface HUDFrameProps {
  children: ReactNode;
  label?: string;
  status?: string;
  statusColor?: string;
  className?: string;
}

function Corner({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const baseSize = 'w-4 h-4';

  const positionClasses: Record<string, string> = {
    tl: 'top-0 left-0 border-t border-l',
    tr: 'top-0 right-0 border-t border-r',
    bl: 'bottom-0 left-0 border-b border-l',
    br: 'bottom-0 right-0 border-b border-r',
  };

  const delays: Record<string, number> = {
    tl: 0,
    tr: 0.1,
    bl: 0.15,
    br: 0.25,
  };

  return (
    <motion.span
      className={`absolute ${positionClasses[position]} ${baseSize} border-[#00ff41]/60 pointer-events-none`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: delays[position],
        ease: [0.16, 1, 0.3, 1],
      }}
    />
  );
}

export default function HUDFrame({
  children,
  label,
  status,
  statusColor = '#00ff41',
  className = '',
}: HUDFrameProps) {
  return (
    <motion.div
      className={`relative p-4 ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Border lines (subtle connecting lines between corners) */}
      <motion.div
        className="absolute inset-0 border border-white/[0.06] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />

      {/* Corners */}
      <Corner position="tl" />
      <Corner position="tr" />
      <Corner position="bl" />
      <Corner position="br" />

      {/* Label (top-left) */}
      {label && (
        <motion.span
          className="absolute -top-2.5 left-4 px-2 bg-[#0a0a0a] text-[10px] font-mono uppercase tracking-[0.2em] text-[#00ff41]/60"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          {label}
        </motion.span>
      )}

      {/* Status indicator (top-right) */}
      {status && (
        <motion.span
          className="absolute -top-2.5 right-4 px-2 bg-[#0a0a0a] flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider"
          style={{ color: statusColor }}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <style>{`
            @keyframes hud-status-pulse {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.3; }
            }
          `}</style>
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: statusColor,
              boxShadow: `0 0 6px ${statusColor}`,
              animation: 'hud-status-pulse 2s ease-in-out infinite',
            }}
          />
          {status}
        </motion.span>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
