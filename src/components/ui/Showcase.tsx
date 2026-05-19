"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { BrainCircuit, Globe, Zap, Database, ArrowRight, Layers } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <BrainCircuit className="w-6 h-6" />,
    title: "Agent Memory",
    description: "Built on the MCP protocol, empowering AI agents with persistent, context-aware memory for continuous evolution.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Web Asset Curation",
    description: "Seamlessly captures and organizes web assets, creating a personalized knowledge graph tailored to your explorations.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Zero-Management",
    description: "Automated information crystallization. Ideas and data are synthesized without manual intervention.",
  },
];

export function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div ref={containerRef} className="relative bg-black text-white min-h-[300vh]">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[150px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-white/5 blur-[150px]" />
      </div>

      {/* Hero Section */}
      <motion.section
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="sticky top-0 h-screen flex flex-col items-center justify-center text-center px-4 z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glow-effect"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-6">
            NeoFeed
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto font-light tracking-wide">
            The Context Intersection Hub. <br className="hidden md:block" />
            Where your thoughts crystallize.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute bottom-12 flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-sm tracking-widest uppercase">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="relative z-10 min-h-screen py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">Core Philosophy</h2>
          <p className="text-white/50 text-lg max-w-xl">
            Designed as a high-fidelity cognitive extension. NeoFeed acts as the invisible bridge between your explorations and your digital garden.
          </p>
        </motion.div>

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
              <p className="text-white/50 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Architecture / Future Integration Section */}
      <section className="relative z-10 min-h-screen py-32 px-6 md:px-12 max-w-7xl mx-auto flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">The OS Backend</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            NeoFeed doesn't just collect data—it actively drives this Digital Garden. 
            Slow thoughts are captured via MCP and dynamically rendered into the Thoughts stream.
          </p>
        </motion.div>

        <div className="w-full max-w-5xl relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 p-12 rounded-3xl border border-white/[0.05] bg-white/[0.01] backdrop-blur-sm overflow-hidden">
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

          <Node icon={<Globe />} title="Web Assets" subtitle="Raw Inputs" delay={0} />
          <PathArrow />
          <Node icon={<Layers />} title="NeoFeed MCP" subtitle="Processing Engine" delay={0.2} highlighted />
          <PathArrow />
          <Node icon={<Database />} title="Personal OS" subtitle="Digital Garden" delay={0.4} />
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
        "relative z-10 flex flex-col items-center justify-center p-8 rounded-2xl border backdrop-blur-md w-64 text-center transition-all duration-500",
        highlighted 
          ? "border-white/20 bg-white/[0.05] shadow-[0_0_40px_rgba(255,255,255,0.1)]" 
          : "border-white/[0.05] bg-black/50"
      )}
    >
      <div className={cn(
        "w-16 h-16 rounded-full flex items-center justify-center mb-4",
        highlighted ? "bg-white text-black" : "bg-white/10 text-white"
      )}>
        {icon}
      </div>
      <h4 className="text-xl font-medium mb-1">{title}</h4>
      <p className="text-sm text-white/40">{subtitle}</p>
    </motion.div>
  );
}

function PathArrow() {
  return (
    <div className="hidden md:flex relative z-10 text-white/20 items-center justify-center w-16">
      <motion.div
        animate={{ x: [0, 10, 0], opacity: [0.2, 1, 0.2] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <ArrowRight className="w-8 h-8" />
      </motion.div>
    </div>
  );
}
