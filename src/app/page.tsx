"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  // Staggered entry animation variants for a cinematic feel
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Stagger each paragraph by 250ms
        delayChildren: 0.3,    // Delay initial fade by 300ms for loading smoothness
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 24,
      }
    }
  };

  return (
    <main className="w-screen h-screen relative flex items-start justify-start pl-6 md:pl-16 pt-[120px] md:pt-[200px] pointer-events-none">
      {/* 
        高定主页文字介绍：
        完美的极简主义排版，与左上角的导航栏在 X 轴上绝对对齐。
        使用优雅的行高 (leading-loose)、加宽的字间距 (tracking-widest) 
        以及柔和的微弱透明度 (text-white/65)，让字里行间流露出极其高级、温润的人文气息。
      */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-[90%] md:max-w-[480px] space-y-5 md:space-y-6 pointer-events-auto select-none"
      >
        <motion.p 
          variants={itemVariants} 
          className="text-sm text-white/70 font-light leading-loose tracking-widest"
        >
          Hi，你好
        </motion.p>
        
        <motion.p 
          variants={itemVariants} 
          className="text-sm text-white/70 font-light leading-loose tracking-widest"
        >
          这里有
          <Link 
            href="/experience" 
            className="text-sky-400 hover:text-sky-300 transition-colors duration-300 cursor-pointer font-medium"
          >
            完整的工作经历与表述
          </Link>
          ，
        </motion.p>
        
        <motion.p 
          variants={itemVariants} 
          className="text-sm text-white/70 font-light leading-loose tracking-widest"
        >
          以及一些
          <Link 
            href="/works" 
            className="text-sky-400 hover:text-sky-300 transition-colors duration-300 cursor-pointer font-medium"
          >
            作品
          </Link>
          ，
        </motion.p>
        
        <motion.p 
          variants={itemVariants} 
          className="text-sm text-white/70 font-light leading-loose tracking-widest pt-2"
        >
          感谢访问
        </motion.p>

        {/* 
          哲学底色宣言：萨特的让-保罗·萨特存在主义核心命题
          "L'existence précède l'essence"（存在先于本质）
          在 Times New Roman 斜体 (italic font-serif) 的微缩排版下，
          呈现出有如欧洲哲学手稿扉页般的至臻高级质感。
        */}
        <motion.p 
          variants={itemVariants} 
          className="text-xs text-white/35 italic font-serif tracking-widest pt-6 border-t border-white/5 max-w-[200px]"
        >
          {"L'existence précède l'essence."}
        </motion.p>
      </motion.div>
    </main>
  );
}
