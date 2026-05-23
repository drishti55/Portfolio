'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { BOOT_MESSAGES } from '@/lib/constants'

interface BootSequenceProps {
  onComplete: () => void
}

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [typedChars, setTypedChars] = useState<number>(0)
  const [isGlitching, setIsGlitching] = useState(false)
  const [isPoweringDown, setIsPoweringDown] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const hasStarted = useRef(false)

  const handleComplete = useCallback(() => {
    try {
      sessionStorage.setItem('bootCompleted', 'true')
    } catch {}
    onComplete()
  }, [onComplete])

  // Check sessionStorage on mount
  useEffect(() => {
    try {
      if (sessionStorage.getItem('bootCompleted') === 'true') {
        handleComplete()
        return
      }
    } catch {}
  }, [handleComplete])

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  // Typewriter engine
  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true

    const totalMessages = BOOT_MESSAGES.length
    let currentLine = 0
    let currentChar = 0

    const typeNextChar = () => {
      if (currentLine >= totalMessages) {
        // All messages typed — trigger glitch then power down
        setTimeout(() => {
          setIsGlitching(true)
          setTimeout(() => {
            setIsGlitching(false)
            setIsPoweringDown(true)
            setTimeout(() => {
              setIsVisible(false)
              setTimeout(handleComplete, 200)
            }, 800)
          }, 1200)
        }, 400)
        return
      }

      const msg = BOOT_MESSAGES[currentLine]
      const text = msg.text
      const isWarning = currentLine === totalMessages - 1

      if (currentChar < text.length) {
        currentChar++
        setTypedChars(currentChar)
        // Faster typing for regular, slightly slower for warning
        const speed = isWarning ? 35 : 18
        setTimeout(typeNextChar, speed)
      } else {
        // Line complete — pause then move to next
        currentLine++
        currentChar = 0
        setVisibleLines(currentLine)
        setTypedChars(0)
        const pause = currentLine === totalMessages ? 0 : (currentLine >= 9 ? 150 : 250)
        setTimeout(typeNextChar, pause)
      }
    }

    // Initial delay: show black screen with cursor, then start
    setTimeout(typeNextChar, 800)
  }, [handleComplete])

  const progress = ((visibleLines + (BOOT_MESSAGES[visibleLines]
    ? typedChars / BOOT_MESSAGES[visibleLines].text.length
    : 0)) / BOOT_MESSAGES.length) * 100

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden"
        style={{
          background: '#000000',
          fontFamily: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
        }}
        animate={
          isPoweringDown
            ? {
                scaleY: [1, 0.005],
                scaleX: [1, 0.8],
                opacity: [1, 1, 0],
              }
            : isGlitching
              ? {}
              : {}
        }
        transition={
          isPoweringDown
            ? { duration: 0.8, ease: [0.4, 0, 1, 1] }
            : {}
        }
      >
        {/* CRT Scanlines overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(0,255,65,0.03) 0px, rgba(0,255,65,0.03) 1px, transparent 1px, transparent 3px)',
          }}
        />

        {/* CRT vignette / curvature feel */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)',
          }}
        />

        {/* Glitch overlay layers */}
        {isGlitching && (
          <>
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              animate={{
                x: [0, -8, 12, -4, 6, -10, 3, 0],
                opacity: [0.8, 1, 0.6, 1, 0.7, 1, 0.9, 0.8],
              }}
              transition={{ duration: 0.3, repeat: 4, ease: 'linear' }}
              style={{
                background: 'rgba(255, 0, 64, 0.15)',
                mixBlendMode: 'screen',
              }}
            />
            <motion.div
              className="pointer-events-none absolute inset-0 z-30"
              animate={{
                x: [0, 10, -15, 8, -3, 12, -6, 0],
                y: [0, 3, -2, 5, -4, 1, -3, 0],
                scaleX: [1, 1.02, 0.98, 1.03, 0.97, 1.01, 1, 1],
              }}
              transition={{ duration: 0.15, repeat: 8, ease: 'linear' }}
              style={{
                background: 'rgba(0, 255, 65, 0.1)',
                mixBlendMode: 'screen',
              }}
            />
            {/* Chromatic aberration bars */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="pointer-events-none absolute z-30"
                style={{
                  left: 0,
                  right: 0,
                  height: `${Math.random() * 8 + 2}%`,
                  top: `${Math.random() * 100}%`,
                  background: i % 2 === 0
                    ? 'rgba(255, 0, 64, 0.3)'
                    : 'rgba(0, 229, 255, 0.3)',
                  mixBlendMode: 'screen',
                }}
                animate={{
                  x: [0, (Math.random() - 0.5) * 60, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.2,
                  repeat: 5,
                  delay: Math.random() * 0.3,
                }}
              />
            ))}
            {/* Screen flicker */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-40"
              animate={{
                opacity: [0, 0.8, 0, 0.6, 0, 1, 0, 0.4, 0],
              }}
              transition={{ duration: 0.12, repeat: 10, ease: 'linear' }}
              style={{ background: '#000' }}
            />
          </>
        )}

        {/* Boot content */}
        <div className="relative z-20 w-full max-w-3xl px-8 py-12">
          {/* Terminal header */}
          <div className="mb-6 flex items-center gap-2 text-xs opacity-40" style={{ color: '#00ff41' }}>
            <span>{'>'}</span>
            <span>DRISHTI NEURAL OS</span>
            <span className="ml-auto">SYS://BOOT</span>
          </div>

          {/* Boot messages */}
          <div className="space-y-1.5 text-sm leading-relaxed">
            {BOOT_MESSAGES.map((msg, index) => {
              if (index > visibleLines) return null

              const isWarning = msg.text.startsWith('WARNING')
              const isCurrentLine = index === visibleLines
              const displayText = isCurrentLine
                ? msg.text.slice(0, typedChars)
                : msg.text

              if (isCurrentLine && typedChars === 0 && visibleLines === index) return null

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.05 }}
                  className="flex items-start gap-2"
                >
                  <span
                    className="shrink-0 text-xs opacity-30 mt-0.5"
                    style={{ color: '#00ff41' }}
                  >
                    {isWarning ? '⚠' : '>'}
                  </span>
                  <span
                    className={`${isWarning ? 'font-bold' : ''}`}
                    style={{
                      color: isWarning ? '#ff0040' : '#00ff41',
                      textShadow: isWarning
                        ? '0 0 10px rgba(255,0,64,0.8), 0 0 20px rgba(255,0,64,0.4)'
                        : '0 0 8px rgba(0,255,65,0.4)',
                    }}
                  >
                    {displayText}
                    {isCurrentLine && showCursor && (
                      <span
                        className="inline-block ml-0.5"
                        style={{
                          color: isWarning ? '#ff0040' : '#00ff41',
                          textShadow: 'none',
                        }}
                      >
                        ▌
                      </span>
                    )}
                  </span>
                </motion.div>
              )
            })}

            {/* Initial blinking cursor before any text */}
            {visibleLines === 0 && typedChars === 0 && (
              <div className="flex items-start gap-2">
                <span className="shrink-0 text-xs opacity-30 mt-0.5" style={{ color: '#00ff41' }}>
                  {'>'}
                </span>
                <span style={{ color: '#00ff41' }}>
                  {showCursor && <span className="inline-block">▌</span>}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-8 right-8 z-20">
          <div className="flex items-center justify-between mb-2 text-xs" style={{ color: '#00ff41', opacity: 0.5 }}>
            <span>BOOT PROGRESS</span>
            <span>{Math.min(Math.round(progress), 100)}%</span>
          </div>
          <div
            className="h-0.5 w-full overflow-hidden rounded-full"
            style={{ background: 'rgba(0,255,65,0.1)' }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #00ff41, #00e5ff)',
                boxShadow: '0 0 10px rgba(0,255,65,0.6)',
                width: `${Math.min(progress, 100)}%`,
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        {/* Skip button */}
        <button
          onClick={handleComplete}
          className="absolute bottom-8 right-8 z-50 text-xs transition-opacity duration-300 hover:opacity-100"
          style={{
            color: '#00ff41',
            opacity: 0.3,
            fontFamily: '"JetBrains Mono", monospace',
            background: 'none',
            border: '1px solid rgba(0,255,65,0.2)',
            padding: '4px 12px',
            cursor: 'pointer',
          }}
        >
          SKIP ▸
        </button>

        {/* Phosphor glow on edges */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            boxShadow: 'inset 0 0 100px rgba(0,255,65,0.05)',
          }}
        />
      </motion.div>
    </AnimatePresence>
  )
}
