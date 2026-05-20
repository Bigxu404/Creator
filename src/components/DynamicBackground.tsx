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
      position={[0, -1.02, 1.5]} // 降低位置使其严丝合缝贴合球体地表（消除空白悬空，紧密压实地表）
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

// 动态跳跃的篝火光照与波浪起伏的真实有机火焰
function CampfireLight() {
  const lightRef = useRef<THREE.PointLight>(null!);
  const flameGroupRef = useRef<THREE.Group>(null!);
  const flameRef1 = useRef<THREE.Mesh>(null!);
  const flameRef2 = useRef<THREE.Mesh>(null!);
  const flameRef3 = useRef<THREE.Mesh>(null!);
  
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    
    if (lightRef.current) {
      // 篝火光照：平滑温和地呼吸，完全删除剧烈抖动/晃眼的极速闪烁效果
      lightRef.current.intensity = 5.5 + Math.sin(t * 1.5) * 0.5; // 使用超低频(1.5)，柔和地呼吸
      // 保持光源位置恒定，完全消除阴影和地面光斑的乱晃怪异感
      lightRef.current.position.x = 0;
      lightRef.current.position.z = 0;
    }
    
    // 1. 让整个火苗群组产生极其柔和、自然的有机曲线波动，模拟真实火焰
    if (flameGroupRef.current) {
      // 引入轻微扭动的 S 型摆动，模拟上升空气阻力
      flameGroupRef.current.rotation.z = Math.sin(t * 2.5) * 0.08 + Math.cos(t * 5) * 0.03; 
      flameGroupRef.current.rotation.x = Math.cos(t * 2.0) * 0.06 + Math.sin(t * 4.5) * 0.02; 
    }

    // 2. 动画化火苗：使其保持尖尖的顶，但在中高部通过正弦进行平滑的立体弯曲/扭动
    if (flameRef1.current) {
      flameRef1.current.scale.y = 1.2 + Math.sin(t * 5) * 0.15; // 稍稍增高，但保持圆滑
      flameRef1.current.scale.x = 1.2 + Math.cos(t * 4) * 0.1;
      flameRef1.current.scale.z = 1.2 + Math.sin(t * 4.5) * 0.1;
      
      // 火苗顶部的立体弯曲动画 (弯曲变形)
      flameRef1.current.rotation.z = Math.sin(t * 6) * 0.1;
      flameRef1.current.rotation.x = Math.cos(t * 5) * 0.08;
    }
    if (flameRef2.current) {
      flameRef2.current.scale.y = 1.0 + Math.cos(t * 7) * 0.18;
      flameRef2.current.scale.x = 1.1 + Math.sin(t * 5) * 0.08;
      flameRef2.current.scale.z = 1.1 + Math.cos(t * 4) * 0.08;
      
      // 中层立体扭动
      flameRef2.current.rotation.z = Math.cos(t * 8) * 0.15;
      flameRef2.current.rotation.x = Math.sin(t * 7) * 0.1;
      flameRef2.current.position.x = Math.sin(t * 4) * 0.05;
      flameRef2.current.position.z = Math.cos(t * 3.5) * 0.05;
    }
    if (flameRef3.current) {
      flameRef3.current.scale.y = 0.8 + Math.sin(t * 10) * 0.1;
      flameRef3.current.scale.x = 1.0;
      flameRef3.current.scale.z = 1.0;
      
      // 内核微小扭动
      flameRef3.current.rotation.z = Math.sin(t * 12) * 0.05;
      flameRef3.current.position.x = -Math.sin(t * 6) * 0.03;
    }
  });

  return (
    <group position={[0, -0.82, 1.5]}>
      {/* 动态光源 - 照亮地面和角色周围环境 */}
      <pointLight 
        ref={lightRef} 
        color="#ff4400" 
        distance={45} // 大幅提升照亮半径 (从25提升到45)，使大片草坪被营火光辉温柔笼罩
        castShadow 
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      {/* 篝火基座的额外恒定光源，烘托草地表面的暖色底蕴 */}
      <pointLight
        color="#ff7700"
        intensity={3.5} // 增强基础发光亮度 (从2.5提升到3.5)
        distance={25}   // 大幅扩大恒定暖光衰减范围 (从10提升到25)，烘托更深远处的地表暖调
        position={[0, 0.2, 0]}
      />
      
      {/* 动态火苗群组 (Procedural Wave Flames) */}
      <group ref={flameGroupRef} position={[0, 0.5, 0]}>
        {/* 外层大火苗（半透明深橙红色，尖顶，通过更多分段保持圆滑） */}
        <mesh ref={flameRef1} position={[0, 0, 0]}>
          <coneGeometry args={[0.4, 1.0, 32, 16]} /> {/* 重新改回尖锥（圆台底部保持），但增加了高度分段(16)以便进行平滑的立体旋转弯曲 */}
          <meshBasicMaterial color="#ff2200" transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        
        {/* 中层火苗（明亮的暖橙黄色） */}
        <mesh ref={flameRef2} position={[0, -0.05, 0]}>
          <coneGeometry args={[0.28, 0.8, 32, 16]} />
          <meshBasicMaterial color="#ff8800" transparent opacity={0.65} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
        
        {/* 内核火苗（极度亮黄高温核心，高对比度） */}
        <mesh ref={flameRef3} position={[0, -0.1, 0]}>
          <coneGeometry args={[0.14, 0.5, 32, 8]} />
          <meshBasicMaterial color="#ffea00" transparent opacity={0.8} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

// 更真实的篝火火星粒子系统
function CampfireSparkles() {
  return (
    <group position={[0, -0.82, 1.5]}>
      {/* 底部剧烈燃烧层：紧贴木柴，数量极大，范围极小，速度快 */}
      <Sparkles count={150} scale={[0.8, 0.4, 0.8]} size={2.5} speed={1.5} opacity={0.9} color="#ff6600" position={[0, 0.2, 0]} noise={10} />
      
      {/* 中部上升层：数量减半，范围变宽，速度中等 */}
      <Sparkles count={60} scale={[1.2, 1.2, 1.2]} size={2} speed={0.8} opacity={0.7} color="#ff8800" position={[0, 0.8, 0]} noise={8} />
      
      {/* 顶部消散层：数量极少，范围很宽，速度慢，准备消散在空气中 */}
      <Sparkles count={20} scale={[2.0, 2.5, 2.0]} size={1} speed={0.3} opacity={0.4} color="#ffcc80" position={[0, 1.8, 0]} noise={5} />
    </group>
  );
}

// 逼真的球形星球草地地面 (让人物和篝火位于一个悬浮的绿色微型星球顶部)
function RealisticGround() {
  return (
    <group position={[0, -1, 0]}>
      {/* 绿色的微型小星球草地 */}
      <mesh receiveShadow position={[0, -12, 0]}>
        {/* 
          将球体直径进一步放大至 12.0（半径12.0），使其更加平缓宏大，从而令篝火和人几乎可以说是“贴在球体表面上”。
          球体半径设为 12，高度细分保持在 128 确保极致完美的弧线。
          位置 y=-12，这样球体的顶端弧面正好极为精细地切在 y=0 处，
          让人（坐高y=-1）和篝火（y=-0.9）能够完美、极其稳定、平滑地贴在巨大行星的地表最顶端。
        */}
        <sphereGeometry args={[12, 128, 128]} />
        <meshStandardMaterial 
          color="#152b15" // 带有深邃感和神秘感的暗冷草地色
          roughness={0.92} 
          metalness={0.01}
        />
      </mesh>
      
      {/* 随机散落的草丛和萤火虫（让地表充满细节） */}
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

        {/* 局部的低空温情萤火虫：在草丛和篝火旁极其微弱缓慢地飘动 */}
        <Sparkles count={35} scale={[6, 1.5, 6]} size={1.8} speed={0.2} opacity={0.6} color="#bef264" position={[0, 0.4, 0.5]} noise={2} />
      </group>
    </group>
  );
}

function Scene() {
  return (
    <>
      {/* 
        超现实动漫天空背景的核心：
        使用高对比度霓虹撞色。为了做出完美的青蓝色 (Teal/Cyan) 与 玫红色 (Magenta/Hot Pink) 渐变天空，
        我们直接将 3D 背景色清空（设为透明），并在 Canvas 之外，使用 CSS 的 linear-gradient 背景，
        这比 WebGL 纯色更具动漫电影级的高饱和度霓虹质感，且不会消耗 GPU 计算多边形！
        同时，在 WebGL 内部保留具有泼墨质感与抽象笔触的 3D 星云云雾与漫天霓虹星辰。
      */}
      
      {/* 绚丽超现实动漫星云粒子系统（泼墨质感、高对比度霓虹撞色） */}
      <group rotation={[Math.PI / 12, Math.PI / 6, 0]}>
        {/* 底层闪烁霓虹粉色暗星 */}
        <Stars radius={130} depth={50} count={6000} factor={3} saturation={0.9} fade speed={1.0} />
        {/* 中层闪烁霓虹青蓝色亮星 */}
        <Stars radius={90} depth={50} count={3000} factor={6} saturation={1.0} fade speed={1.5} />
        
        {/* 
          超现实抽象笔触与泼墨质感：
          使用精心着色、分层、高饱和度的霓虹 Sparkles 云团，来堆叠出有如新海诚动漫般绚烂而又带有泼墨斑驳纹理的星空。
        */}
        {/* 1. 玫红色 (Magenta/Pink) 抽象泼墨星云带 - 集中在左上方 */}
        <Sparkles count={250} scale={[30, 15, 30]} size={6} speed={0.15} opacity={0.8} color="#ff007f" position={[-10, 15, -12]} />
        <Sparkles count={150} scale={[20, 8, 20]} size={10} speed={0.08} opacity={0.6} color="#d946ef" position={[-8, 12, -15]} />
        
        {/* 2. 青蓝色 (Cyan/Teal) 霓虹撞色星云带 - 集中在右下方与远景 */}
        <Sparkles count={250} scale={[35, 18, 35]} size={5} speed={0.18} opacity={0.75} color="#00f0ff" position={[12, 6, -18]} />
        <Sparkles count={150} scale={[25, 10, 25]} size={8} speed={0.1} opacity={0.55} color="#06b6d4" position={[10, 4, -20]} />

        {/* 3. 霓虹撞色核心交汇区 (青蓝与玫红的浪漫融合，产生极具张力的紫色晕染) */}
        <Sparkles count={120} scale={[15, 15, 15]} size={12} speed={0.25} opacity={0.9} color="#a855f7" position={[1, 10, -10]} />
        
        {/* 4. 抽象纯白泼墨星尘粒子，用最慢的微光闪烁，突出电影级梦幻空气感 */}
        <Sparkles count={80} scale={[40, 40, 40]} size={4} speed={0.05} opacity={0.4} color="#ffffff" position={[0, 5, -25]} />
      </group>
      
      {/* 电影级光影调整：极夜环境光微弱提亮，但融入强烈的青蓝色调 */}
      <ambientLight intensity={0.2} color="#00f0ff" />
      
      {/* 模拟强烈的霓虹冷月光/背景撞色反光，从左后方打来 */}
      <directionalLight 
        position={[-15, 15, -10]} 
        intensity={0.6} // 提高亮度以配合高对比度动漫风格
        color="#ec4899" // 玫红色强力背光，给模型勾勒出极其美丽的霓虹边缘光 (Rim Light)
        castShadow 
        shadow-mapSize={[2048, 2048]} 
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <group position={[1.5, 0, 0]}>
        <CampfireLight />
        
        {/* 注入你的真实模型 */}
        <CharacterModel />
        <CampfireModel />
        
        {/* 高质量草地 */}
        <RealisticGround />

        {/* 高度分层的真实火星物理系统 */}
        <CampfireSparkles />
      </group>

      {/* 真实的接触阴影，让场景更扎实 (平移至右侧 position x=1.5) */}
      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.6} far={10} color="#000000" position={[1.5, -0.99, 0]} />
      
      {/* 环境光反射（HDRI），给予你的模型更好的金属/皮肤光泽反射 */}
      <Environment preset="night" />
    </>
  );
}

