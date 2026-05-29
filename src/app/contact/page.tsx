"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [toast, setToast] = useState<string | null>(null);

  // 复制文字并显示 Toast 提示
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast("已复制，欢迎唠嗑");
      // 2秒后自动消失
      setTimeout(() => {
        setToast(null);
      }, 2000);
    } catch (err) {
      // 降级兼容旧版浏览器
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setToast("已复制，欢迎唠嗑");
        setTimeout(() => {
          setToast(null);
        }, 2000);
      } catch (e) {
        setToast("复制失败，请手动选择");
        setTimeout(() => {
          setToast(null);
        }, 2000);
      }
      document.body.removeChild(textArea);
    }
  };

  return (
    <main className="w-screen h-screen relative flex items-center justify-center pointer-events-none">
      {/* 
        全屏高雅模糊遮罩层 (Full-screen Cinematic Frosted Glass Overlay)：
        运镜趋于停下来时，全屏浮现 70% 透明度、深度毛玻璃雾化 (backdrop-blur-2xl) 的无缝灰色遮罩
      */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1.3, 
          ease: "easeInOut",
          delay: 0.1 
        }}
        className="absolute inset-0 pointer-events-auto flex items-center justify-center overflow-y-auto pt-20 pb-10"
      >
        <div className="max-w-[480px] w-full text-center space-y-8 px-6 select-none flex flex-col items-center">
          <div className="space-y-3">
            <span className="text-[10px] text-white/35 tracking-[0.4em] font-serif uppercase block">Contact Me</span>
            <h1 className="text-3xl font-light text-white tracking-[0.2em] font-serif">联系我</h1>
          </div>
          
          <p className="text-sm text-white/60 leading-loose tracking-[0.15em] font-light max-w-[380px]">
            很高兴在此处与你相遇。如果你对我的创造、我的思考或者我们的合作有任何兴趣，
            欢迎找我唠嗑。
          </p>

          <div className="w-8 h-px bg-white/10 mx-auto" />

          {/* 联系方式高华卡片版面 */}
          <div className="w-full space-y-4 text-left font-sans text-white/80">
            {/* 1. 手机卡片 */}
            <div className="flex items-center justify-between p-3.5 rounded-md border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-300 w-full group/item">
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] text-white/35 tracking-[0.15em] uppercase font-semibold select-none">
                  手机与微信 // Phone & WeChat
                </span>
                <span className="text-[13px] text-white/90 tracking-[0.08em] font-medium font-mono select-text selection:bg-sky-500/20 selection:text-sky-300">
                  17754830989 (微信同号)
                </span>
              </div>
              
              {/* 极其精致的复制按钮 (更改为高科技天空蓝色) */}
              <button
                onClick={() => handleCopy("17754830989")}
                className="py-1 px-2.5 rounded border border-white/10 hover:border-sky-500/30 text-[9px] text-white/40 group-hover/item:text-sky-400/80 group-hover/item:border-sky-500/10 hover:bg-sky-500/[0.03] transition-all duration-300 focus:outline-none tracking-widest uppercase"
                title="一键复制手机/微信号"
              >
                COPY ❏
              </button>
            </div>

            {/* 2. 邮箱卡片 */}
            <div className="flex items-center justify-between p-3.5 rounded-md border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-300 w-full group/item">
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] text-white/35 tracking-[0.15em] uppercase font-semibold select-none">
                  电子邮件 // Email
                </span>
                <span className="text-[13px] text-white/90 tracking-[0.08em] font-medium font-mono select-text selection:bg-sky-500/20 selection:text-sky-300">
                  1159370261@qq.com
                </span>
              </div>
              
              {/* 极其精致的复制按钮 (更改为高科技天空蓝色) */}
              <button
                onClick={() => handleCopy("1159370261@qq.com")}
                className="py-1 px-2.5 rounded border border-white/10 hover:border-sky-500/30 text-[9px] text-white/40 group-hover/item:text-sky-400/80 group-hover/item:border-sky-500/10 hover:bg-sky-500/[0.03] transition-all duration-300 focus:outline-none tracking-widest uppercase"
                title="一键复制邮箱地址"
              >
                COPY ❏
              </button>
            </div>

            {/* 3. 知乎卡片 */}
            <div className="flex items-center justify-between p-3.5 rounded-md border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-300 w-full group/item">
              <div className="flex flex-col space-y-1">
                <span className="text-[10px] text-white/35 tracking-[0.15em] uppercase font-semibold select-none">
                  知乎专栏 // Zhihu Profile
                </span>
                <span className="text-[13px] text-white/95 tracking-[0.08em] font-medium select-none">
                  点击去关注
                </span>
              </div>
              
              {/* 漂亮的跳转链接，更改为高科技天空蓝色 */}
              <a
                href="https://www.zhihu.com/people/wo-shi-ni-zhao-ge"
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded border border-sky-500/25 bg-sky-500/[0.02] text-[10px] text-sky-400 hover:text-sky-300 group-hover/item:border-sky-500/50 hover:bg-sky-500/[0.05] transition-all duration-300 focus:outline-none tracking-widest uppercase font-semibold shadow-[0_0_10px_rgba(14,165,233,0.01)] hover:shadow-[0_0_15px_rgba(14,165,233,0.06)]"
                title="新窗口打开知乎主页"
              >
                GO ↗
              </a>
            </div>
          </div>

          <div className="w-8 h-px bg-white/10 pt-2" />
          
          <div className="text-[10px] text-white/20 tracking-[0.3em] font-serif uppercase">
            E-MAIL // SOCIALS // TELEGRAM
          </div>
        </div>
      </motion.div>

      {/* 高端悬浮 Toast 通知 (微磨砂、带有阻尼回弹动效的精致 “生命力翠绿色” 提示) */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-12 z-50 py-2.5 px-5 rounded bg-black/85 border border-emerald-500/20 text-emerald-400 text-xs font-sans tracking-[0.15em] font-medium backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5),_0_0_20px_rgba(16,185,129,0.08)] flex items-center space-x-2 select-none"
          >
            {/* 翠绿色能量微标志 */}
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
