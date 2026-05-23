'use client';

import { motion } from 'motion/react';
import { useState, useCallback, useRef, useEffect } from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

function useGlitchText(originalText: string) {
  const [displayText, setDisplayText] = useState(originalText);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setDisplayText(originalText);
  }, [originalText]);

  const triggerGlitch = useCallback(() => {
    if (typeof originalText !== 'string') return;

    let iterations = 0;
    const maxIterations = 6;

    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, idx) => {
            if (idx < iterations) return originalText[idx];
            if (char === ' ') return ' ';
            return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          })
          .join('')
      );

      iterations += 1;
      if (iterations > maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(originalText);
      }
    }, 40);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [originalText]);

  return { displayText, triggerGlitch };
}

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-1.5 text-xs tracking-widest',
  md: 'px-6 py-2.5 text-sm tracking-widest',
  lg: 'px-8 py-3.5 text-base tracking-widest',
};

const variantStyles: Record<string, {
  border: string;
  bg: string;
  text: string;
  shadow: string;
  hoverShadow: string;
}> = {
  primary: {
    border: 'border-[#00ff41]',
    bg: 'bg-[#00ff41]/5',
    text: 'text-[#00ff41]',
    shadow: '0 0 8px rgba(0,255,65,0.3)',
    hoverShadow: '0 0 20px rgba(0,255,65,0.6), 0 0 40px rgba(0,255,65,0.2)',
  },
  secondary: {
    border: 'border-[#00e5ff]',
    bg: 'bg-[#00e5ff]/5',
    text: 'text-[#00e5ff]',
    shadow: '0 0 8px rgba(0,229,255,0.3)',
    hoverShadow: '0 0 20px rgba(0,229,255,0.6), 0 0 40px rgba(0,229,255,0.2)',
  },
  ghost: {
    border: 'border-white/10',
    bg: 'bg-transparent',
    text: 'text-white/70',
    shadow: 'none',
    hoverShadow: '0 0 12px rgba(255,255,255,0.1)',
  },
};

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  href,
  onClick,
  disabled = false,
}: ButtonProps) {
  const childText = typeof children === 'string' ? children : '';
  const { displayText, triggerGlitch } = useGlitchText(childText);

  const style = variantStyles[variant];

  const clipPath = 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))';

  const baseClassName = [
    'relative inline-flex items-center justify-center',
    'border font-mono uppercase font-semibold',
    'transition-colors duration-200',
    'cursor-pointer select-none',
    style.border,
    style.bg,
    style.text,
    sizeClasses[size],
    disabled ? 'opacity-40 pointer-events-none' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const motionProps: any = {
    className: baseClassName,
    style: {
      clipPath,
      boxShadow: style.shadow,
    },
    whileHover: disabled
      ? undefined
      : {
          skewX: -1,
          boxShadow: style.hoverShadow,
          scale: 1.02,
        },
    whileTap: disabled
      ? undefined
      : {
          scale: 0.97,
          skewX: -2,
        },
    transition: { type: 'spring', stiffness: 400, damping: 25 },
    onHoverStart: () => {
      if (!disabled) triggerGlitch();
    },
  };

  const content = (
    <>
      {/* Corner accent marks */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l opacity-60" style={{ borderColor: 'inherit' }} />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r opacity-60" style={{ borderColor: 'inherit' }} />

      {/* Text content */}
      <span className="relative z-10">
        {childText ? displayText : children}
      </span>

      {/* Scan-line overlay */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px)',
        }}
      />
    </>
  );

  if (href) {
    return (
      <motion.a href={href} {...motionProps}>
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} disabled={disabled} {...motionProps}>
      {content}
    </motion.button>
  );
}
