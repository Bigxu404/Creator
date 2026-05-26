"use client";

import { motion, AnimatePresence } from "framer-motion";
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
import { Suspense, useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { usePathname } from "next/navigation";

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
      rotation={[0, 0, 0]} // 面向正前方，直面眼前的篝火（因为篝火被放置在 position={[0, -1.02, 1.5]}，即人物的正前方 Z 轴方向）
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
          让人（坐高y=-1） and 篝火（y=-1.02）能够完美、极其稳定、平滑地贴在巨大行星的地表最顶端。
          
          根据反馈，草地过于奇怪，这里将草地材质全部重构为极具科幻感、带有哑光高级质感的【灰色微型天体碎石表面】。
          灰色表面能够更高级地反衬营火暖光的红色与夜空的青蓝色，呈现极致干净冷冽的格调！
        */}
        <sphereGeometry args={[12, 128, 128]} />
        <meshStandardMaterial 
          color="#1e1e1e" // 稍微更暗沉、有分量的太空深灰色
          roughness={0.82} // 大幅提高粗糙度 (0.4 -> 0.82)，使其极其粗糙、不光滑，完美展现干燥砂砾的颗粒漫反射
          metalness={0.05} // 降低金属度 (0.2 -> 0.05)，使其回归非金属的干燥星体石质表面
        />
      </mesh>
      
      {/* 随机散落的碎石和萤火虫（让地表充满细节） */}
      <group position={[0, 0, 0]}>
        {/* 周围的杂草堆 - 已经全部剔除，替换为低多边形小碎石以完美契合灰色太空星球 */}
        <mesh position={[-0.8, 0.05, -0.3]} castShadow>
          <dodecahedronGeometry args={[0.06, 0]} />
          <meshStandardMaterial color="#555555" roughness={0.8} />
        </mesh>
        <mesh position={[-0.7, 0.08, -0.4]} castShadow>
          <dodecahedronGeometry args={[0.05, 0]} />
          <meshStandardMaterial color="#666666" roughness={0.8} />
        </mesh>
        <mesh position={[-1.2, 0.06, 0.2]} castShadow>
          <dodecahedronGeometry args={[0.06, 0]} />
          <meshStandardMaterial color="#555555" roughness={0.8} />
        </mesh>

        {/* 散落在各处的灰色、黑褐色的鹅卵石 */}
        <mesh position={[1.4, 0.05, -0.8]} castShadow>
          <dodecahedronGeometry args={[0.12, 0]} />
          <meshStandardMaterial color="#777777" roughness={0.7} />
        </mesh>
        <mesh position={[-1.6, 0.03, 0.5]} castShadow>
          <dodecahedronGeometry args={[0.08, 0]} />
          <meshStandardMaterial color="#666666" roughness={0.7} />
        </mesh>
        <mesh position={[0.3, 0.04, 2.5]} castShadow>
          <dodecahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="#888888" roughness={0.7} />
        </mesh>

        {/* 局部的低空温情萤火虫：在草丛 and 篝火旁极其微弱缓慢地飘动 */}
        <Sparkles count={35} scale={[6, 1.5, 6]} size={1.8} speed={0.2} opacity={0.6} color="#bef264" position={[0, 0.4, 0.5]} noise={2} />
      </group>
    </group>
  );
}

// 摄像机镜头三维运动管理系统 (Camera Rig Component)
function CameraRig() {
  const pathname = usePathname();
  
  // 定义不同路由下的 3D 摄像机【目标位置(Position)】与【对焦标靶(Target)】
  // 注意：因为场景整体向右平移了 2.5 米 (group position={[2.5, 0, 0]})，
  // 我们的对焦目标和摄像机 X 轴应该同步融入 2.5 的偏移，以维持精确的三维透视！
  const rigConfig: Record<string, { pos: [number, number, number]; target: [number, number, number] }> = {
    "/": {
      // 首页：广阔远景，从斜上方俯瞰
      pos: [2.5 - 3.0, 1.8, 6.2], 
      target: [2.5, -0.5, 0]
    },
    "/about": {
      // 关于我：近距离观测，镜头降到人物斜右前方，对焦人物侧脸
      pos: [2.5 + 1.2, 0.4, 2.8],
      target: [2.5, -0.2, 0.1]
    },
    "/experience": {
      // 工作经历：中景观测，镜头移至人物左前方，平视对焦营火及人物轮廓
      pos: [2.5 - 1.2, 0.8, 3.2],
      target: [2.5, -0.1, 1.2]
    },
    "/works": {
      // 作品集：飞升至正上方进行俯瞰（建筑规划视角）
      pos: [2.5, 5.2, 2.5],
      target: [2.5, -0.8, 1.0]
    },
    "/blog": {
      // 随笔：人影背后低角度逆光，面向深空
      pos: [2.5 - 0.2, 0.2, -3.2],
      target: [2.5, 0.4, 3.5]
    },
    "/contact": {
      // 联系我：贴近地表的温暖平视，营火在近前景虚化
      pos: [2.5 - 1.8, 0.5, 3.2],
      target: [2.5, -0.2, 1.5]
    }
  };

  // 兜底配置（防止路径不匹配）
  const currentRig = rigConfig[pathname] || rigConfig["/"];

  useFrame((state) => {
    // 1. 每帧对摄像机的位置进行阻尼插值平滑移动 (Camera Position Lerp)
    state.camera.position.lerp(
      new THREE.Vector3(currentRig.pos[0], currentRig.pos[1], currentRig.pos[2]),
      0.045 // 阻尼系数：数值越小运镜越丝滑柔和、充满胶片级重量感 (4.5% interpolation per frame)
    );

    // 2. 每帧对 OrbitControls 的 Target 进行阻尼插值平滑对焦 (Orbit Target Lerp)
    // 这样不仅摄像机在飞，连旋转轴心、对焦中心也会行云流水地平滑漂移！
    if (state.controls) {
      const controls = state.controls as any;
      
      // 创建临时向量进行 Target 的插值
      const tempTarget = new THREE.Vector3(currentRig.target[0], currentRig.target[1], currentRig.target[2]);
      controls.target.lerp(tempTarget, 0.045);
      
      // 更新控制器的内部矩阵
      controls.update();
    }
  });

  return null;
}

