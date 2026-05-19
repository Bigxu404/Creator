"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  SoftShadows, 
  ContactShadows,
  Float,
  Sparkles
} from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

// 渲染你提供的真实 3D 人物模型
function CharacterModel() {
  const { scene } = useGLTF("/models/character.glb");
  
  // 遍历模型并开启投影和接收阴影
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <primitive 
      object={scene} 
      position={[0, -1, 0]} // 调整模型高度，让它正好“坐”在地上
      scale={2} // 根据你的模型大小，这里可以动态调节缩放
      rotation={[0, -Math.PI / 8, 0]} // 稍微侧一点身子
    />
  );
}

// 构建低多边形风格的露营地台
function CampsiteBase() {
  return (
    <group position={[0, -1, 0]}>
      {/* 悬浮的草地小岛 */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <mesh receiveShadow position={[0, -0.2, 0]}>
          <cylinderGeometry args={[4, 3.5, 0.4, 64]} />
          <meshStandardMaterial color="#2d4a22" roughness={0.8} />
        </mesh>
        {/* 底部的泥土层 */}
        <mesh receiveShadow position={[0, -0.6, 0]}>
          <cylinderGeometry args={[3.5, 3, 0.4, 64]} />
          <meshStandardMaterial color="#3e2723" roughness={1} />
        </mesh>
      </Float>

      {/* 篝火基座石头 */}
      <mesh receiveShadow position={[1.5, 0.1, 1]}>
        <cylinderGeometry args={[0.4, 0.5, 0.1, 8]} />
        <meshStandardMaterial color="#757575" roughness={0.9} />
      </mesh>
      
      {/* 柴火 */}
      <group position={[1.5, 0.2, 1]}>
        <mesh castShadow rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
          <meshStandardMaterial color="#4e342e" />
        </mesh>
        <mesh castShadow rotation={[0, Math.PI / 3, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
          <meshStandardMaterial color="#4e342e" />
        </mesh>
        <mesh castShadow rotation={[0, -Math.PI / 3, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
          <meshStandardMaterial color="#4e342e" />
        </mesh>
      </group>
    </group>
  );
}

// 动态跳跃的篝火光照
function CampfireLight() {
  const lightRef = useRef<THREE.PointLight>(null!);
  
  useFrame(({ clock }) => {
    if (lightRef.current) {
      // 模拟火焰跳动的效果
      lightRef.current.intensity = 2 + Math.sin(clock.elapsedTime * 8) * 0.5 + Math.random() * 0.2;
    }
  });

  return (
    <group position={[1.5, -0.5, 1]}>
      <pointLight 
        ref={lightRef} 
        color="#ff7b00" 
        distance={10} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      {/* 模拟火焰的简单几何体 */}
      <mesh position={[0, 0.3, 0]}>
        <coneGeometry args={[0.2, 0.5, 5]} />
        <meshBasicMaterial color="#ff9900" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      
      {/* 极夜环境光照 */}
      <ambientLight intensity={0.1} />
      
      {/* 模拟冷色调的月光 */}
      <directionalLight 
        position={[-5, 8, -5]} 
        intensity={0.3} 
        color="#a5b4fc" 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />

      <group position={[0, 0, 0]}>
        <CampsiteBase />
        <CampfireLight />
        
        {/* 注入你的真实模型 */}
        <CharacterModel />

        {/* 漂浮的萤火虫/火星粒子 */}
        <Sparkles count={50} scale={6} size={2} speed={0.4} opacity={0.3} color="#ffb74d" position={[1.5, 0, 1]} />
      </group>

      {/* 真实的接触阴影，让场景更扎实 */}
      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.5} far={10} color="#000000" position={[0, -1.8, 0]} />
      
      {/* 环境光反射（HDRI），给予你的模型更好的金属/皮肤光泽反射 */}
      <Environment preset="night" />
    </>
  );
}

export function DynamicBackground() {
  return (
    <div className="fixed inset-0 z-[-1]">
      <Canvas shadows="basic" camera={{ position: [-4, 2, 6], fov: 45 }}>
        {/* Temporarily remove SoftShadows until the WebGL issue is resolved */}
        
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        
        <OrbitControls 
          enablePan={false}
          autoRotate 
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 2.1} 
          minDistance={4} 
          maxDistance={12} 
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/character.glb");
