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
      // 篝火光照大幅增强并更剧烈晃动
      lightRef.current.intensity = 5 + Math.sin(t * 14) * 2 + Math.random() * 1.2;
      // 让光源位置轻微晃动，模拟火苗跳动导致影子晃动的物理效果
      lightRef.current.position.x = Math.sin(t * 10) * 0.15;
      lightRef.current.position.z = Math.cos(t * 8) * 0.15;
    }
    
    // 1. 让整个火苗群组产生更大幅度、更自然的“S型”有机曲线波动（使用贝塞尔风和二次方噪声模拟）
    if (flameGroupRef.current) {
      flameGroupRef.current.rotation.z = Math.sin(t * 3.5) * 0.12 + Math.cos(t * 7) * 0.04; 
      flameGroupRef.current.rotation.x = Math.cos(t * 2.8) * 0.08 + Math.sin(t * 5.5) * 0.03; 
    }

    // 2. 更加不规则的火苗缩放与起伏，带出呼吸和热流腾空感
    if (flameRef1.current) {
      flameRef1.current.scale.y = 1.5 + Math.sin(t * 6) * 0.35 + Math.cos(t * 11) * 0.1;
      flameRef1.current.scale.x = 1.1 + Math.cos(t * 4) * 0.15;
      flameRef1.current.scale.z = 1.1 + Math.sin(t * 5.2) * 0.15;
    }
    if (flameRef2.current) {
      flameRef2.current.scale.y = 1.3 + Math.cos(t * 9) * 0.45;
      flameRef2.current.position.x = Math.sin(t * 5) * 0.08;
      flameRef2.current.position.z = Math.cos(t * 4.2) * 0.08;
    }
    if (flameRef3.current) {
      flameRef3.current.scale.y = 1.1 + Math.sin(t * 12) * 0.25;
      flameRef3.current.position.x = -Math.sin(t * 7) * 0.05;
    }
  });

  return (
    <group position={[0, -0.7, 1.5]}>
      {/* 动态光源 - 照亮地面和角色周围环境 */}
      <pointLight 
        ref={lightRef} 
        color="#ff4400" 
        distance={25} // 增大照亮半径，使草地和周围完全被篝火笼罩
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      {/* 篝火基座的额外微弱恒定光源，烘托草地表面的暖色底蕴 */}
      <pointLight
        color="#ff7700"
        intensity={1.5}
        distance={6}
        position={[0, 0.1, 0]}
      />
      
      {/* 动态火苗群组 (Procedural Wave Flames) */}
      <group ref={flameGroupRef} position={[0, 0.6, 0]}>
        {/* 外层大火苗（半透明深橙红色，更飘逸） */}
        <mesh ref={flameRef1} position={[0, 0, 0]}>
          <coneGeometry args={[0.5, 1.3, 16]} />
          <meshBasicMaterial color="#ff2200" transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        
        {/* 中层火苗（明亮的暖橙黄色） */}
        <mesh ref={flameRef2} position={[0, -0.1, 0]}>
          <coneGeometry args={[0.32, 1.0, 16]} />
          <meshBasicMaterial color="#ff8800" transparent opacity={0.75} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        
        {/* 内核火苗（极度亮黄高温核心，高对比度） */}
        <mesh ref={flameRef3} position={[0, -0.2, 0]}>
          <coneGeometry args={[0.16, 0.7, 16]} />
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
  return (
    <group position={[0, -1, 0]}>
      {/* 巨大的草地主平面 */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120, 128, 128]} />
        <meshStandardMaterial 
          color="#152b15" // 带有深邃感和神秘感的暗冷草地色
          roughness={0.92} 
          metalness={0.01}
        />
      </mesh>
      
      {/* 随机散落的草丛、鲜花和萤火虫（让地表充满细节） */}
      <group position={[0, 0, 0]}>
        {/* 周围的杂草堆 - 增加了低多边形小碎草，提高自然生态感 */}
        <mesh position={[-0.8, 0.05, -0.3]} castShadow>
          <coneGeometry args={[0.08, 0.18, 4]} />
          <meshStandardMaterial color="#2d5a2d" roughness={1} />
        </mesh>
        <mesh position={[-0.7, 0.08, -0.4]} castShadow>
          <coneGeometry args={[0.06, 0.24, 4]} />
          <meshStandardMaterial color="#3d6e3d" roughness={1} />
        </mesh>
        <mesh position={[-1.2, 0.06, 0.2]} castShadow>
          <coneGeometry args={[0.07, 0.16, 4]} />
          <meshStandardMaterial color="#2d5a2d" roughness={1} />
        </mesh>
        
        {/* 篝火旁边的暖色小鲜花 */}
        <group position={[0.8, 0.05, 0.8]}>
          {/* 花茎 */}
          <mesh castShadow>
            <cylinderGeometry args={[0.01, 0.01, 0.15, 4]} />
            <meshStandardMaterial color="#2d5a2d" />
          </mesh>
          {/* 花朵点缀（小球体） */}
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.04, 6, 6]} />
            <meshBasicMaterial color="#fca5a5" /> {/* 浅粉小花 */}
          </mesh>
        </group>

        <group position={[-0.5, 0.04, 1.8]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.01, 0.01, 0.12, 4]} />
            <meshStandardMaterial color="#2d5a2d" />
          </mesh>
          <mesh position={[0, 0.08, 0]}>
            <sphereGeometry args={[0.03, 6, 6]} />
            <meshBasicMaterial color="#fef08a" /> {/* 嫩黄小花 */}
          </mesh>
        </group>

        <group position={[0.6, 0.04, 2.3]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.01, 0.01, 0.14, 4]} />
            <meshStandardMaterial color="#2d5a2d" />
          </mesh>
          <mesh position={[0, 0.09, 0]}>
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshBasicMaterial color="#fed7aa" /> {/* 暖橙小花 */}
          </mesh>
        </group>

        {/* 散落在各处的灰色、黑褐色的鹅卵石 */}
        <mesh position={[1.4, 0.05, -0.8]} castShadow>
          <dodecahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#555555" roughness={0.92} />
        </mesh>
        <mesh position={[-1.6, 0.03, 0.5]} castShadow>
          <dodecahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial color="#444444" roughness={0.95} />
        </mesh>
        <mesh position={[0.3, 0.04, 2.5]} castShadow>
          <dodecahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="#665c54" roughness={0.9} />
        </mesh>

        {/* 局部的低空温情萤火虫：在草丛和小花丛中极其微弱缓慢地飘动 */}
        <Sparkles count={35} scale={[6, 1.5, 6]} size={1.8} speed={0.2} opacity={0.6} color="#bef264" position={[0, 0.4, 0.5]} noise={2} />
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
        
        {/* 绚丽星云光晕（Nebula Glow）：使用夕阳余晖与晚霞相间的暗暖色调，营造绚烂神秘的虚幻宇宙 */}
        {/* 夕阳晚霞粉金星云粒子群 */}
        <Sparkles count={120} scale={40} size={5} speed={0.12} opacity={0.65} color="#fdba74" position={[10, 12, -15]} />
        {/* 紫罗兰暮色星云粒子群 */}
        <Sparkles count={100} scale={40} size={6} speed={0.09} opacity={0.55} color="#c084fc" position={[-8, 6, -10]} />
        {/* 绯红火烧云深空粒子群 */}
        <Sparkles count={80} scale={35} size={4.5} speed={0.06} opacity={0.5} color="#f43f5e" position={[2, 10, -5]} />
        {/* 靛蓝色幽深太空格底 */}
        <Sparkles count={100} scale={50} size={3} speed={0.05} opacity={0.4} color="#6366f1" position={[0, -5, -20]} />
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
