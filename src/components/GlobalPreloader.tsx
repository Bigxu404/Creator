"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@react-three/drei";

export function GlobalPreloader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 核心性能优化：在加载页还在运行期间，利用浏览器空闲/并行网络通道，提前静默预下载全站所有的重磅图片
    const criticalImages = [
      "/neofeed封面.webp",
      "/trae-solo-ide.webp",
      "/systemprompt-debug-1.webp",
      "/systemprompt-debug-2.webp",
      "/benchmark-test.webp",
      "/alice-gen-1779610342651.webp",
      "/AI聊文档-解构与思考.webp",
      "/独立产品分享Weave：解决你的AI信息焦虑.webp",
      "/提效思路.webp",
      "/alice-gen-1779294916502.webp",
      "/alice-gen-1779295412219.webp"
    ];

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  if (!mounted) {
    // SSR 期间及首次客户端渲染，渲染纯黑背景，完美遮罩全站内容，防止内容闪烁或加载不全穿帮
    return (
      <div className="fixed inset-0 z-[9999] bg-[#030303]" />
    );
  }

  return <ActualPreloader />;
}

function ActualPreloader() {
  const { active, progress, total } = useProgress();
  const [showLoader, setShowLoader] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // 当没有正在加载的资源，且加载进度达到 100% 或当前无需加载任何资源 (total === 0) 时触发淡出
    if (!active && (progress === 100 || total === 0)) {
      // 稍作延迟，保障 Three.js 材质、着色器编译就绪，达到极致顺畅的无缝淡入效果
      const timer = setTimeout(() => setShowLoader(false), 850);
      return () => clearTimeout(timer);
    }
  }, [active, progress, total]);

  // 安全时间触发隐藏
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setShowLoader(false);
    }, 6000);
    return () => clearTimeout(safetyTimer);
  }, []);

  // 卸载延迟，给 CSS 渐变动画留出富余时间
  useEffect(() => {
    if (!showLoader) {
      const timer = setTimeout(() => setShouldRender(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [showLoader]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303] select-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        showLoader ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* 氛围暖色缓动微光，给暗黑屏体增加人文呼吸感 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] bg-amber-500/[0.04] rounded-full blur-[110px] pointer-events-none" />

      <div className="flex flex-col items-center space-y-8 text-center max-w-[360px] px-6 relative z-10">
        {/* 顶层美学标志 */}
        <span className="text-[10px] text-white/20 tracking-[0.35em] uppercase font-serif block pl-[0.35em]">
          3D Atmosphere // 营地宇宙
        </span>
        
        {/* 极简数字加载进度 */}
        <h1 className="text-4xl md:text-5xl font-extralight font-serif text-white/95 tracking-[0.1em] pl-[0.1em] leading-none">
          {Math.round(progress)}%
        </h1>

        {/* 优雅的高级感进度条 */}
        <div className="w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* 人文提示 */}
        <div className="flex flex-col items-center">
          <p className="text-[9px] text-white/30 tracking-[0.18em] font-light leading-relaxed pl-[0.18em]">
            三维慢思考宇宙正在解压载入...<br/>
            建议配戴耳机以获得最佳声学沉浸体验
          </p>
        </div>
      </div>
    </div>
  );
}
