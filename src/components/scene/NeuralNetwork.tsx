'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

export default function NeuralNetwork() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const scroll = useScroll();

  // Particle configuration
  const particleCount = 400;
  const maxDistance = 2.5;
  const areaSize = 15;

  // Generate random positions
  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const vel = [];
    
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * areaSize;
      pos[i * 3 + 1] = (Math.random() - 0.5) * areaSize;
      pos[i * 3 + 2] = (Math.random() - 0.5) * (areaSize * 0.5); // Flatter depth
      
      vel.push({
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      });
    }
    
    return { positions: pos, velocities: vel };
  }, []);

  // Update loop
  useFrame((state, delta) => {
    if (!pointsRef.current || !linesRef.current) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const linePositions = [];
    
    // Slow rotation based on scroll and time
    const scrollOffset = scroll ? scroll.offset : 0;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05 + scrollOffset * Math.PI;
    pointsRef.current.rotation.x = scrollOffset * Math.PI * 0.5;
    linesRef.current.rotation.y = pointsRef.current.rotation.y;
    linesRef.current.rotation.x = pointsRef.current.rotation.x;

    // Update particle positions
    for (let i = 0; i < particleCount; i++) {
      let x = positions[i * 3];
      let y = positions[i * 3 + 1];
      let z = positions[i * 3 + 2];

      const v = velocities[i];
      x += v.x;
      y += v.y;
      z += v.z;

      // Bounce off walls
      if (Math.abs(x) > areaSize / 2) v.x *= -1;
      if (Math.abs(y) > areaSize / 2) v.y *= -1;
      if (Math.abs(z) > areaSize / 4) v.z *= -1;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Check distances for lines
      for (let j = i + 1; j < particleCount; j++) {
        const dx = x - positions[j * 3];
        const dy = y - positions[j * 3 + 1];
        const dz = z - positions[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < maxDistance * maxDistance) {
          linePositions.push(
            x, y, z,
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Update lines
    const lineGeo = linesRef.current.geometry;
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00ff41"
          transparent
          opacity={0.6}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          color="#00e5ff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  );
}
