"use client";

import { useRef, useMemo } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

interface TimelineNode {
  position: [number, number, number];
  label: string;
  year: string;
}

const timelineNodes: TimelineNode[] = [
  { position: [-4, 2, 0], label: "Sixtema", year: "2015" },
  { position: [-2, 1, 1], label: "Tible Tech", year: "2017" },
  { position: [0, 0.5, 2], label: "Marketing Lead", year: "2018" },
  { position: [2, 1, 1], label: "Gratum Corp", year: "2020" },
  { position: [4, 2, 0], label: "Consejo Veterinario", year: "2024" },
];

export function DataStreams() {
  const particlesRef = useRef<THREE.Points>(null);
  const opacityRef = useRef(0.4);

  // Create curved path through timeline nodes
  const { curve, linePoints, particlePositions, particleProgress } = useMemo(() => {
    const points = timelineNodes.map(node => new THREE.Vector3(...node.position));
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.5);
    
    const linePoints = curve.getPoints(100).map(p => [p.x, p.y, p.z] as [number, number, number]);
    
    // Flowing particles along the stream
    const particleCount = 50;
    const positions = new Float32Array(particleCount * 3);
    const progress = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      progress[i] = i / particleCount;
      const point = curve.getPoint(progress[i]);
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    }
    
    return { 
      curve, 
      linePoints,
      particlePositions: positions, 
      particleProgress: progress 
    };
  }, []);

  const particleCount = 50;

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Animate opacity pulsing
    opacityRef.current = 0.3 + Math.sin(time * 2) * 0.1;

    // Animate particles flowing along the curve
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < particleCount; i++) {
        const t = (particleProgress[i] + time * 0.05) % 1;
        const point = curve.getPoint(t);
        
        positions[i * 3] = point.x;
        positions[i * 3 + 1] = point.y;
        positions[i * 3 + 2] = point.z;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[0, -2, -2]}>
      {/* Main stream line */}
      <Line
        points={linePoints}
        color="#C1DF1F"
        lineWidth={2}
        transparent
        opacity={0.4}
      />

      {/* Secondary stream */}
      <Line
        points={linePoints}
        color="#3a86ff"
        lineWidth={1}
        transparent
        opacity={0.2}
        position={[0, 0.1, 0.1]}
      />

      {/* Flowing particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          color="#00f5d4"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Node markers */}
      {timelineNodes.map((node, index) => (
        <group key={index} position={node.position}>
          {/* Node sphere */}
          <mesh>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshBasicMaterial 
              color={index === timelineNodes.length - 1 ? "#00f5d4" : "#ffa001"} 
            />
          </mesh>
          
          {/* Node glow */}
          <mesh>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshBasicMaterial 
              color={index === timelineNodes.length - 1 ? "#00f5d4" : "#ffa001"}
              transparent
              opacity={0.3}
            />
          </mesh>

          {/* Outer ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.2, 0.01, 8, 32]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
