"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

export function GlobalPreloader() {
  const { active, progress } = useProgress();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!active && progress === 100) {
      // 稍作延迟，保障 Three.js 材质、着色器编译就绪，达到极致顺畅的无缝淡入效果
      const timer = setTimeout(() => setShowLoader(false), 800);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

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

            {/* 人文提示字样 */}
            <p className="text-[9px] text-white/30 tracking-[0.18em] font-light leading-relaxed pl-[0.18em]">
              三维慢思考宇宙正在解压载入...<br/>
              建议配戴耳机以获得最佳声学沉浸体验
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
