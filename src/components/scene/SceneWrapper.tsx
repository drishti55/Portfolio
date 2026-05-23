'use client';

import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import NeuralNetwork from './NeuralNetwork';
import { useEffect, useState } from 'react';

export default function SceneWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ScrollControls pages={8} damping={0.1}>
          <NeuralNetwork />
        </ScrollControls>
      </Canvas>
    </div>
  );
}
