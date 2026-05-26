"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BrainCircuit, Globe, Zap, Database, ArrowRight, Layers } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    title: "Agent 记忆中枢",
    description: "基于 MCP 协议构建，赋予 AI Agent 持久化且感知上下文的记忆能力，实现持续进化。",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "网页资产沉淀",
    description: "无缝捕获与组织网络资产（Web Assets），为你量身打造专属的结构化知识图谱。",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "零管理自动结晶",
    description: "信息结晶过程全自动化，无需人工干预即可完成创意和数据的清洗与综合。",
  },
];

export function NeoFeedShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative bg-transparent text-white py-24">
      {/* Hero Section */}
      <motion.section
        className="flex flex-col items-center justify-center text-center px-4 z-10 mb-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glow-effect relative"
        >
          <div className="inline-flex items-center justify-center px-3 py-1 mb-6 text-xs font-medium rounded-full bg-white/10 border border-white/20 text-white/80">
            Featured Craft // context
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-6 font-serif">
            NeoFeed
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto font-light tracking-wide leading-relaxed">
            全域上下文中心 (Context Intersection Hub) <br />
            让碎片化的慢思考在这里自动结晶。
          </p>

          <div className="pt-8 flex justify-center">
            <a 
              href="https://www.neofeed.cn/landing" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative flex items-center justify-center py-3 px-8 rounded border border-amber-500/25 bg-amber-500/[0.02] text-amber-400 text-xs font-semibold tracking-[0.25em] focus:outline-none transition-all duration-500 shadow-[0_0_15px_rgba(245,158,11,0.02)] hover:shadow-[0_0_20px_rgba(245,158,11,0.08)] hover:border-amber-500/50 hover:bg-amber-500/[0.04]"
            >
              {/* 慢速呼吸流光微特效 */}
              <span className="absolute inset-0 w-full h-full rounded bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              <span>探索 NeoFeed 官网 ↗</span>
            </a>
          </div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-medium mb-3">{feature.title}</h3>
              <p className="text-white/50 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture / Future Integration Section */}
      <section className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">作为系统的底层 Backend</h2>
          <p className="text-white/50 text-base max-w-2xl mx-auto">
            NeoFeed 不仅仅是一个孤立的产品，它直接通过 MCP 驱动这个数字花园的 <span className="text-white">Thoughts 思考流</span>。
          </p>
        </motion.div>

        <div className="w-full max-w-4xl relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 p-8 md:p-12 rounded-3xl border border-white/[0.05] bg-white/[0.01] backdrop-blur-sm overflow-hidden">
          {/* Animated data lines */}
          <div className="absolute inset-0 z-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="50%" x2="100%" y2="50%" stroke="url(#gradient)" strokeWidth="1" strokeDasharray="4 4" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <Node icon={<Globe />} title="网页资产" subtitle="信息的原始捕获" delay={0} />
          <PathArrow />
          <Node icon={<Layers />} title="NeoFeed MCP" subtitle="引擎处理与归档" delay={0.2} highlighted />
          <PathArrow />
          <Node icon={<Database />} title="Personal OS" subtitle="渲染至数字花园" delay={0.4} />
        </div>
      </section>
    </div>
  );
}

function Node({ icon, title, subtitle, delay, highlighted = false }: { icon: React.ReactNode, title: string, subtitle: string, delay: number, highlighted?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className={cn(
        "relative z-10 flex flex-col items-center justify-center p-6 rounded-2xl border backdrop-blur-md w-48 text-center transition-all duration-500",
        highlighted 
          ? "border-white/20 bg-white/[0.05] shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
          : "border-white/[0.05] bg-black/50"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-full flex items-center justify-center mb-4",
        highlighted ? "bg-white text-black" : "bg-white/10 text-white"
      )}>
        {icon}
      </div>
      <h4 className="text-lg font-medium mb-1">{title}</h4>
      <p className="text-xs text-white/40">{subtitle}</p>
    </motion.div>
  );
}

function PathArrow() {
  return (
    <div className="hidden md:flex relative z-10 text-white/20 items-center justify-center w-12">
      <motion.div
        animate={{ x: [0, 8, 0], opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ArrowRight className="w-6 h-6" />
      </motion.div>
    </div>
  );
}
