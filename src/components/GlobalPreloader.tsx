"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function GlobalPreloader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // 核心性能优化：在加载页短暂闪现期间，利用浏览器空闲通道，提前静默预下载全站重要的图片
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
  const [progress, setProgress] = useState(0);
  const [showLoader, setShowLoader] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // 模拟极致顺滑的、电影级的开场进度条加载（450ms 黄金加载耗时，极致提速）
    let startTimestamp: number | null = null;
    const duration = 450; // 450毫秒完成 0 -> 100 的飞跃
    let animFrameId: number;
    let timerId: NodeJS.Timeout;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const progressRatio = Math.min(elapsed / duration, 1);
      
      // 使用三次方缓动曲线（EaseOutCubic），让数字具有自然惯性，越到后面越慢，从而显得极其丝滑有机
      const easeProgress = 1 - Math.pow(1 - progressRatio, 3);
      setProgress(easeProgress * 100);

      if (progressRatio < 1) {
        animFrameId = requestAnimationFrame(step);
      } else {
        // 加载完成，稍作延迟，保障页面首屏图片渲染，达到极致顺畅的无缝淡入效果
        timerId = setTimeout(() => setShowLoader(false), 200);
      }
    };

    animFrameId = requestAnimationFrame(step);

    // 🌟 兜底安全锁 (Fail-safe)：无论 requestAnimationFrame 是否被 Safari 挂起、节流或处于后台，
    // 都在 800ms 后强制完成加载并关闭 Preloader，确保用户 100% 能够看到网页内容！
    const failSafeTimer = setTimeout(() => {
      setProgress(100);
      setShowLoader(false);
    }, 800);

    return () => {
      cancelAnimationFrame(animFrameId);
      if (timerId) clearTimeout(timerId);
      clearTimeout(failSafeTimer);
    };
  }, []);

  // 卸载延迟，给 CSS 渐变动画留出富余时间
  useEffect(() => {
    if (!showLoader) {
      const timer = setTimeout(() => setShouldRender(false), 1000);
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
        <span className="text-[10px] text-white/20 tracking-[0.35em] uppercase font-serif block pl-[0.35em] select-none">
          Xu的作品集
        </span>
        
        {/* 极简数字加载进度与动态提示 */}
        <div className="space-y-2 select-none">
          <h1 className="text-4xl md:text-5xl font-extralight font-serif text-white/95 tracking-[0.1em] pl-[0.1em] leading-none">
            {Math.round(progress)}%
          </h1>
          <span className="text-[9px] text-amber-500/50 tracking-[0.2em] uppercase font-serif block pl-[0.2em] animate-pulse">
            全力加载中...
          </span>
        </div>

        {/* 优雅的高级感进度条 */}
        <div className="w-[200px] h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.05, ease: "easeOut" }}
          />
        </div>

        {/* 人文提示 */}
        <div className="flex flex-col items-center select-none">
          <p className="text-[9px] text-white/30 tracking-[0.18em] font-light leading-relaxed pl-[0.18em]">
            内容包含较多的文档、链接、图片，需要加载会～
          </p>
        </div>
      </div>
    </div>
  );
}
