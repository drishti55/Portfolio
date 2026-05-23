'use client'

import SmoothScroll from '@/components/layout/SmoothScroll'
import MagneticCursor from '@/components/cursor/MagneticCursor'
import ScanlineOverlay from '@/components/effects/ScanlineOverlay'

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SmoothScroll>
      {children}
      <MagneticCursor />
      <ScanlineOverlay />
    </SmoothScroll>
  )
}