export function DynamicBackground() {
  return (
    <div 
      className="fixed inset-0 z-0 pointer-events-auto"
      style={{
        background: "linear-gradient(135deg, #021e25 0%, #060212 40%, #1a010c 100%)"
      }}
    >
      {/* 
        这里在根容器上，注入了动漫电影级的青蓝色（左上）到极暗紫黑色（中），再到玫红色（右下）的超现实霓虹高饱和渐变。
        Canvas 此时背景为透明，令此 CSS 渐变作为天空底纹透上来。
        
        将 camera target 稍微往右平移（通过平移 camera position 的 x 轴和 OrbitControls target，
        或者直接通过 group 的 x 轴平移来让画面自然地偏移到屏幕右半部分）。
        这里我们将 camera 的 position 设为 [-2.5, 2, 6]，相比之前的 [-4, 2, 6] 略微右偏，
        并让整个场景的 group 往 x=1.5 移动，这样可以给左侧留出绝佳的空间来展示你的文字和 UI 菜单！
      */}
      <Canvas shadows="basic" camera={{ position: [-2.5, 2, 6], fov: 45 }}>
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
          target={[1.5, -0.5, 0]} // 让 OrbitControls 的旋转中心也对齐右偏的营火场景中心(1.5, -0.5, 0)
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/character.glb");
useGLTF.preload("/models/campfire.glb");
useGLTF.preload("/models/grass.glb");
