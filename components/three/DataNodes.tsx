"use client";

import { useRef, useMemo } from "react";
import { Text } from "@react-three/drei";
import { useNeuralStore, Section, nodePositions, mobileNodePositions } from "@/store/neuralStore";
import * as THREE from "three";

interface DataNode {
  id: Section;
  label: string;
  color: string;
}

const dataNodes: DataNode[] = [
  { id: "profile", label: "PERFIL", color: "#C1DF1F" },
  { id: "experience", label: "EXPERIENCIA", color: "#3a86ff" },
  { id: "projects", label: "PROYECTOS", color: "#00f5d4" },
  { id: "skills", label: "SKILLS", color: "#ff006e" },
  { id: "blog", label: "EL LAB", color: "#8338ec" },
  { id: "contact", label: "CONTACTO", color: "#00ff87" },
];

function DataNodeMesh({ node, isMobile }: { node: DataNode; isMobile: boolean }) {
  const meshRef = useRef<THREE.Group>(null);
  const { activeSection, initiateTransition, transitionPhase } = useNeuralStore();
  const isActive = activeSection === node.id;

  const positions = isMobile ? mobileNodePositions : nodePositions;
  const nodePosition = positions[node.id];
  
  const handleClick = () => {
    if (node.id !== activeSection && transitionPhase === 'idle') {
      initiateTransition(node.id);
    }
  };

  // Planet radius - much smaller on mobile
  const planetRadius = isMobile ? 0.08 : 0.15;
  // Label offset - more space on mobile so text doesn't overlap
  const labelOffset = isMobile ? 0.18 : 0.12;
  
  // Segmentos reducidos para mejor rendimiento (32 en vez de 64)
  const segments = isMobile ? 16 : 32;

  // Memoizar el color para evitar recreación
  const colorObj = useMemo(() => new THREE.Color(node.color), [node.color]);

  return (
    <group
      ref={meshRef}
      position={[nodePosition[0], nodePosition[1], nodePosition[2]]}
      onClick={handleClick}
      onPointerOver={() => { document.body.style.cursor = "pointer"; }}
      onPointerOut={() => { document.body.style.cursor = "default"; }}
    >
      {/* Planet core - segmentos reducidos */}
      <mesh>
        <sphereGeometry args={[planetRadius, segments, segments]} />
        <meshBasicMaterial color={colorObj} />
      </mesh>

      {/* Atmosphere layer 1 */}
      <mesh>
        <sphereGeometry args={[planetRadius * 1.3, segments / 2, segments / 2]} />
        <meshBasicMaterial color={colorObj} transparent opacity={0.25} />
      </mesh>

      {/* Atmosphere layer 2 - solo en desktop */}
      {!isMobile && (
        <mesh>
          <sphereGeometry args={[planetRadius * 1.6, 16, 16]} />
          <meshBasicMaterial color={colorObj} transparent opacity={0.1} />
        </mesh>
      )}

      {/* Atmosphere layer 3 - solo en desktop */}
      {!isMobile && (
        <mesh>
          <sphereGeometry args={[planetRadius * 2, 16, 16]} />
          <meshBasicMaterial color={colorObj} transparent opacity={0.05} />
        </mesh>
      )}

      {/* Active indicator */}
      {isActive && (
        <mesh>
          <sphereGeometry args={[planetRadius * 2.5, 16, 16]} />
          <meshBasicMaterial color={colorObj} transparent opacity={0.15} />
        </mesh>
      )}

      {/* Label - 3D Text attached to planet, scales with zoom */}
      <Text
        position={[0, -(planetRadius + labelOffset), 0]}
        fontSize={isMobile ? 0.06 : 0.08}
        color="white"
        anchorX="center"
        anchorY="top"
        outlineWidth={0.004}
        outlineColor="black"
      >
        {node.label}
      </Text>
    </group>
  );
}

export function DataNodes() {
  const { isMobile } = useNeuralStore();

  return (
    <group>
      {dataNodes.map((node) => (
        <DataNodeMesh key={node.id} node={node} isMobile={isMobile} />
      ))}
    </group>
  );
}
