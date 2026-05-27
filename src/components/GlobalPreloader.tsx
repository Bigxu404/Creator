"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

export function GlobalPreloader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  useEffect(() => {
    // 当没有正在加载的资源，且加载进度达到 100% 或当前无需加载任何资源 (total === 0) 时触发淡出
    if (!active && (progress === 100 || total === 0)) {
      // 稍作延迟，保障 Three.js 材质、着色器编译就绪，达到极致顺畅的无缝淡入效果
      const timer = setTimeout(() => setShowLoader(false), 850);
      return () => clearTimeout(timer);
    }
  }, [active, progress, total]);

  // 安全兜底定时器 (Safety Timeout)：
  // 如果在极端恶劣网络或 Draco 解码器加载失败等无法预测的情况下，6 秒后自动解锁并淡出，
  // 确保网站内容 100% 始终对用户可达，绝对不会发生卡死在 0% 的黑屏阻塞。
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      setShowLoader(false);
    }, 6000);
    return () => clearTimeout(safetyTimer);
  }, []);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#030303] select-none pointer-events-auto"
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

            {/* 极细像素级进度条 */}
            <div className="w-[140px] h-[1px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div 
                className="h-full bg-amber-500/40 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>

            {/* 人文提示与直接跳过按钮 */}
            <div className="flex flex-col items-center space-y-5">
              <p className="text-[9px] text-white/30 tracking-[0.18em] font-light leading-relaxed pl-[0.18em]">
                三维慢思考宇宙正在解压载入...<br/>
                建议配戴耳机以获得最佳声学沉浸体验
              </p>

              {/* 优雅的一键跳过直接进入选项 */}
              <button
                onClick={() => setShowLoader(false)}
                className="text-[9px] text-amber-500/35 hover:text-amber-500/80 tracking-[0.2em] transition-colors duration-300 cursor-pointer focus:outline-none uppercase font-serif pt-1 pl-[0.2em]"
                title="无需等待 3D，直接进入网站阅读内容"
              >
                [ Skip to Text Mode // 直接进入 ]
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
