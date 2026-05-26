"use client";

import { motion } from "framer-motion";

export default function BlogPage() {
  return (
    <main className="w-full h-screen overflow-y-auto relative pointer-events-auto bg-transparent">
      {/* 针对 Webkit 浏览器隐藏滚动条 */}
      <style jsx global>{`
        div::-webkit-scrollbar, main::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>

      {/* 
        全屏高雅模糊遮罩层 (Full-screen Cinematic Frosted Glass Overlay)：
        运镜趋于停下来时，全屏浮现 70% 透明度、深度毛玻璃雾化 (backdrop-blur-2xl) 的无缝灰色遮罩
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.8,
          ease: "easeInOut",
          delay: 0.45
        }}
        className="w-full min-h-screen bg-[#0d0d0d]/70 backdrop-blur-2xl flex flex-col items-center justify-start pt-24 md:pt-36 pb-24 space-y-12 md:space-y-16"
      >
        {/* 文字板块：置于上方，参考经历（Experience）和作品集（Works）页面的黄金版式 */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-5 w-full max-w-[840px] px-6 select-none">
          <span className="text-[10px] md:text-xs text-white/20 tracking-[0.25em] pl-[0.25em] font-serif uppercase block">
            Thoughts // Essays
          </span>
          <span className="text-sm md:text-base text-white/60 tracking-[0.15em] pl-[0.15em] font-medium block">
            我的 独立站
          </span>
          <h3 className="text-2xl md:text-3xl text-white font-serif font-semibold tracking-[0.15em] pl-[0.15em] leading-relaxed">
            我的博客独立建站了，也欢迎来访问
          </h3>
        </div>

        {/* 博客大封面图容器：置于文字板块正下方，采用作品集/工作经历的 1120px 黄金尺寸，霸气大气 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1], // Apple 级别的减速动效
            delay: 0.7
          }}
          className="w-full max-w-[1120px] px-6 md:px-12 select-none"
        >
          {/* 配以极其微妙、高质感的细白框、磨砂底板和阴影效果，让封面在大气展示的同时，融入极简数字画卷的质感 */}
          <a 
            href="https://www.goodxu.cn" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block w-full focus:outline-none relative cursor-pointer"
          >
            <div className="w-full overflow-hidden rounded-lg border border-sky-500/20 bg-white/[0.01] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),_0_0_60px_rgba(14,165,233,0.12)] group-hover:border-sky-500/60 group-hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),_0_0_95px_rgba(14,165,233,0.48),_0_0_35px_rgba(14,165,233,0.25)] transition-all duration-700 relative">
              <img 
                src="/我的博客.webp" 
                alt="我的博客 封面" 
                className="w-full h-auto object-contain opacity-100 transition-opacity duration-700"
              />
            </div>
          </a>
        </motion.div>

        {/* 博客展示图 2：置于首图下方，呈现深度建站的高端平铺 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.85
          }}
          className="w-full max-w-[1120px] px-6 md:px-12 select-none"
        >
          <a 
            href="https://www.goodxu.cn" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block w-full focus:outline-none relative cursor-pointer"
          >
            <div className="w-full overflow-hidden rounded-lg border border-white/[0.04] bg-white/[0.01] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] group-hover:border-white/10 group-hover:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] transition-all duration-700 relative">
              <img 
                src="/blog2.webp" 
                alt="博客展示 2" 
                className="w-full h-auto object-contain opacity-95 group-hover:opacity-100 transition-all duration-700"
              />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}
