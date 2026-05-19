"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/models/character.glb");
  return <primitive object={scene} />;
}

export function DynamicBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#0a0a0a]">
      <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        
        <OrbitControls autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/models/character.glb");
