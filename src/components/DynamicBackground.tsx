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

// 渲染新的 3D 篝火模型
function CampfireModel() {
  const { scene } = useGLTF("/models/campfire.glb");
  
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <primitive 
      object={scene} 
      position={[0.8, -0.8, 1.5]} // 放置在人物面向的前方
      scale={2} // 放大篝火模型
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
    </group>
  );
}

// 动态跳跃的篝火光照
function CampfireLight() {
  const lightRef = useRef<THREE.PointLight>(null!);
  
  useFrame(({ clock }) => {
    if (lightRef.current) {
      // 更强烈和温暖的火焰跳动效果
      lightRef.current.intensity = 3 + Math.sin(clock.elapsedTime * 12) * 0.8 + Math.random() * 0.4;
    }
  });

  return (
    <group position={[0.8, -0.2, 1.5]}>
      <pointLight 
        ref={lightRef} 
        color="#ff5500" 
        distance={15} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      
      {/* 极夜环境光照 - 稍微提亮并加入暖色调 */}
      <ambientLight intensity={0.2} color="#ffedd5" />
      
      {/* 模拟冷色调的月光作为对比 */}
      <directionalLight 
        position={[-5, 8, -5]} 
        intensity={0.2} 
        color="#a5b4fc" 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
      />

      <group position={[0, 0, 0]}>
        <CampsiteBase />
        <CampfireLight />
        
        {/* 注入你的真实模型 */}
        <CharacterModel />
        <CampfireModel />

        {/* 漂浮的萤火虫/火星粒子 - 更加茂密和旺盛 */}
        <Sparkles count={200} scale={4} size={3} speed={0.8} opacity={0.8} color="#ff8800" position={[0.8, 0, 1.5]} noise={2} />
        {/* 外围的稀疏萤火虫 */}
        <Sparkles count={50} scale={10} size={1.5} speed={0.2} opacity={0.3} color="#a5b4fc" position={[0, 1, 0]} />
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
useGLTF.preload("/models/campfire.glb");