function Scene() {
  return (
    <>
      {/* 
        将天空背景颜色重构为绝对纯正的深黑色。
        天空中重新散落晶莹、干净的 3D 星辰，给沉静的夜空注入无限的奥秘与点点微光。
      */}
      <group rotation={[Math.PI / 10, Math.PI / 5, 0]}>
        {/* 精致莹润的漫天 3D 星辰：高密度、大小分层，在深黑背景下宛如钻石屑般静静闪烁 */}
        <Stars radius={140} depth={60} count={6000} factor={3} saturation={0} fade speed={1.2} />
        <Stars radius={90} depth={40} count={2000} factor={5} saturation={0.1} fade speed={0.8} />
        
        {/* 极弱、几乎不可见的温润深空云海粒子，给星空增加一丝极具深度的物理折射与朦胧感 */}
        <Sparkles count={40} scale={[45, 45, 45]} size={2} speed={0.03} opacity={0.35} color="#e0e7ff" position={[0, 5, -20]} />
      </group>
      
      {/* 
        在天幕深处、极远处，加入几颗精致漂浮的【3D 悬浮小行星 (Distant Planets/Asteroids)】：
        利用 low-poly 多面体结合极其缓慢的浮动和旋转，营造宏大的天体宇宙纵深感。
      */}
      <group>
        {/* 远处小行星 1号：悬浮在左侧偏上 */}
        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.3} position={[-6, 4, -8]}>
          <mesh castShadow receiveShadow>
            <dodecahedronGeometry args={[0.5, 1]} /> {/* 使用更复杂的十二面体裂变球体 */}
            <meshStandardMaterial color="#2d2d2d" roughness={0.9} metalness={0.1} />
          </mesh>
        </Float>
        
        {/* 远处小行星 2号：悬浮在中间偏远背景 */}
        <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.2} position={[2, 5, -12]}>
          <mesh castShadow receiveShadow>
            <dodecahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.95} />
          </mesh>
        </Float>

        {/* 远处小行星 3号：小型的悬浮碎星 */}
        <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.4} position={[-2, 6, -10]}>
          <mesh castShadow receiveShadow>
            <dodecahedronGeometry args={[0.18, 0]} />
            <meshStandardMaterial color="#242424" roughness={0.92} />
          </mesh>
        </Float>
      </group>
      
      {/* 极夜环境光照 - 稍微提亮，融入极其高雅的深空浅紫微光 */}
      <ambientLight intensity={0.12} color="#f5f3ff" />
      
      {/* 模拟从高空打下的银白色冷白月光（完美取代之前的霓虹玫红色强背光，契合高雅沉静的纯黑夜空） */}
      <directionalLight 
        position={[-12, 18, -8]} 
        intensity={0.45} 
        color="#e2e8f0" // 银白色冷调月光，给模型勾勒出高档冷冽的边缘物理高光
        castShadow 
        shadow-mapSize={[2048, 2048]} 
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      <group position={[2.5, 0, 0]}>
        <CampfireLight />
        
        {/* 注入你的真实模型 */}
        <CharacterModel />
        <CampfireModel />
        
        {/* 高质量草地 */}
        <RealisticGround />

        {/* 高度分层的真实火星物理系统 */}
        <CampfireSparkles />
      </group>

      {/* 真实的接触阴影，已迁移合并在 3D 场景 Group 内部定位，这里废弃避免生成怪异的重叠黑横截面 */}
      
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
        background: "#030303" // 彻底还原纯粹、干净、空灵的黑色夜空背景
      }}
    >
      <Canvas shadows="basic" camera={{ position: [-0.5, 1.8, 6.2], fov: 45 }}>
        {/* 注入三维运镜轨道管理系统，让 Tab 的切换完美自动联动镜头转换！ */}
        <CameraRig />
        
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
          // 移除硬编码的静态 target={[2.5, -0.5, 0]}，让 CameraRig 完全动态接管接力，从而使运镜插值生效！
        />
      </Canvas>
    </div>
  );
}

useGLTF.preload("/models/character.glb");
useGLTF.preload("/models/campfire.glb");
