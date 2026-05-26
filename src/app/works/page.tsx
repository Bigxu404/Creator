"use client";

import { motion } from "framer-motion";
import { 
  BrainCircuit, 
  Globe, 
  Zap, 
  Database, 
  ArrowRight, 
  ArrowDown, 
  Check, 
  Workflow, 
  Quote, 
  Cpu, 
  FileCode, 
  Sparkles,
  RefreshCw,
  FolderOpen,
  Terminal
} from "lucide-react";

export default function WorksPage() {
  return (
    <main className="w-screen h-screen relative flex items-center justify-center pointer-events-none">

      {/* 全屏电影级 70% 深度毛玻璃遮罩层 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: "easeInOut",
          delay: 0.45 
        }}
        className="absolute inset-0 bg-[#0d0d0d]/70 backdrop-blur-2xl pointer-events-auto flex items-center justify-center"
      >
        <div className="max-w-6xl w-full h-[75vh] px-8 md:px-12 mx-auto relative pt-14">
          {/* 右侧巨幅内容滚动视窗 (Works Tab Layout) */}
          <div 
            className="w-full h-full overflow-y-auto overflow-x-hidden pr-2 space-y-16 scroll-smooth pb-[25vh] hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
          >

            {/* ========================================================================= */}
            {/* HERO SECTION / 首屏主视觉 */}
            {/* ========================================================================= */}
            <section className="flex flex-col items-center justify-center w-full px-6 select-none relative pt-8 md:pt-12 pb-16 md:pb-20 border-b border-white/[0.03]">
              <div className="w-full flex flex-col items-center text-center space-y-5 md:space-y-6 max-w-[840px]">
                <span className="text-[10px] md:text-xs text-amber-500/60 tracking-[0.25em] pl-[0.25em] font-serif uppercase block">
                  Core Craft // NeoFeed Case Study
                </span>
                <span className="text-sm md:text-base text-white/60 tracking-[0.15em] pl-[0.15em] font-medium block">
                  我的 Coding 作品
                </span>
                <h3 className="text-2xl md:text-3xl text-white font-serif font-semibold tracking-[0.15em] pl-[0.15em] leading-relaxed">
                  让 Memory 不再独属某个 Agent
                </h3>
                <p className="text-xs md:text-sm text-white/50 max-w-2xl font-light tracking-wide leading-relaxed">
                  全域上下文中心 (Context Intersection Hub) <br className="hidden sm:inline" />
                  打通“人类输入”与“AI 记忆”的虚实链路，让碎片化的慢思考在这里自动整理。
                </p>
              </div>

              {/* neofeed封面 容器：置于文字板块正下方，留出完美间距 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.97, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.16, 1, 0.3, 1], // Apple 级别的减速动效
                  delay: 0.7
                }}
                className="w-full mt-10 md:mt-12 select-none max-w-[1120px]"
              >
                <a 
                  href="https://www.neofeed.cn/landing" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group block w-full focus:outline-none relative cursor-pointer"
                >
                  <div className="w-full overflow-hidden rounded-xl border border-amber-500/15 bg-black/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),_0_0_50px_rgba(245,158,11,0.06)] group-hover:border-amber-500/35 group-hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),_0_0_65px_rgba(245,158,11,0.18)] transition-all duration-700 relative">
                    <img 
                      src="/neofeed封面.png" 
                      alt="NeoFeed 封面" 
                      className="w-full h-auto object-contain opacity-95 group-hover:opacity-100 transition-all duration-700"
                    />
                    {/* 微光提示：黑客帝国黑绿霓虹极简风格，悬停时触发 */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none overflow-hidden">
                      <span className="relative z-10 text-xs tracking-[0.25em] font-mono font-semibold text-emerald-400 py-3.5 px-9 bg-[#030712]/95 rounded-full border border-emerald-500/35 backdrop-blur shadow-[0_0_35px_rgba(16,185,129,0.35)] transition-all duration-300">
                        VISIT_SITE &gt;
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>

              {/* 向下滚动提示 */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 1 }}
                className="flex flex-col items-center justify-center mt-10 space-y-2 text-white/20 select-none"
              >
                <span className="text-[9px] tracking-[0.3em] uppercase pl-[0.35em] font-mono">Scroll to explore Case Study</span>
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                >
                  <ArrowDown className="w-4 h-4 text-amber-500/40" />
                </motion.div>
              </motion.div>
            </section>

        {/* ========================================================================= */}
        {/* SECTION 01 / 解决什么问题 */}
        {/* ========================================================================= */}
        <section className="w-full max-w-[1120px] px-6 flex flex-col space-y-6 md:space-y-10">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-amber-500/60 font-mono tracking-widest block uppercase">
              01 // The Problem & Motivation
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-white tracking-wide">
              解决什么问题？
            </h2>
            <p className="text-sm text-white/50 font-light tracking-wide leading-relaxed">
              知识捕获的碎片化与 Agent 的失忆症
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Before Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl border border-white/[0.04] bg-white/[0.01] p-8 md:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden"
            >
              {/* 背景斜虚线微装饰 */}
              <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "10px 10px" }} />
              
              <div className="space-y-4 relative z-10">
                <h3 className="text-xl font-medium text-white/80 font-serif">
                  碎片化的“数字墓地”
                </h3>
                <p className="text-sm text-white/40 leading-relaxed font-light">
                  日常阅读、偶发灵感与零星文档散落在<strong>收藏夹</strong>或 <strong>Read Later 工具</strong>中，<strong>越堆越多却再未打开</strong>。更糟糕的是，现代 AI Agent 往往只具备<strong>瞬时对话记忆</strong>，一旦新建会话，便<strong>彻底丢失</strong>了此前积累的所有上下文，形成一个个<strong>知识孤岛</strong>。
                </p>
              </div>

              <ul className="space-y-3 relative z-10 border-t border-white/[0.04] pt-6 text-sm text-white/30">
                <li className="flex items-start space-x-2.5">
                  <span className="text-red-500/50 select-none mt-0.5">✕</span>
                  <span>收藏夹冷冰冰，知识<strong>只收集不消化</strong>，沦为心理安慰</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-red-500/50 select-none mt-0.5">✕</span>
                  <span>AI Agent <strong>频繁失忆</strong>，每次交互都需<strong>从零开始</strong>对齐上下文</span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <span className="text-red-500/50 select-none mt-0.5">✕</span>
                  <span>缺乏<strong>底层检索</strong>和<strong>打通机制</strong>，人类输入与机器记忆彼此脱节</span>
                </li>
              </ul>
            </motion.div>

            {/* After Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-2xl border border-amber-500/10 bg-amber-500/[0.02] p-8 md:p-10 flex flex-col justify-between space-y-8 relative overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.02)]"
            >
              {/* 背景琥珀色微光 */}
              <div className="absolute -right-20 -top-20 w-48 h-48 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="space-y-4 relative z-10">
                <h3 className="text-xl font-medium text-amber-100 font-serif">
                  全域上下文与持久外脑
                </h3>
                <p className="text-sm text-white/60 leading-relaxed font-light">
                  NeoFeed 极简地打通了知识链路。后台引擎自动将捕获的网页资产进行<strong>智能去重</strong>、<strong>AI整理</strong>与<strong>结构化</strong>。依托 <strong>MCP（Model Context Protocol）协议</strong>，任何大模型 Agent 都可以<strong>瞬时读取和挂载</strong>这套知识体系，让它进化为您的<strong>持久化外脑</strong>。
                </p>
              </div>

              <ul className="space-y-3 relative z-10 border-t border-amber-500/10 pt-6 text-sm text-amber-200/50">
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>零管理AI整理</strong>与自动高维图谱，<strong>无需刻意建双链</strong></span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span><strong>跨平台与跨模型共享</strong>上下文，让 Agent 真正承接<strong>长记忆</strong></span>
                </li>
                <li className="flex items-start space-x-2.5">
                  <Check className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span>基于<strong>本地或加密云</strong>，兼顾<strong>极致响应、离线可用</strong>与隐私安全</span>
                </li>
              </ul>
            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 02 / 如何实现 */}
        {/* ========================================================================= */}
        <section className="w-full max-w-[1120px] px-6 flex flex-col space-y-6 md:space-y-10">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-amber-500/60 font-mono tracking-widest block uppercase">
              02 // The Implementation & Tech Stack
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-white tracking-wide">
              实现逻辑是什么？
            </h2>
            <p className="text-sm text-white/50 font-light tracking-wide leading-relaxed">
              AI自动管理分类的知识库，用Cli打通Agent
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* 架构数据交互示意 */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 rounded-2xl border border-white/[0.04] bg-white/[0.01] p-8 md:p-10 flex flex-col justify-between space-y-10"
            >
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-2 text-xs text-white/40 font-mono">
                  <Workflow className="w-4 h-4 text-amber-500/50" />
                  <span>PIPELINE INTERACTION // 数据整理流向</span>
                </div>
                <p className="text-sm text-white/40 font-light leading-relaxed">
                  NeoFeed 的核心逻辑极其自然：它扮演着你的<strong>全自动数字漏斗</strong>。当你在浏览器中捕获到任何灵感或文章时，系统后台会瞬间<strong>去除冗余噪声、提取核心骨架并建立高维语义索引</strong>。大模型（Agent）无需通过繁琐的手动双链，即可通过 <strong>CLI 命令行</strong> 或标准的 <strong>MCP 协议</strong> 在毫秒级内自动读取和匹配最相关的记忆上下文。
                </p>
              </div>

              {/* 视觉流程图 */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative py-4">
                
                {/* 节点 1 */}
                <div className="flex flex-col items-center text-center w-full md:w-32 space-y-3 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                    <Globe className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-white/80 block">全域资产捕获</span>
                    <span className="text-[10px] text-white/30 block">Chrome 插件/API</span>
                  </div>
                </div>

                {/* 箭头 1 */}
                <div className="hidden md:flex flex-col items-center justify-center text-amber-500/20 w-8">
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </div>

                {/* 节点 2 (Highlight) */}
                <div className="flex flex-col items-center text-center w-full md:w-36 space-y-3 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.15)] relative">
                    <span className="absolute inset-0 rounded-full border border-amber-500/30 animate-ping opacity-25" />
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-amber-200 block">NeoFeed Engine</span>
                    <span className="text-[10px] text-amber-400/50 block font-mono">AI整理与持久存储</span>
                  </div>
                </div>

                {/* 箭头 2 */}
                <div className="hidden md:flex flex-col items-center justify-center text-amber-500/20 w-8">
                  <ArrowRight className="w-5 h-5 animate-pulse" />
                </div>

                {/* 节点 3 */}
                <div className="flex flex-col items-center text-center w-full md:w-32 space-y-3 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 shadow-[0_0_15px_rgba(255,255,255,0.02)]">
                    <BrainCircuit className="w-5 h-5 text-white/60" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-white/80 block">AI 客户端挂载</span>
                    <span className="text-[10px] text-white/30 block">MCP / Local LLMs</span>
                  </div>
                </div>
              </div>

              {/* 核心亮点功能摆放区 */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/[0.04] text-xs text-white/50 select-none">
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                  <span>全自动语义分类 & 标签系统</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                  <span>支持微信/网页/多端快捷采集</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                  <span>极客专属 CLI 工具 & 命令行</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                  <span>极致安全的本地化数据存储</span>
                </div>
              </div>

            </motion.div>

            {/* neofeed-cli-query 终端卡片 */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-5 rounded-2xl border border-white/[0.04] bg-[#050505] p-8 flex flex-col justify-start space-y-5 relative overflow-hidden"
            >
              <div className="space-y-2">
                <div className="inline-flex items-center space-x-2 text-xs text-amber-500/60 font-mono">
                  <Terminal className="w-4 h-4" />
                  <span>neofeed_cli.sh</span>
                </div>
                <p className="text-xs text-white/40 leading-relaxed font-light">
                  大模型通过极客式的 <strong>neofeed CLI</strong> 工具，可以直接在终端一键检索你沉淀的所有高维网页资产和慢思考，实现毫秒级快速匹配。
                </p>
              </div>

              {/* 终端会话展示区 */}
              <div className="bg-[#09090b] rounded-lg border border-white/[0.04] p-5 font-mono text-[10.5px] leading-relaxed text-emerald-400/90 overflow-x-auto relative">
                <div className="absolute top-2.5 right-3 px-1.5 py-0.5 text-[8px] bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                  CLI TERMINAL
                </div>
                <pre className="text-emerald-400/90 font-mono text-[10.5px] whitespace-pre">{`$ neofeed query "vector database" --limit 1

[NeoFeed Engine] Scanning local memory db...
✓ Match found (Score: 0.94)
--------------------------------------------------
Title:    向量索引深度实践.md
Category: Tech/Database
Snippet:  "在高并发检索下，基于 HNSW 的向量索引相比
          传统 Flat 检索能带来 10x 以上的性能提升..."
--------------------------------------------------
(Agent: Reading context memory successfully!)`}</pre>
              </div>
            </motion.div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 03 / 最佳实践 */}
        {/* ========================================================================= */}
        <section className="w-full max-w-[1120px] px-6 flex flex-col space-y-6 md:space-y-10">
          <div className="flex flex-col space-y-2">
            <span className="text-xs text-amber-500/60 font-mono tracking-widest block uppercase">
              03 // Playbook & Use Cases
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium text-white tracking-wide">
              最佳实践：构建持久记忆与创作素材流
            </h2>
            <p className="text-sm text-white/50 font-light tracking-wide leading-relaxed">
              场景体验：从微信公众号好文采集，到 Cursor 极速博客创作
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6 }}
              className="group p-8 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.02] hover:border-amber-500/20 transition-all duration-500 flex flex-col space-y-4"
            >
              <h3 className="text-lg font-medium text-white/80 font-serif">
                01 / 复制即捕获
              </h3>
              <p className="text-xs text-white/40 leading-relaxed font-light">
                当你在微信公众号或浏览器看到一篇精彩的深度文章、想留作后续写博客的素材时，直接<strong>复制链接</strong>。通过打通 NeoFeed 的<strong>系统快捷指令</strong>，链接将<strong>自动上传到 NeoFeed 后端</strong>，无需手动打开任何记录软件。
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group p-8 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.02] hover:border-amber-500/20 transition-all duration-500 flex flex-col space-y-4"
            >
              <h3 className="text-lg font-medium text-white/80 font-serif">
                02 / 智能整理与摘录
              </h3>
              <p className="text-xs text-white/40 leading-relaxed font-light">
                NeoFeed 后端服务器在毫秒级内自动对链接网页进行<strong>深度全文抓取并沉淀在数据库中</strong>。同时，AI 将在后台异步对内容进行<strong>去噪、AI整理、核心观点摘录与提炼</strong>，将其自动整理为高价值的素材图谱。
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group p-8 rounded-2xl bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.02] hover:border-amber-500/20 transition-all duration-500 flex flex-col space-y-4"
            >
              <h3 className="text-lg font-medium text-white/80 font-serif">
                03 / Agent 即时消费
              </h3>
              <p className="text-xs text-white/40 leading-relaxed font-light">
                下次你打开 <strong>Cursor</strong> (或 codex 等产品) 准备创作新文章时，通过标准的 <strong>CLI 命令行</strong> 就能直接让 Agent <strong>读取并高维匹配这部分内容</strong>，无需切换到任何浏览器。你可以<strong>直接引用它</strong>，或将其作为后续生产的<strong>高精度上下文底座</strong>。
              </p>
            </motion.div>

          </div>
        </section>

      </div>
    </div>
  </motion.div>
</main>
  );
}
