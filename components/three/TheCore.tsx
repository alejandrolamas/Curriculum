"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useNeuralStore } from "@/store/neuralStore";

const PARTICLE_COUNT = 3000;

export function TheCore() {
  const meshRef = useRef<THREE.Points>(null);
  const { coreExpanded, setCoreExpanded, isDarkMode } = useNeuralStore();

  // Generate particle positions for sphere
  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    const colorPrimary = new THREE.Color("#C1DF1F");
    const colorSecondary = new THREE.Color("#3a86ff");
    const colorAccent = new THREE.Color("#00f5d4");

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Sphere distribution using golden spiral
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
      
      const radius = 1.5 + Math.random() * 0.3;
      
      positions[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      positions[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      // Random color from palette
      const colorChoice = Math.random();
      let color;
      if (colorChoice < 0.5) {
        color = colorPrimary;
      } else if (colorChoice < 0.8) {
        color = colorSecondary;
      } else {
        color = colorAccent;
      }

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    return { positions, colors, sizes };
  }, []);

  // Animation
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Rotate the core
      meshRef.current.rotation.y = time * 0.1;
      meshRef.current.rotation.x = Math.sin(time * 0.05) * 0.1;
      
      // Pulse effect
      const scale = 1 + Math.sin(time * 2) * 0.02;
      meshRef.current.scale.setScalar(coreExpanded ? 2.5 : scale);
      
      // Update particle positions for wave effect
      const positionAttr = meshRef.current.geometry.attributes.position;
      const array = positionAttr.array as Float32Array;
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        const wave = Math.sin(time + x * 2 + y * 2) * 0.05;
        
        array[i3] = x + wave;
        array[i3 + 1] = y + wave;
        array[i3 + 2] = z + wave;
      }
      
      positionAttr.needsUpdate = true;
    }
  });

  return (
    <group onClick={() => setCoreExpanded(!coreExpanded)}>
      {/* Core particles */}
      <points ref={meshRef}>
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
          size={0.05}
          vertexColors
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#ffa001"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.02, 16, 100]} />
        <meshBasicMaterial color="#3a86ff" transparent opacity={0.5} />
      </mesh>

      {/* Second ring */}
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[2.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00f5d4" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
