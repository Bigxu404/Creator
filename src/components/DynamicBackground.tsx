"use client";

import Image from "next/image";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePathname } from "next/navigation";

export function DynamicBackground() {
  const pathname = usePathname();
  const isSubpage = pathname !== "/";

  // 视差效果：使用 spring 物理阻尼动画，确保鼠标视差极其丝滑、温润，没有丝毫抖动
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 45, damping: 25, mass: 1.2 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 计算鼠标相对于屏幕中心的位置百分比
      const { innerWidth: width, innerHeight: height } = window;
      const targetX = (e.clientX - width / 2) / (width / 2);
      const targetY = (e.clientY - height / 2) / (height / 2);
      
      // 控制微弱的视差幅度（最大移动 15px），防止晃眼且确保边缘不会穿帮
      mouseX.set(targetX * -15);
      mouseY.set(targetY * -15);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black select-none pointer-events-none">
      {/* 
        视差背景图片：稍微放大（scale 稍微超出），防止在视差平移时露出边缘黑边。
        使用 next/image 并配置 priority={true} 开启最高优先级首屏预加载，彻底解决白屏等待。
      */}
      <motion.div 
        className="absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)]"
        style={{ x, y }}
      >
        <Image
          src="/pexels-matteobasilephoto-14719432.jpg"
          alt="Background"
          fill
          priority
          unoptimized
          className="object-cover opacity-85 filter saturate-[0.95] contrast-[1.02]"
        />
      </motion.div>

      {/* 
        高级氛围遮罩层：
        1. 径向渐变（Radial Gradient）：四周向中心变暗，营造如莱卡/哈苏镜头般的暗角（Vignette）边缘，锁死视觉焦点。
        2. 基础暗色蒙层：微弱压暗画面，既展现图片原本的精美光影，又保障主文字、文章内容的高可读性。
      */}
      <div 
        className="absolute inset-0 bg-[#030303]/15" 
        style={{
          backgroundImage: "radial-gradient(circle at 50% 50%, rgba(3, 3, 3, 0) 0%, rgba(3, 3, 3, 0.55) 100%)"
        }}
      />

      {/* 
        全局子页背景模糊层：
        将原先分散在各子页、重复且极其消耗 GPU 算力的 backdrop-blur-2xl 提取到全局底层。
        当切换页面时，该模糊层常驻不卸载，只有最浅层的 HTML 文本进行淡入和平移动画。
        这极大减轻了图形合成器的图层重绘开销，让站内跳转瞬间拉满至 120fps！
      */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSubpage 
            ? "bg-[#0d0d0d]/35 backdrop-blur-xl opacity-100" 
            : "bg-transparent backdrop-blur-none opacity-0 pointer-events-none"
        }`}
      />
    </div>
  );
}
