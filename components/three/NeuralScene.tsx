"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useEffect, useMemo } from "react";
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Stars,
  AdaptiveDpr,
  AdaptiveEvents
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { DataNodes } from "./DataNodes";
import { useNeuralStore } from "@/store/neuralStore";

// Easing function for spaceship-like movement (ease-in-out)
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Animated camera - spaceship style with acceleration/deceleration
function AnimatedCamera() {
  const { camera, invalidate } = useThree();
  const { cameraTarget, cameraLookAt, transitionPhase } = useNeuralStore();
  const targetRef = useRef(new THREE.Vector3(0, 0, 15));
  const currentRef = useRef(new THREE.Vector3(0, 0, 15));
  const lookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const lookAtTargetRef = useRef(new THREE.Vector3(0, 0, 0));
  const progressRef = useRef(1); // Start at 1 = already at target
  const startPosRef = useRef(new THREE.Vector3(0, 0, 15));
  const startLookRef = useRef(new THREE.Vector3(0, 0, 0));
  const isInitializedRef = useRef(false);
  
  useEffect(() => {
    // Skip animation on first render - just set position
    if (!isInitializedRef.current) {
      isInitializedRef.current = true;
      currentRef.current.set(...cameraTarget);
      targetRef.current.set(...cameraTarget);
      lookAtRef.current.set(...cameraLookAt);
      lookAtTargetRef.current.set(...cameraLookAt);
      camera.position.set(...cameraTarget);
      camera.lookAt(new THREE.Vector3(...cameraLookAt));
      invalidate(); // Forzar render inicial
      return;
    }
    
    // When target changes, record start position and reset progress
    startPosRef.current.copy(currentRef.current);
    startLookRef.current.copy(lookAtRef.current);
    targetRef.current.set(...cameraTarget);
    lookAtTargetRef.current.set(...cameraLookAt);
    progressRef.current = 0;
    invalidate(); // Forzar render cuando cambia el target
  }, [cameraTarget, cameraLookAt, camera, invalidate]);
  
  useFrame((_, delta) => {
    // Only animate if we're not at target
    const distanceToTarget = currentRef.current.distanceTo(targetRef.current);
    
    if (distanceToTarget > 0.01) {
      // Smooth progress - slower for smoother animation
      const speed = transitionPhase === 'zoomOut' ? 0.8 : 0.6;
      progressRef.current = Math.min(1, progressRef.current + delta * speed);
      
      const easedProgress = easeInOutCubic(progressRef.current);
      
      // Interpolate position
      currentRef.current.lerpVectors(startPosRef.current, targetRef.current, easedProgress);
      camera.position.copy(currentRef.current);
      
      // Interpolate lookAt
      lookAtRef.current.lerpVectors(startLookRef.current, lookAtTargetRef.current, easedProgress);
      camera.lookAt(lookAtRef.current);
      
      invalidate(); // Continuar renderizando mientras hay animación
    } else {
      // Snap to target
      camera.position.copy(targetRef.current);
      camera.lookAt(lookAtTargetRef.current);
    }
  });
  
  return null;
}

function Scene() {
  const { isMobile } = useNeuralStore();
  
  // Memoizar las estrellas para evitar recálculos
  const starsConfig = useMemo(() => ({
    radius: 100,
    depth: 50,
    count: isMobile ? 1500 : 3000, // Menos estrellas en móvil
    factor: 4,
    saturation: 0,
    fade: true,
    speed: 0
  }), [isMobile]);

  return (
    <>
      <PerspectiveCamera 
        makeDefault 
        position={[0, 0, 15]} 
        fov={60}
      />
      
      <AnimatedCamera />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />

      {/* Ambient lighting - reducido para mejor rendimiento */}
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#C1DF1F" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3a86ff" />
      {!isMobile && (
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          color="#00f5d4"
        />
      )}

      {/* Stars background - static, no movement */}
      <Stars {...starsConfig} />

      {/* Data Nodes - Planet dots in distant constellation */}
      <DataNodes />

      {/* Post-processing effects - reducidos en móvil */}
      <EffectComposer multisampling={isMobile ? 0 : 4}>
        <Bloom
          luminanceThreshold={0.3}
          luminanceSmoothing={0.9}
          intensity={isMobile ? 0.5 : 0.8}
          mipmapBlur={!isMobile}
        />
      </EffectComposer>
    </>
  );
}

export function NeuralScene() {
  const { isMobile } = useNeuralStore();
  
  return (
    <Canvas
      className="w-full h-full"
      gl={{ 
        antialias: !isMobile, // Desactivar antialiasing en móvil
        alpha: true,
        powerPreference: "high-performance",
        stencil: false, // No necesitamos stencil buffer
        depth: true,
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]} // Menor resolución en móvil
      frameloop="demand" // Solo renderizar cuando hay cambios
      performance={{ min: 0.5 }} // Permitir bajar calidad si es necesario
    >
      <Suspense fallback={null}>
        {/* Ajuste dinámico de DPR según rendimiento */}
        <AdaptiveDpr pixelated />
        {/* Reducir eventos en frames de bajo rendimiento */}
        <AdaptiveEvents />
        <Scene />
      </Suspense>
    </Canvas>
  );
}
