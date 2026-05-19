"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, SoftShadows, Sky, Environment } from "@react-three/drei";
import * as THREE from "three";

function BaseIsland() {
  return (
    <group>
      {/* Top grass layer */}
      <mesh receiveShadow position={[0, -0.25, 0]}>
        <cylinderGeometry args={[5, 5, 0.5, 64]} />
        <meshStandardMaterial color="#4CAF50" roughness={0.8} />
      </mesh>
      {/* Bottom dirt layer */}
      <mesh receiveShadow position={[0, -0.75, 0]}>
        <cylinderGeometry args={[5, 4.5, 0.5, 64]} />
        <meshStandardMaterial color="#795548" roughness={1} />
      </mesh>
    </group>
  );
}

function Tree({ position, scale = 1 }: { position: [number, number, number], scale?: number }) {
  return (
    <group position={position} scale={scale} castShadow>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.9} />
      </mesh>
      {/* Leaves Layer 1 */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <coneGeometry args={[1.2, 1.5, 8]} />
        <meshStandardMaterial color="#2E7D32" roughness={0.7} />
      </mesh>
      {/* Leaves Layer 2 */}
      <mesh position={[0, 2.2, 0]} castShadow>
        <coneGeometry args={[0.9, 1.2, 8]} />
        <meshStandardMaterial color="#388E3C" roughness={0.7} />
      </mesh>
    </group>
  );
}

function Tent() {
  return (
    <group position={[-1.5, 0, -1.5]} rotation={[0, Math.PI / 4, 0]}>
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <coneGeometry args={[1.5, 2, 4]} />
        <meshStandardMaterial color="#FFA000" roughness={0.6} />
      </mesh>
      {/* Tent opening */}
      <mesh position={[0, 0.5, 1.1]} rotation={[Math.PI / 8, 0, 0]}>
        <planeGeometry args={[0.8, 1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

function Campfire() {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      // Flickering effect
      lightRef.current.intensity = 1.5 + Math.sin(clock.elapsedTime * 10) * 0.2;
    }
  });

  return (
    <group position={[1, 0, 1]}>
      {/* Fire glow */}
      <pointLight ref={lightRef} color="#FF5722" distance={10} castShadow />
      
      {/* Logs */}
      <mesh position={[0, 0.1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[0, Math.PI / 4, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[0, -Math.PI / 4, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color="#3E2723" />
      </mesh>

      {/* Flame placeholder */}
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.2, 0.5, 8]} />
        <meshBasicMaterial color="#FF9800" transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

function SittingPerson() {
  return (
    <group position={[1, 0.2, 0]} rotation={[0, -Math.PI / 4, 0]}>
      {/* Sitting Log */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.2, 1, 8]} />
        <meshStandardMaterial color="#4E342E" />
      </mesh>
      {/* Person Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.3]} />
        <meshStandardMaterial color="#1976D2" />
      </mesh>
      {/* Person Head */}
      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[0.2]} />
        <meshStandardMaterial color="#FFCCBC" />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight 
        position={[5, 10, -5]} 
        intensity={0.5} 
        color="#8C9EFF" 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      
      <group position={[0, -1, 0]}>
        <BaseIsland />
        <Tent />
        <Tree position={[-2, 0, 2]} scale={1.2} />
        <Tree position={[2, 0, -2]} scale={0.8} />
        <Tree position={[-3, 0, 0]} scale={1} />
        <Campfire />
        <SittingPerson />
      </group>

      <Environment preset="night" />
      <Sky distance={450000} sunPosition={[0, -1, -1]} inclination={0.5} azimuth={0.25} />
    </>
  );
}

export function DynamicBackground() {
  return (
    <div className="w-full h-full bg-[#111111]">
      <Canvas shadows camera={{ position: [8, 5, 8], fov: 40 }}>
        <SoftShadows size={15} samples={10} />
        <Scene />
        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.2} 
          minDistance={5} 
          maxDistance={20} 
        />
      </Canvas>
    </div>
  );
}
