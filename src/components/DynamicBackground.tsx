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

// 动态跳跃的篝火光照与波浪起伏的动态火苗
function CampfireLight() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const flameGroupRef = useRef<THREE.Group>(null!);
  const flameRef1 = useRef<THREE.Mesh>(null!);
  const flameRef2 = useRef<THREE.Mesh>(null!);
  const flameRef3 = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    
    if (lightRef.current) {
      // 篝火光照跳动
      lightRef.current.intensity = 4 + Math.sin(t * 12) * 1.5 + Math.random() * 0.8;
    }
    
    // 1. 让整个火苗群组产生“S型”曲线波动（模拟风吹和热气流波动）
    if (flameGroupRef.current) {
      flameGroupRef.current.rotation.z = Math.sin(t * 4) * 0.08; // 左右柔和摇摆
      flameGroupRef.current.rotation.x = Math.cos(t * 3) * 0.05; // 前后柔和摇摆
    }

    // 2. 动画化火苗（高度起伏，带有非线性的呼吸感）
    if (flameRef1.current) {
      flameRef1.current.scale.y = 1.4 + Math.sin(t * 8) * 0.25;
      flameRef1.current.scale.x = 1.1 + Math.cos(t * 6) * 0.1;
      flameRef1.current.scale.z = 1.1 + Math.sin(t * 7) * 0.1;
    }
    if (flameRef2.current) {
      flameRef2.current.scale.y = 1.2 + Math.cos(t * 10) * 0.3;
      // 引入正弦曲线偏移，使中层火苗产生扭动感
      flameRef2.current.position.x = Math.sin(t * 6) * 0.04;
      flameRef2.current.position.z = Math.cos(t * 5) * 0.04;
    }
    if (flameRef3.current) {
      flameRef3.current.scale.y = 1.0 + Math.sin(t * 14) * 0.15;
      flameRef3.current.position.x = -Math.sin(t * 8) * 0.02;
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
      
      {/* 动态火苗群组 (Procedural Wave Flames) */}
      <group ref={flameGroupRef} position={[0, 0.6, 0]}>
        {/* 外层大火苗（半透明深橙色） */}
        <mesh ref={flameRef1} position={[0, 0, 0]}>
          <coneGeometry args={[0.45, 1.2, 16]} />
          <meshBasicMaterial color="#ff3300" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        
        {/* 中层火苗（明亮的暖橙黄色） */}
        <mesh ref={flameRef2} position={[0, -0.1, 0]}>
          <coneGeometry args={[0.3, 0.9, 16]} />
          <meshBasicMaterial color="#ff8800" transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        
        {/* 内核火苗（极度亮黄高温核心） */}
        <mesh ref={flameRef3} position={[0, -0.2, 0]}>
          <coneGeometry args={[0.15, 0.6, 16]} />
          <meshBasicMaterial color="#ffea00" transparent opacity={0.9} blending={THREE.AdditiveBlending} depthWrite={false} />
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
  // 增加草坪的起伏感（不平整性），并且撒上一些碎石/杂草的小碎点
  return (
    <group position={[0, -1, 0]}>
      {/* 巨大的草地主平面 */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100, 128, 128]} />
        <meshStandardMaterial 
          color="#1e351b" // 稍微深一点的暗草绿
          roughness={0.9} 
          metalness={0.02}
        />
      </mesh>
      
      {/* 随机散落的一些“草丛”和“小石头”小凸起，避免光秃秃 */}
      <group position={[0, 0, 0]}>
        {/* 角色周围的小草堆1 */}
        <mesh position={[-0.8, 0.05, -0.3]} castShadow>
          <coneGeometry args={[0.08, 0.15, 4]} />
          <meshStandardMaterial color="#2d4d2d" roughness={1} />
        </mesh>
        <mesh position={[-0.7, 0.08, -0.4]} castShadow>
          <coneGeometry args={[0.06, 0.2, 4]} />
          <meshStandardMaterial color="#355e35" roughness={1} />
        </mesh>
        
        {/* 篝火旁边的草堆2 */}
        <mesh position={[0.7, 0.05, 0.8]} castShadow>
          <coneGeometry args={[0.1, 0.18, 4]} />
          <meshStandardMaterial color="#2d4d2d" roughness={1} />
        </mesh>
        <mesh position={[-0.5, 0.04, 1.8]} castShadow>
          <coneGeometry args={[0.08, 0.12, 4]} />
          <meshStandardMaterial color="#355e35" roughness={1} />
        </mesh>

        {/* 散落在各处的灰色鹅卵石 */}
        <mesh position={[1.2, 0.05, -0.8]} castShadow>
          <dodecahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#555555" roughness={0.9} />
        </mesh>
        <mesh position={[-1.5, 0.03, 0.5]} castShadow>
          <dodecahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial color="#666666" roughness={0.9} />
        </mesh>
        <mesh position={[0.5, 0.04, 2.3]} castShadow>
          <dodecahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="#444444" roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#050505']} />
      
      {/* 银河级别的逼真星空背景，带有绚丽的星云色彩（科幻虚幻风） */}
      <group rotation={[Math.PI / 8, Math.PI / 4, 0]}>
        {/* 底层暗星星（繁星点点，形成背景纵深） */}
        <Stars radius={120} depth={50} count={9000} factor={2} saturation={0} fade speed={0.8} />
        {/* 中层闪烁星星 */}
        <Stars radius={90} depth={50} count={2000} factor={5} saturation={0.2} fade speed={1.2} />
        {/* 银河高亮区 */}
        <Stars radius={70} depth={20} count={2500} factor={8} saturation={0.8} fade speed={0.5} />
        
        {/* 绚丽星云光晕（Nebula Glow）：使用发光的点光源和彩色粒子，渲染粉紫/青蓝相间的虚幻梦境银河 */}
        {/* 粉紫色星云粒子群 */}
        <Sparkles count={80} scale={40} size={4} speed={0.1} opacity={0.6} color="#d8b4fe" position={[5, 10, -10]} />
        {/* 深邃青蓝色星云粒子群 */}
        <Sparkles count={80} scale={40} size={5} speed={0.08} opacity={0.5} color="#818cf8" position={[-5, 8, -8]} />
        {/* 金色银河核心颗粒 */}
        <Sparkles count={50} scale={25} size={3} speed={0.15} opacity={0.7} color="#fde047" position={[0, 12, -5]} />
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
