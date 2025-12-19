"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  mousePosition: { x: number; y: number };
}

const PARTICLE_COUNT = 2000;

export function ParticleField({ mousePosition }: ParticleFieldProps) {
  const particlesRef = useRef<THREE.Points>(null);
  const originalPositions = useRef<Float32Array | null>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const colorPrimary = new THREE.Color("#ffa001");
    const colorSecondary = new THREE.Color("#3a86ff");
    const colorTertiary = new THREE.Color("#00f5d4");
    const colorFade = new THREE.Color("#ffffff");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Distribute particles in a large volume
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 10;

      // Color based on position
      const distance = Math.sqrt(
        positions[i * 3] ** 2 + 
        positions[i * 3 + 1] ** 2 + 
        positions[i * 3 + 2] ** 2
      );

      let color;
      if (distance < 8) {
        color = colorPrimary;
      } else if (distance < 12) {
        color = colorSecondary;
      } else if (distance < 16) {
        color = colorTertiary;
      } else {
        color = colorFade;
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;
    }

    originalPositions.current = positions.slice();
    return { positions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (particlesRef.current && originalPositions.current) {
      const time = state.clock.elapsedTime;
      const positionAttr = particlesRef.current.geometry.attributes.position;
      const array = positionAttr.array as Float32Array;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const originalX = originalPositions.current[i3];
        const originalY = originalPositions.current[i3 + 1];
        const originalZ = originalPositions.current[i3 + 2];

        // Gentle floating motion
        const floatX = Math.sin(time * 0.3 + i * 0.01) * 0.1;
        const floatY = Math.cos(time * 0.2 + i * 0.01) * 0.1;
        const floatZ = Math.sin(time * 0.1 + i * 0.01) * 0.1;

        // Mouse influence (particles near the mouse move away slightly)
        const mouseInfluence = 0.5;
        const distToMouse = Math.sqrt(
          (originalX - mousePosition.x * 10) ** 2 +
          (originalY - mousePosition.y * 10) ** 2
        );

        let mouseOffsetX = 0;
        let mouseOffsetY = 0;

        if (distToMouse < 5) {
          const pushStrength = (5 - distToMouse) / 5 * mouseInfluence;
          mouseOffsetX = (originalX - mousePosition.x * 10) * pushStrength * 0.1;
          mouseOffsetY = (originalY - mousePosition.y * 10) * pushStrength * 0.1;
        }

        array[i3] = originalX + floatX + mouseOffsetX;
        array[i3 + 1] = originalY + floatY + mouseOffsetY;
        array[i3 + 2] = originalZ + floatZ;
      }

      positionAttr.needsUpdate = true;

      // Slow rotation of the entire field
      particlesRef.current.rotation.y = time * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
