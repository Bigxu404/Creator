"use client";

import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center max-w-4xl pt-16"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60 mb-6 drop-shadow-sm">
          构建数字花园与极致软件
        </h1>
        <p className="text-xl md:text-2xl text-white/60 font-light tracking-wide mb-16 max-w-3xl mx-auto">
          你好，我是架构师 / 极客 / 全栈开发者。
          <br className="hidden md:block" />
          这里是我的 Personal OS 与思考沉淀空间。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
          <SectionCard title="创造 Crafts" desc="从 0 到 1 打造的完整级产品，探索技术的工程化落地。" delay={0.2} />
          <SectionCard title="履历 Work & Reports" desc="专业深度、系统架构报告与真实的职业沉淀。" delay={0.3} />
          <SectionCard title="探索 Explorations" desc="前沿技术的实验、开源贡献与视野扩展。" delay={0.4} />
          <SectionCard title="思考 Thoughts" desc="日常的深刻见解与碎片化信息的自动结晶。" delay={0.5} />
        </div>
      </motion.div>
    </main>
  );
}

function SectionCard({ title, desc, delay }: { title: string; desc: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className="p-8 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.08] hover:bg-white/[0.08] transition-all duration-300"
    >
      <h3 className="text-xl font-medium text-white mb-3">{title}</h3>
      <p className="text-sm text-white/60 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
