"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  SoftShadows, 
  ContactShadows,
  Float,
  Sparkles,
  Stars
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
      rotation={[0, 0, 0]} // 正向面对前方
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
      position={[0, -0.9, 1.5]} // 稍微下移篝火使其完美贴合
      scale={2} // 放大篝火模型
    />
  );
}

// 渲染你的 3D 草地底座模型 (已废弃，暂时注释掉)
/*
function GrassModel() {
  const { scene } = useGLTF("/models/grass.glb");
  
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return (
    <primitive 
      object={scene} 
      position={[0, -1.2, 0]} // 将草地继续下移，使其顶层与人物底部（y=-1）贴合
      scale={[8, 3.5, 8]} // 保持高度 (Y: 3.5) 不变，大幅拉长左右和前后 (X, Z: 8) 的长度
    />
  );
}

// 构建低多边形风格的露营地台（已废弃原生几何体，改用你的 Grass Model）
function CampsiteBase() {
  return (
    <group position={[0, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <GrassModel />
      </Float>
    </group>
  );
}
*/

// 动态跳跃的篝火光照与动态火苗
function CampfireLight() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const flameRef1 = useRef<THREE.Mesh>(null!);
  const flameRef2 = useRef<THREE.Mesh>(null!);
  const flameRef3 = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    
    if (lightRef.current) {
      // 更强烈和温暖的火焰光照跳动效果
      lightRef.current.intensity = 4 + Math.sin(t * 12) * 1.5 + Math.random() * 0.8;
    }
    
    // 动画化三个叠加的锥形火苗（火苗更大更猛烈）
    if (flameRef1.current) {
      flameRef1.current.scale.y = 1.5 + Math.sin(t * 15) * 0.3;
      flameRef1.current.scale.x = 1.2 + Math.cos(t * 10) * 0.15;
      flameRef1.current.scale.z = 1.2 + Math.sin(t * 12) * 0.15;
    }
    if (flameRef2.current) {
      flameRef2.current.scale.y = 1.3 + Math.cos(t * 20) * 0.4;
      flameRef2.current.position.x = Math.sin(t * 15) * 0.08;
      flameRef2.current.position.z = Math.cos(t * 12) * 0.08;
    }
    if (flameRef3.current) {
      flameRef3.current.scale.y = 1.2 + Math.sin(t * 10) * 0.2;
      flameRef3.current.position.x = -Math.sin(t * 12) * 0.05;
    }
  });

  return (
    <group position={[0, -0.7, 1.5]}>
      {/* 动态光源 */}
      <pointLight 
        ref={lightRef} 
        color="#ff5500" 
        distance={20} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      
      {/* 动态火苗 (Procedural Flames) - 位置上移并且放大基座 */}
      <group position={[0, 0.6, 0]}>
        {/* 外层大火苗（半透明橙色） */}
        <mesh ref={flameRef1} position={[0, 0, 0]}>
          <coneGeometry args={[0.45, 1.2, 8]} />
          <meshBasicMaterial color="#ff5500" transparent opacity={0.6} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        
        {/* 中层火苗（更亮的黄色） */}
        <mesh ref={flameRef2} position={[0, -0.15, 0]}>
          <coneGeometry args={[0.3, 0.9, 8]} />
          <meshBasicMaterial color="#ffaa00" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        
        {/* 内核火苗（接近白色的高温核心） */}
        <mesh ref={flameRef3} position={[0, -0.3, 0]}>
          <coneGeometry args={[0.15, 0.6, 8]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

// 更真实的篝火火星粒子系统
function CampfireSparkles() {
  return (
    <group position={[0, -0.7, 1.5]}>
      {/* 底部剧烈燃烧层：紧贴木柴，数量极大，范围极小，速度快 */}
      <Sparkles count={150} scale={[0.8, 0.4, 0.8]} size={2.5} speed={1.5} opacity={0.9} color="#ff6600" position={[0, 0.2, 0]} noise={10} />
      
      {/* 中部上升层：数量减半，范围变宽，速度中等 */}
      <Sparkles count={60} scale={[1.2, 1.2, 1.2]} size={2} speed={0.8} opacity={0.7} color="#ff8800" position={[0, 0.8, 0]} noise={8} />
      
      {/* 顶部消散层：数量极少，范围很宽，速度慢，准备消散在空气中 */}
      <Sparkles count={20} scale={[2.0, 2.5, 2.0]} size={1} speed={0.3} opacity={0.4} color="#ffcc80" position={[0, 1.8, 0]} noise={5} />
    </group>
  );
}

// 逼真的草地地面
function RealisticGround() {
  // 生成一个高质量的带有些许噪点的草地材质
  return (
    <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      {/* 巨大的平面来充当地面 */}
      <planeGeometry args={[100, 100, 128, 128]} />
      <meshStandardMaterial 
        color="#2c4c2c" // 调亮并增加绿意的草地颜色
        roughness={0.8} // 稍微降低粗糙度，增加一点光泽
        metalness={0.05}
        wireframe={false}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      
      {/* 银河级别的逼真星空背景 */}
      <group rotation={[Math.PI / 8, Math.PI / 4, 0]}>
        {/* 底层小星星（海量） */}
        <Stars radius={100} depth={50} count={8000} factor={3} saturation={0} fade speed={1} />
        {/* 中层闪亮星空 */}
        <Stars radius={80} depth={50} count={2000} factor={6} saturation={0} fade speed={1.5} />
        {/* 模拟银河星云带（密集的高亮区域） */}
        <Stars radius={60} depth={20} count={3000} factor={8} saturation={0.5} fade speed={0.5} />
      </group>
      
      {/* 极夜环境光照 - 稍微提亮并加入暖色调 */}
      <ambientLight intensity={0.15} color="#e0e7ff" />
      
      {/* 模拟冷色调的月光作为对比 */}
      <directionalLight 
        position={[-10, 20, -10]} 
        intensity={0.3} 
        color="#818cf8" 
        castShadow 
        shadow-mapSize={[2048, 2048]} 
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <group position={[0, 0, 0]}>
        <CampfireLight />
        
        {/* 注入你的真实模型 */}
        <CharacterModel />
        <CampfireModel />
        
        {/* 高质量草地 */}
        <RealisticGround />

        {/* 高度分层的真实火星物理系统 */}
        <CampfireSparkles />
      </group>

      {/* 真实的接触阴影，让场景更扎实 */}
      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.6} far={10} color="#000000" position={[0, -0.99, 0]} />
      
      {/* 环境光反射（HDRI），给予你的模型更好的金属/皮肤光泽反射 */}
      <Environment preset="night" />
    </>
  );
}

export function DynamicBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas shadows="basic" camera={{ position: [-4, 2, 6], fov: 45 }}>
        {/* Temporarily remove SoftShadows until the WebGL issue is resolved */}
        
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
        
        <OrbitControls 
          makeDefault
          enablePan={true}
          enableRotate={true}
          enableZoom={true}
          autoRotate={false}
          minPolarAngle={Math.PI / 6} 
          maxPolarAngle={Math.PI / 2.1} 
          minDistance={2} 
          maxDistance={20} 
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/character.glb");
useGLTF.preload("/models/campfire.glb");
useGLTF.preload("/models/grass.glb");
