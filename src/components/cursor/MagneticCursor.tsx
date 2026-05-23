'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'

interface TrailPoint {
  x: number
  y: number
  id: number
}

export default function MagneticCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [hasFinePointer, setHasFinePointer] = useState(false)
  const [trail, setTrail] = useState<TrailPoint[]>([])

  const trailIdRef = useRef(0)
  const mousePos = useRef({ x: 0, y: 0 })
  const magnetTarget = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number>(0)

  // Inner dot — precise, snappy spring
  const dotX = useMotionValue(0)
  const dotY = useMotionValue(0)

  // Outer ring — smooth spring with lag
  const ringX = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 })
  const ringY = useSpring(0, { stiffness: 150, damping: 20, mass: 0.5 })

  // Check for fine pointer (non-touch devices)
  useEffect(() => {
    const mql = window.matchMedia('(pointer: fine)')
    setHasFinePointer(mql.matches)

    const handler = (e: MediaQueryListEvent) => setHasFinePointer(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  // Hide/show default cursor via CSS
  useEffect(() => {
    if (!hasFinePointer) return

    const style = document.createElement('style')
    style.id = 'magnetic-cursor-style'
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `
    document.head.appendChild(style)

    return () => {
      const existing = document.getElementById('magnetic-cursor-style')
      if (existing) existing.remove()
    }
  }, [hasFinePointer])

  // Trail spawner
  const addTrailPoint = useCallback((x: number, y: number) => {
    trailIdRef.current++
    setTrail((prev) => {
      const next = [...prev, { x, y, id: trailIdRef.current }]
      // Keep only last 8 trail points
      return next.slice(-8)
    })
  }, [])

  // Remove expired trail points
  useEffect(() => {
    if (trail.length === 0) return
    const timer = setTimeout(() => {
      setTrail((prev) => prev.slice(1))
    }, 120)
    return () => clearTimeout(timer)
  }, [trail])

  // RAF loop for smooth cursor tracking
  useEffect(() => {
    if (!hasFinePointer) return

    let lastTrailTime = 0

    const updateCursor = (time: number) => {
      const { x, y } = mousePos.current

      // Apply magnetic pull if hovering interactive element
      let targetX = x
      let targetY = y

      if (magnetTarget.current) {
        const magX = magnetTarget.current.x
        const magY = magnetTarget.current.y
        // Pull cursor 30% toward element center
        targetX = x + (magX - x) * 0.3
        targetY = y + (magY - y) * 0.3
      }

      dotX.set(targetX)
      dotY.set(targetY)
      ringX.set(targetX)
      ringY.set(targetY)

      // Spawn trail points at intervals
      if (time - lastTrailTime > 50) {
        addTrailPoint(targetX, targetY)
        lastTrailTime = time
      }

      rafRef.current = requestAnimationFrame(updateCursor)
    }

    rafRef.current = requestAnimationFrame(updateCursor)
    return () => cancelAnimationFrame(rafRef.current)
  }, [hasFinePointer, dotX, dotY, ringX, ringY, addTrailPoint])

  // Mouse event listeners
  useEffect(() => {
    if (!hasFinePointer) return

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-magnetic], input, textarea, select, [role="button"]')
      if (interactive) {
        setIsHovering(true)
        const rect = interactive.getBoundingClientRect()
        magnetTarget.current = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-magnetic], input, textarea, select, [role="button"]')
      if (interactive) {
        setIsHovering(false)
        magnetTarget.current = null
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseout', handleMouseOut, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [hasFinePointer, isVisible])

  if (!hasFinePointer) return null

  const ringSize = isHovering ? 48 : 32
  const dotSize = isHovering ? 6 : 4

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ isolation: 'isolate' }}
    >
      {/* Holographic trail */}
      <AnimatePresence>
        {trail.map((point) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.4, scale: 1 }}
            animate={{ opacity: 0, scale: 0.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="absolute rounded-full"
            style={{
              left: point.x - 4,
              top: point.y - 4,
              width: 8,
              height: 8,
              background: isHovering
                ? 'radial-gradient(circle, rgba(0,255,65,0.4), transparent)'
                : 'radial-gradient(circle, rgba(0,229,255,0.3), transparent)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          border: `1.5px solid ${isHovering ? '#00ff41' : 'rgba(0, 229, 255, 0.5)'}`,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.8 : 1,
          boxShadow: isHovering
            ? '0 0 15px rgba(0,255,65,0.3), inset 0 0 15px rgba(0,255,65,0.1)'
            : '0 0 10px rgba(0,229,255,0.15)',
          transition: 'width 0.3s, height 0.3s, margin 0.3s, border-color 0.3s, box-shadow 0.3s, scale 0.15s',
          willChange: 'transform',
          backdropFilter: 'blur(1px)',
        }}
      />

      {/* Click pulse effect */}
      <AnimatePresence>
        {isClicking && (
          <motion.div
            className="absolute rounded-full"
            initial={{ scale: 0.5, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              x: dotX,
              y: dotY,
              width: 32,
              height: 32,
              marginLeft: -16,
              marginTop: -16,
              border: `1px solid ${isHovering ? '#00ff41' : '#00e5ff'}`,
              willChange: 'transform, opacity',
            }}
          />
        )}
      </AnimatePresence>

      {/* Inner dot */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: dotSize,
          height: dotSize,
          marginLeft: -dotSize / 2,
          marginTop: -dotSize / 2,
          background: isHovering ? '#00ff41' : '#00e5ff',
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovering
            ? '0 0 12px rgba(0,255,65,0.8), 0 0 24px rgba(0,255,65,0.4)'
            : '0 0 8px rgba(0,229,255,0.6)',
          transition: 'width 0.2s, height 0.2s, margin 0.2s, background 0.2s, box-shadow 0.2s',
          willChange: 'transform',
        }}
      />

      {/* Energy distortion glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: dotX,
          y: dotY,
          width: isHovering ? 60 : 40,
          height: isHovering ? 60 : 40,
          marginLeft: isHovering ? -30 : -20,
          marginTop: isHovering ? -30 : -20,
          background: isHovering
            ? 'radial-gradient(circle, rgba(0,255,65,0.08), transparent 70%)'
            : 'radial-gradient(circle, rgba(0,229,255,0.05), transparent 70%)',
          opacity: isVisible ? 1 : 0,
          filter: 'blur(4px)',
          transition: 'width 0.3s, height 0.3s, margin 0.3s',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
