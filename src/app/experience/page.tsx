"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// 全局 PreviewModal 用于承载全屏预览
function ImagePreviewModal({ 
  src, 
  onClose, 
  title 
}: { 
  src: string | null; 
  onClose: () => void; 
  title?: string 
}) {
  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-md pointer-events-auto cursor-zoom-out"
          onClick={onClose}
        >
          {/* 关闭按钮 */}
          <button 
            className="absolute top-6 right-8 text-white/40 hover:text-white text-xs tracking-widest focus:outline-none py-1.5 px-3 border border-white/10 hover:border-white/20 rounded bg-white/[0.02]"
            onClick={onClose}
          >
            CLOSE ×
          </button>

          {/* 大图展示 */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="max-w-5xl max-h-[80vh] px-4 select-none relative"
            onClick={(e) => e.stopPropagation()} // 阻止冒泡到背景关闭
          >
            <img
              src={src}
              alt={title || "大图预览"}
              className="max-w-full max-h-[80vh] rounded-md border border-white/10 shadow-2xl object-contain"
            />
          </motion.div>

          {/* 图片底部水印提示 */}
          <span className="mt-4 text-[10px] tracking-[0.2em] text-white/30 uppercase select-none font-mono">
            {title || "AI PRODUCTS TRACING DEBUG CONSOLE"}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 独立子组件：WPS Cowork 项目一（左右布局：左文案，右图，带中间分割线）
function ProjectOne({ 
  onPreviewImage 
}: { 
  onPreviewImage: (src: string, title?: string) => void 
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-start">
        {/* 左侧：文案 (col-span-8，右边距 pr-12，加入右边框分割线) */}
        <div className="md:col-span-8 space-y-6 text-left md:pr-12 md:border-r md:border-white/[0.04]">
          {/* 序号与标题 */}
          <div className="flex items-baseline space-x-3 text-white pb-2.5 border-b border-white/[0.03]">
            <span className="text-base font-serif font-light text-white/30">01 /</span>
            <h3 className="text-base text-white font-semibold tracking-[0.12em]">
              WPS AI不应该仅是一个Chat bot - Lingxi Cowork项目
            </h3>
          </div>
          
          {/* 极简、有呼吸的定制化正文布局 */}
          <div className="space-y-6 font-sans text-white/70">
            {/* 1. 一句话总结 */}
            <div className="space-y-2">
              <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                一句话总结
              </span>
              <p className="text-[13px] font-light leading-relaxed tracking-[0.12em] text-white/90">
                当 Chatbot能力的天花板已经见底，我们正在开发一个以<span className="underline decoration-white/35 underline-offset-4 font-normal text-white">任务交付为核心</span>的 Agent 产品：Cowork。
              </p>
            </div>

            {/* 2. 我的角色 */}
            <div className="space-y-2">
              <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                我的角色
              </span>
              <p className="text-[13px] font-normal leading-relaxed tracking-[0.12em] text-white/90">
                负责移动端Cowork的<span className="underline decoration-white/35 underline-offset-4 text-white">设计与落地工作</span>
              </p>
            </div>

            {/* 3. 我的行动（总标题） */}
            <div className="space-y-4 pt-4 border-t border-white/[0.03]">
              <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                我的行动
              </span>

              {/* 在产品设计层面 (嵌套于我的行动下，带左边缘灰色虚线对齐) */}
              <div className="space-y-4 pl-3.5 border-l border-white/[0.05] ml-1">
                <span className="text-[12px] md:text-[13px] text-sky-400 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                  在产品设计层面
                </span>
                
                {/* 行动 1 */}
                <div className="space-y-2.5">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-[11px] font-serif text-white/40">1.</span>
                    <p className="text-[13px] font-light leading-relaxed tracking-[0.12em] text-white/80">
                      <strong className="font-semibold text-white/95 text-[14px]">做调研</strong>，深度体验多个竞品：Anygen、Genspark、Manus、TRAE Solo、天工、扣子等，通过分析竞品，去对比AI办公提效的最佳实践，产出多份报告。
                    </p>
                  </div>
                  {/* 深度人文感引用框 */}
                  <div className="border-l border-white/10 pl-4 py-0.5 ml-5 bg-white/[0.01] rounded-r">
                    <p className="text-[12px] font-light leading-relaxed tracking-[0.12em] text-white/40 italic">
                      “Agentic的产品分析不应再局限于功能本身，更重要的是<span className="underline decoration-white/20 underline-offset-4 text-white/60">Agent Loop的选型</span>、长时程任务执行的稳定性、交付物的质量等等，不深入了解实现链路的研究都没有可借鉴的价值。”
                    </p>
                  </div>
                </div>

                {/* 行动 2 */}
                <div className="space-y-2.5">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-[11px] font-serif text-white/40">2.</span>
                    <p className="text-[13px] font-light leading-relaxed tracking-[0.12em] text-white/80">
                      <strong className="font-semibold text-white/95 text-[14px]">找定位</strong>，回归WPS用户数据的视角，通过研究用户的query意图分布、用户与Chatbot交互的行为：文件上传类型、平均对话轮次、多轮对话平均次数等等，找到用户要什么，我们缺什么，WPS移动端的AI定位是什么。
                    </p>
                  </div>
                  {/* 深度人文感引用框 */}
                  <div className="border-l border-white/10 pl-4 py-0.5 ml-5 bg-white/[0.01] rounded-r">
                    <p className="text-[12px] font-light leading-relaxed tracking-[0.12em] text-white/40 italic">
                      “已有数据结论的分享：用户在移动端有相当高的高质量交付需求，WPS移动端的<span className="underline decoration-white/20 underline-offset-4 text-white/60">竞品先是豆包</span>，其次再是垂类办公竞品。学生与教师，是WPS主力用户。”
                    </p>
                  </div>
                </div>

                {/* 行动 3 */}
                <div className="space-y-2.5">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-[11px] font-serif text-white/40">3.</span>
                    <p className="text-[13px] font-light leading-relaxed tracking-[0.12em] text-white/80">
                      <strong className="font-semibold text-white/95 text-[14px]">跑设计</strong>，基于移动端的历史包袱与Agentic产品的特性（Lui为主），如何给用户贯彻WPS已AI化的心智，是一切设计的目标。多次自下而上的进行方案讨论，计划推动改版已有首页，来串联所有AI功能。
                    </p>
                  </div>
                  {/* 深度人文感引用框 */}
                  <div className="border-l border-white/10 pl-4 py-0.5 ml-5 bg-white/[0.01] rounded-r">
                    <p className="text-[12px] font-light leading-relaxed tracking-[0.12em] text-white/40 italic">
                      “WPS移动端当前的用户心智是‘万能查看器’，要让AI不仅仅是一个功能，而是<span className="underline decoration-white/20 underline-offset-4 text-white/60">用户新的创作入口</span>，全链路的设计与AI功能的建设同等重要。”
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. 在AI底层设计上 (同样并列嵌套于我的行动大分类下) */}
            <div className="space-y-4 pt-4 border-t border-white/[0.03] pl-3.5 border-l border-white/[0.05] ml-1">
              <span className="text-[12px] md:text-[13px] text-sky-400 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                在AI底层设计上
              </span>
              
              {/* 行动 1 */}
              <div className="space-y-2.5">
                <div className="flex items-baseline space-x-2">
                  <span className="text-[11px] font-serif text-white/40">1.</span>
                  <p className="text-[13px] font-light leading-relaxed tracking-[0.12em] text-white/80">
                    <strong className="font-semibold text-white/95 text-[14px]">选架构</strong>，高质量与长时程的任务意味着要优雅解决Context过载的问题。前期架构方案选型时，经历了参考A社开源代码手搓loop，用mcp包装工具，到尝试开源的多Agent方案，用Subagent隔离上下文等等。作为产品，不局限于讨论，从system prompt design, 到subagent of tools选择，长会话上下文的管理策略等，均参与设计甚至开发。
                  </p>
                </div>
                {/* 深度人文感引用框 */}
                <div className="border-l border-white/10 pl-4 py-0.5 ml-5 bg-white/[0.01] rounded-r">
                  <p className="text-[12px] font-light leading-relaxed tracking-[0.12em] text-white/40 italic">
                    “通过使用Cursor进行源码的解读，多次给研发提交MR。<span className="underline decoration-white/20 underline-offset-4 text-white/60">理解-实践</span>，是AI产品经理的必备要素。”
                  </p>
                </div>
              </div>

              {/* 行动 2 */}
              <div className="space-y-2.5">
                <div className="flex items-baseline space-x-2">
                  <span className="text-[11px] font-serif text-white/40">2.</span>
                  <p className="text-[13px] font-light leading-relaxed tracking-[0.12em] text-white/80">
                    <strong className="font-semibold text-white/95 text-[14px]">做工具</strong>，Agent的工具调用链路需要监控。skill、tools、loop of each step都可能出问题，与研发一起自建了后台Trace system, 在灰度环境下可对比、还原每个session的执行路径。
                  </p>
                </div>
                {/* 深度人文感引用框 */}
                <div className="border-l border-white/10 pl-4 py-0.5 ml-5 bg-white/[0.01] rounded-r">
                  <p className="text-[12px] font-light leading-relaxed tracking-[0.12em] text-white/40 italic">
                    “除了追踪整条链路外，单个tools的参数合理性也在评估范围内。每个tools的执行速率，交付结果以及<span className="underline decoration-white/20 underline-offset-4 text-white/60">badcase对上下文的污染程度</span>，都在监控体系中。”
                  </p>
                </div>
              </div>

              {/* 行动 3 */}
              <div className="space-y-2.5">
                <div className="flex items-baseline space-x-2">
                  <span className="text-[11px] font-serif text-white/40">3.</span>
                  <p className="text-[13px] font-light leading-relaxed tracking-[0.12em] text-white/80">
                    <strong className="font-semibold text-white/95 text-[14px]">定指标</strong>，与测试一起构建WPS Office 的Benchmark。用三份不同评测标准的Benchmark来考察Cowork的综合能力、风险应对、行业水准。每份测评体系的指标单独设计。
                  </p>
                </div>
                {/* 深度人文感引用框 */}
                <div className="border-l border-white/10 pl-4 py-0.5 ml-5 bg-white/[0.01] rounded-r">
                  <p className="text-[12px] font-light leading-relaxed tracking-[0.12em] text-white/40 italic">
                    “评测指标是为了优化方向而建立的，并非单纯的评估‘好/坏’。过程指标至少要包含：Tools、Skills命中率，结果指标至少要包含：<span className="underline decoration-white/20 underline-offset-4 text-white/60">每步耗时与交付物质量</span>。”
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 右侧：配图列表 (col-span-4，左边距 pl-14，保持顶端对齐) */}
        <div className="md:col-span-4 flex flex-col items-center md:pl-14 self-start pt-16 space-y-8">
          {/* 第一个展示：竞品的调研报告示例 */}
          <div className="w-full max-w-[280px] space-y-3">
            {/* 配图标题：竞品的调研报告示例 */}
            <div className="flex items-center space-x-2 select-none pb-1 w-full pl-0.5">
              <span className="text-[10px] text-amber-500 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                竞品的调研报告示例
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/25 to-transparent" />
            </div>

            <a 
              href="https://www.kdocs.cn/l/cv2MKOCUOeRW?from=docs&reqtype=kdocs&startTime=1779610758164&createDirect=true&newFile=true" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group/traelink block w-full focus:outline-none relative"
            >
              {/* 设定固定 4:5 的高框，配合 object-top 和 object-cover，放大比例展现长图的最头部部分 */}
              <div className="w-full aspect-[4/5] overflow-hidden rounded-md border border-white/10 bg-white/[0.01] shadow-xl group-hover/traelink:border-amber-500/50 transition-colors duration-500 relative">
                <img 
                  src="/trae-solo-ide.webp"
                  alt="TRAE SOLO AI IDE 在办公领域的全面升级" 
                  className="w-full h-full object-cover object-top scale-[1.08] opacity-85 group-hover/traelink:opacity-100 group-hover/traelink:scale-[1.12] transition-all duration-700 ease-out"
                />
                {/* 高阶遮罩叠加，引导点击 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                {/* Hover 提示 micro-motion */}
                <div className="absolute inset-0 bg-amber-950/20 opacity-0 group-hover/traelink:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] tracking-[0.2em] font-sans font-medium text-amber-400 py-1.5 px-3 bg-black/60 rounded-full border border-amber-500/20 backdrop-blur shadow-lg">
                    点击查看在线文件 ↗
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* 第二个展示：systemprompt与tools的调试 */}
          <div className="w-full max-w-[280px] space-y-3">
            {/* 配图标题：systemprompt与tools的调试 */}
            <div className="flex items-center space-x-2 select-none pb-1 w-full pl-0.5">
              <span className="text-[10px] text-amber-500 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                systemprompt与tools的调试
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/25 to-transparent" />
            </div>

            {/* 将两张图纵向合并在一个圆角卡片框中，形成一个整体，同时配以呼吸动效与边框 */}
            <div className="w-full rounded-md border border-white/10 bg-white/[0.01] overflow-hidden shadow-xl space-y-[2px] p-[2px] hover:border-amber-500/30 transition-colors duration-500">
              {/* 上半张图：image1 */}
              <div 
                className="w-full aspect-[2220/1338] overflow-hidden rounded-t-[4px] cursor-zoom-in group/img1 relative"
                onClick={() => onPreviewImage("/systemprompt-debug-1.webp", "SYSTEMPROMPT TRACING DEBUG CONSOLE")}
              >
                <img 
                  src="/systemprompt-debug-1.webp" 
                  alt="systemprompt调试1" 
                  className="w-full h-full object-cover object-center opacity-85 group-hover/img1:opacity-100 transition-all duration-500 ease-out scale-[1.01] group-hover/img1:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img1:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[9px] text-white/80 tracking-widest px-2 py-1 bg-black/60 backdrop-blur rounded border border-white/10">
                    点击查看大图
                  </span>
                </div>
              </div>
              {/* 下半张图：image */}
              <div 
                className="w-full aspect-[2286/1324] overflow-hidden rounded-b-[4px] cursor-zoom-in group/img2 relative"
                onClick={() => onPreviewImage("/systemprompt-debug-2.webp", "TOOLS TRACING DEBUG CONSOLE")}
              >
                <img 
                  src="/systemprompt-debug-2.webp" 
                  alt="systemprompt调试2" 
                  className="w-full h-full object-cover object-center opacity-85 group-hover/img2:opacity-100 transition-all duration-500 ease-out scale-[1.01] group-hover/img2:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img2:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-[9px] text-white/80 tracking-widest px-2 py-1 bg-black/60 backdrop-blur rounded border border-white/10">
                    点击查看大图
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 第三个展示：Benchmark */}
          <div className="w-full max-w-[280px] space-y-3">
            {/* 配图标题：Benchmark */}
            <div className="flex items-center space-x-2 select-none pb-1 w-full pl-0.5">
              <span className="text-[10px] text-amber-500 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                Benchmark
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/25 to-transparent" />
            </div>

            {/* 卡片框，配合呼吸动效、缩放与圆角 */}
            <div 
              className="w-full rounded-md border border-white/10 bg-white/[0.01] overflow-hidden shadow-xl cursor-zoom-in group/img3 relative aspect-[2620/1354] hover:border-amber-500/30 transition-colors duration-500"
              onClick={() => onPreviewImage("/benchmark-test.webp", "BENCHMARK PERFORMANCE METRICS")}
            >
              <img 
                src="/benchmark-test.webp" 
                alt="Benchmark 评测指标" 
                className="w-full h-full object-cover object-center opacity-85 group-hover/img3:opacity-100 transition-all duration-500 ease-out scale-[1.01] group-hover/img3:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/img3:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-[9px] text-white/80 tracking-widest px-2 py-1 bg-black/60 backdrop-blur rounded border border-white/10">
                  点击查看大图
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 独立子组件：WPS 灵犀助理项目二（左右布局：左图，右文案）
function ProjectTwo({ 
  onPreviewImage 
}: { 
  onPreviewImage: (src: string, title?: string) => void 
}) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-start">
        {/* 左侧：配图 (col-span-4，右边距 pr-12，加入右边框分割线) */}
        <div className="md:col-span-4 flex flex-col items-center order-last md:order-first md:pr-12 md:border-r md:border-white/[0.04] self-start pt-16 space-y-3">
          <div className="w-full max-w-[280px] space-y-3">
            {/* 配图标题：如何优化AI的反问勾子 */}
            <div className="flex items-center space-x-2 select-none pb-1 w-full pl-0.5">
              <span className="text-[10px] text-amber-500 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                如何优化AI的反问勾子
              </span>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/25 to-transparent" />
            </div>

            {/* 完美对齐大框，配合 object-top 和 object-cover，放大比例展现长图最头部的核心反问示例，点击后跳转去金山文档，悬停提示 */}
            <a 
              href="https://www.kdocs.cn/l/coJUYqIZySb5?from=docs&reqtype=kdocs&startTime=1779614109378&createDirect=true&newFile=true" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group/hooklink block w-full focus:outline-none relative"
            >
              <div className="w-full aspect-[4/5] overflow-hidden rounded-md border border-white/10 bg-white/[0.01] shadow-xl group-hover/hooklink:border-amber-500/50 transition-colors duration-500 relative">
                <img 
                  src="/ai-hook-strategy.webp" 
                  alt="如何优化AI的反问勾子" 
                  className="w-full h-full object-cover object-top scale-[1.08] opacity-85 group-hover/hooklink:opacity-100 group-hover/hooklink:scale-[1.12] transition-all duration-700 ease-out"
                />
                {/* 高阶遮罩叠加，引导点击 */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                {/* Hover 提示 micro-motion */}
                <div className="absolute inset-0 bg-amber-950/20 opacity-0 group-hover/hooklink:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                  <span className="text-[10px] tracking-[0.2em] font-sans font-medium text-amber-400 py-1.5 px-3 bg-black/60 rounded-full border border-amber-500/20 backdrop-blur shadow-lg">
                    点击查看在线文件 ↗
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* 右侧：文案 (col-span-8，左边距 pl-12) */}
        <div className="md:col-span-8 space-y-4 text-left order-first md:order-last md:pl-12">
          <div className="flex items-baseline space-x-3 text-white pb-2.5 border-b border-white/[0.03]">
            <span className="text-base font-serif font-light text-white/30">02 /</span>
            <h3 className="text-base text-white font-semibold tracking-[0.12em]">
              AI产品的必经之路 - 灵犀Chat bot
            </h3>
          </div>
          
          <div className="space-y-6 font-sans text-white/70">
            {/* 1. 一句话总结 */}
            <div className="space-y-2">
              <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                一句话总结
              </span>
              <p className="text-[13px] font-light leading-relaxed tracking-[0.12em] text-white/90">
                Openclaw还没开始肆意泛滥时，大众对AI的认知无非是<span className="underline decoration-white/35 underline-offset-4 font-normal text-white">Chat bot</span>，WPS在2025年也是如此。
              </p>
            </div>

            {/* 2. 我的角色 */}
            <div className="space-y-2">
              <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                我的角色
              </span>
              <p className="text-[13px] font-normal leading-relaxed tracking-[0.12em] text-white/90">
                负责移动端WPS 灵犀AI的<span className="underline decoration-white/35 underline-offset-4 text-white">设计与增长工作</span>
              </p>
            </div>

            {/* 3. 我的行动 */}
            <div className="space-y-4 pt-4 border-t border-white/[0.03]">
              <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                我的行动
              </span>
              
              {/* 嵌套设计，左边缘灰色虚线对齐 */}
              <div className="space-y-4 pl-3.5 border-l border-white/[0.05] ml-1">
                {/* 行动 1 */}
                <div className="space-y-2.5">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-[11px] font-serif text-white/40">1.</span>
                    <p className="text-[13px] font-light leading-relaxed tracking-[0.12em] text-white/80">
                      <strong className="font-semibold text-white/95 text-[14px]">让用户把AI用起来</strong>。通过研究用户的query，分析用户的人群画像，结合用户在移动端进行新建、文档编辑的行为，回答一个问题：是谁，正在用WPS 灵犀AI做什么事情。基于结论，重新调整对话流界面的功能展示内容、顺序、推荐。
                    </p>
                  </div>
                </div>

                {/* 行动 2 */}
                <div className="space-y-2.5">
                  <div className="flex items-baseline space-x-2">
                    <span className="text-[11px] font-serif text-white/40">2.</span>
                    <p className="text-[13px] font-light leading-relaxed tracking-[0.12em] text-white/80">
                      <strong className="font-semibold text-white/95 text-[14px]">让用户把AI用的好</strong>。不同场景下，用户query的质量差距也巨大，降低用户的提问门槛、完善用户的多轮对话体验非常重要。通过优化长文档解析的等待交互，打磨prompt改进对话结尾的勾子效果，提升推荐问题展示速度与效果等一系列措施，让用户轻松表达。
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. 结果 */}
            <div className="space-y-2 pt-4 border-t border-white/[0.03]">
              <span className="text-[12px] md:text-[13px] text-amber-500 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                结果
              </span>
              <p className="text-[13px] font-semibold leading-relaxed tracking-[0.12em] text-white/95">
                移动灵犀的DAU <span className="underline decoration-amber-500/40 underline-offset-4 text-amber-400">7w+</span>，次周留存 <span className="underline decoration-amber-500/40 underline-offset-4 text-amber-400">15%</span>（PC 9%，DAU 30w+）
              </p>
            </div>

            {/* 5. 深度人文感引用框 */}
            <div className="border-l border-white/10 pl-4 py-0.5 ml-1 bg-white/[0.01] rounded-r space-y-2.5">
              <p className="text-[12px] font-light leading-relaxed tracking-[0.12em] text-white/40 italic">
                “用户在WPS中依旧使用传统功能进行创作居多，<span className="underline decoration-white/20 underline-offset-4 text-white/60">将传统功能AI化</span>，是灵犀早期的思路。上述数据仅为Chat bot的数据，不考虑其他Gui的AI功能。但越来越多的人开始接受Lui，豆包、千问带来的Lui新建与办公的心智普及速度比想象的快的多。Chat bot的天花板始终有限，这也是后续从Chat转向Agent AI的理由之一。”
              </p>
              <p className="text-[12px] font-light leading-relaxed tracking-[0.12em] text-white/40 italic">
                “不过，无论产品形态如何变化，<span className="underline decoration-white/20 underline-offset-4 text-white/60">优质且过硬的产品质量</span>，有效办公效率的提升是一切增长的基本原则。”
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperiencePage() {
  // 全局 modal 状态统一管理
  const [activePreview, setActivePreview] = useState<{ src: string; title?: string } | null>(null);

  const handleOpenPreview = (src: string, title?: string) => {
    setActivePreview({ src, title });
  };

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
          {/* 右侧巨幅内容滚动视窗 (Experience Tab Single Column Layout) */}
          <div 
            className="w-full h-full overflow-y-auto overflow-x-hidden pr-2 space-y-16 scroll-smooth pb-[25vh] hide-scrollbar"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
          >
            {/* 针对 Webkit 浏览器隐藏滚动条 */}
            <style jsx global>{`
              div::-webkit-scrollbar {
                display: none !important;
              }
            `}</style>

            {/* 
              【工作核心区】：直接垂直居中布局
              - 上部：三行文案，垂直居中对齐作为全页开篇
              - 下部：工作核心配图（完全展示、看得更大且舒服）
            */}
            <div className="w-full flex flex-col items-center justify-center text-center space-y-10 md:space-y-12 pt-8 md:pt-12 pb-16 md:pb-20 border-b border-white/[0.03] select-none">
              {/* 文字板块：置于上方，垂直居中对齐作为开篇切入点 */}
              <div className="flex flex-col items-center justify-center space-y-4 md:space-y-5 w-full">
                <span className="text-[10px] md:text-xs text-white/20 tracking-[0.25em] pl-[0.25em] font-serif uppercase block">
                  Core Focus // The Mission
                </span>
                <span className="text-sm md:text-base text-white/60 tracking-[0.15em] pl-[0.15em] font-medium block">
                  我的工作核心
                </span>
                <h3 className="text-2xl md:text-3xl text-white font-serif font-semibold tracking-[0.15em] pl-[0.15em] leading-relaxed">
                  让AI在WPS上，自然发生
                </h3>
              </div>

              {/* 工作核心配图：水平居中，置于文字下方，使用 3584/1120 比例完全展现横幅全景 */}
              <div className="w-full max-w-[560px] aspect-[3584/1120] overflow-hidden rounded-md flex items-center justify-center border border-white/5 bg-white/[0.01] shadow-lg">
                <img 
                  src="/alice-gen-1779610342651.webp" 
                  alt="让AI在WPS上自然发生" 
                  className="w-full h-full object-cover object-center opacity-90 hover:opacity-100 transition-opacity duration-700"
                />
              </div>
            </div>

            {/* 四大主导项目平铺列表：豪华级的 space-y-32 (128px)，给阅读极其呼吸舒适的间歇 */}
            <div className="w-full space-y-32">
              
              {/* 项目 1: WPS COWORK 移动端 主导 (左文案，右图) */}
              <ProjectOne onPreviewImage={handleOpenPreview} />

              {/* 项目 2: AI产品的必经之路 - 灵犀Chat bot (左图，右文案) */}
              <ProjectTwo onPreviewImage={handleOpenPreview} />

              {/* 项目 3: 语音交互场景创新 (左文案，右图) */}
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-start">
                  {/* Left Column: Text content */}
                  <div className="md:col-span-8 space-y-4 text-left md:pr-12 md:border-r md:border-white/[0.04]">
                    <div className="flex items-baseline space-x-3 text-white pb-2.5 border-b border-white/[0.03]">
                      <span className="text-base font-serif font-light text-white/30">03 /</span>
                      <h3 className="text-base text-white font-semibold tracking-[0.12em]">
                        移动端应该要有自己的特色 - 语音如何塑造办公的新体验
                      </h3>
                    </div>
                    
                    <div className="space-y-6 text-xs leading-relaxed tracking-[0.15em] font-light font-sans text-white/60">
                      <div className="space-y-1.5">
                        <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                          一句话总结
                        </span>
                        <p className="text-white/70 text-[13px] font-light leading-relaxed">
                          这是一个探索性项目，尝试将RTC（Real-Time Communication）与文档场景相结合，我们孵化了聊文档、AI讲解两个功能。
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                          我的角色
                        </span>
                        <p className="text-white/70 text-[13px] font-light leading-relaxed">
                          负责聊文档的产品迭代 & AI讲解的一期建设。
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                          我的行动
                        </span>
                        
                        <div className="space-y-2">
                          <p className="text-white/80 text-[13px] font-medium leading-relaxed">
                            1. 需求的合理性评估
                          </p>
                          <p className="text-white/70 text-[13px] font-light leading-relaxed pl-4">
                            语音是否能和文档相结合，角度是什么样的？遵从Demo先行，体验优先的原则，我横向对比了基于文档进行语音交互的可行性、易用性、用户价值深度，寻找聊文档的功能定位。
                          </p>
                          <blockquote className="border-l border-amber-500/30 pl-4 py-1.5 text-white/40 text-[12px] font-light italic leading-relaxed bg-white/[0.01] rounded-r-md">
                            “在2025年，WPS刚开始‘AI Native’，彼时最缺乏的是用户对WPS AI认可的心智，我们缺乏出圈的AI产品设计。此外，从产品本身、竞品、以及种子用户的初期感受，我们也预见，在AI时代下，语音模态的交互具备极高的用户价值。”
                          </blockquote>
                        </div>

                        <div className="space-y-2">
                          <p className="text-white/80 text-[13px] font-medium leading-relaxed">
                            2. 产品设计与优化
                          </p>
                          <p className="text-white/70 text-[13px] font-light leading-relaxed pl-4">
                            与UI/UX草拟多份设计方案，与研发共同进行聊文档的Workflow的编排，完善了文档解析-AI发问-用户对话-AI推荐回答的这一整套链路。
                          </p>
                          <blockquote className="border-l border-amber-500/30 pl-4 py-1.5 text-white/40 text-[12px] font-light italic leading-relaxed bg-white/[0.01] rounded-r-md">
                            “虽然火山引擎提供了RTC的Api服务，但文档解析-AI解读-语音播报的链路不够稳定，需要额外工程化的处理。过长文档带来的上下文过载问题，AI流式的界面渲染与语音播报的同步问题，用户多次的打断对上下文污染的问题，都需要进行降级定义。”
                          </blockquote>
                        </div>

                        <div className="space-y-2">
                          <p className="text-white/80 text-[13px] font-medium leading-relaxed">
                            3. 新场景的孵化
                          </p>
                          <p className="text-white/70 text-[13px] font-light leading-relaxed pl-4">
                            除去聊文档功能的技术困难外，用户固有认知较难打破，“不知道问什么”是用户冷启动的最高门槛。我们研究了AI的反问逻辑，研究了交互引导，仍难突破。最终确定了用户以“听”为主，参与为辅的产品设计方向，推出来了新功能：AI讲解。
                          </p>
                          <blockquote className="border-l border-amber-500/30 pl-4 py-1.5 text-white/40 text-[12px] font-light italic leading-relaxed bg-white/[0.01] rounded-r-md">
                            “AI时代，用户最大的门槛是不知道用AI来做什么。面对Lui不知道问什么，面对Gui不知道为什么要点击，所有的AI产品在面临增长困境时，除了产品的用户价值到位外，最为重要的一点：用户思考的门槛降的不够低。在2026年，Agentic的产品变成了趋势，但大家也都遇到了增长的困境。很多功能缺乏用户视角的思考，更像是AI极客的功能降级...”
                          </blockquote>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <span className="text-[12px] md:text-[13px] text-amber-400 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                          结果与业务指标
                        </span>
                        <div className="grid grid-cols-2 gap-4 bg-white/[0.01] border border-white/[0.03] rounded-md p-4">
                          <div className="space-y-1">
                            <span className="text-[10px] text-white/40 tracking-wider block">聊文档</span>
                            <p className="text-white/80 text-[13px] font-light">
                              次日留存：<strong className="text-amber-400 font-semibold">8% 左右</strong>
                            </p>
                            <p className="text-white/80 text-[13px] font-light">
                              人均对话轮次：<strong className="text-amber-400 font-semibold">4.5 轮</strong>
                            </p>
                            <p className="text-white/80 text-[13px] font-light">
                              放量用户数：<strong className="text-amber-400 font-semibold">1w</strong>，DAU：<strong className="text-amber-400 font-semibold">2000</strong>
                            </p>
                          </div>
                          <div className="space-y-1 border-l border-white/[0.04] pl-4">
                            <span className="text-[10px] text-white/40 tracking-wider block">AI 讲解</span>
                            <p className="text-white/80 text-[13px] font-light">
                              次日留存：<strong className="text-amber-400 font-semibold">12%</strong>
                            </p>
                            <p className="text-white/80 text-[13px] font-light">
                              次周留存：<strong className="text-amber-400 font-semibold">25%</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Image and Demo Videos */}
                  <div className="md:col-span-4 flex flex-col items-center md:pl-12 self-start pt-16 space-y-20">
                    <div className="w-full max-w-[280px] space-y-3">
                      {/* 配图标题：聊文档产品的初期思考 */}
                      <div className="flex items-center space-x-2 select-none pb-1 w-full pl-0.5">
                        <span className="text-[10px] text-amber-500 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                          聊文档产品的初期思考
                        </span>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/25 to-transparent" />
                      </div>

                      {/* 交互大图超链接卡片 */}
                      <a 
                        href="https://www.kdocs.cn/l/cvvHmBnBj8QD" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group/imglink block w-full focus:outline-none relative"
                      >
                        <div className="w-full aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-white/[0.01] shadow-xl group-hover/imglink:border-amber-500/50 transition-colors duration-500 relative">
                          <img 
                            src="/AI聊文档-解构与思考.webp" 
                            alt="聊文档产品的初期思考" 
                            className="w-full h-full object-cover object-center opacity-85 group-hover/imglink:opacity-100 transition-opacity duration-700"
                          />
                          <div className="absolute inset-0 bg-amber-950/20 opacity-0 group-hover/imglink:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                            <span className="text-[10px] tracking-[0.2em] font-sans font-medium text-amber-400 py-1.5 px-3 bg-black/60 rounded-full border border-amber-500/20 backdrop-blur shadow-lg">
                              点击查看在线文件 ↗
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>

                    {/* 产品 Demo 演示视频模块 */}
                    <div className="w-full max-w-[280px] space-y-3">
                      <div className="flex items-center space-x-2 select-none pb-1 w-full pl-0.5">
                        <span className="text-[10px] text-amber-500 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                          聊文档的产品演示
                        </span>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/25 to-transparent" />
                      </div>

                      <div className="w-full aspect-[9/16] overflow-hidden rounded-md border border-white/10 bg-black/40 shadow-lg relative">
                        <video 
                          src="/video/bf37bbf9a676c7d2f0654f31cc178eaa.mp4" 
                          controls 
                          muted
                          playsInline 
                          preload="metadata"
                          className="w-full h-full object-contain opacity-90 hover:opacity-100 transition-opacity duration-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 项目 4: AI提效的实践与落地 (左图，右文案) */}
              <div className="w-full">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-start">
                  {/* Left Column: Image with link */}
                  <div className="md:col-span-4 flex flex-col items-center order-last md:order-first md:pr-12 md:border-r md:border-white/[0.04] self-start pt-16 space-y-12">
                    {/* Weave分享图 */}
                    <div className="w-full max-w-[280px] space-y-3">
                      {/* 配图标题：独立产品Weave的分享 */}
                      <div className="flex items-center space-x-2 select-none pb-1 w-full pl-0.5">
                        <span className="text-[10px] text-amber-500 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                          独立产品Weave的分享
                        </span>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/25 to-transparent" />
                      </div>

                      {/* Weave 交互图超链接卡片 */}
                      <a 
                        href="https://www.kdocs.cn/l/chufZz6TifR5?from=docs&reqtype=kdocs&startTime=1779719182382&createDirect=true&newFile=true" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group/weaveblock block w-full focus:outline-none relative"
                      >
                        <div className="w-full aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-white/[0.01] shadow-xl group-hover/weaveblock:border-amber-500/50 transition-colors duration-500 relative">
                          <img 
                            src="/独立产品分享Weave：解决你的AI信息焦虑.webp" 
                            alt="独立产品Weave的分享" 
                            className="w-full h-full object-cover object-center opacity-85 group-hover/weaveblock:opacity-100 transition-opacity duration-700"
                          />
                          <div className="absolute inset-0 bg-amber-950/20 opacity-0 group-hover/weaveblock:opacity-100 transition-opacity duration-500 flex items-center justify-center pointer-events-none">
                            <span className="text-[10px] tracking-[0.2em] font-sans font-medium text-amber-400 py-1.5 px-3 bg-black/60 rounded-full border border-amber-500/20 backdrop-blur shadow-lg">
                              点击查看在线文件 ↗
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>

                    {/* 提效思路图 */}
                    <div className="w-full max-w-[280px] space-y-3">
                      {/* 配图标题：组织提效的思考 */}
                      <div className="flex items-center space-x-2 select-none pb-1 w-full pl-0.5">
                        <span className="text-[10px] text-amber-500 font-semibold tracking-[0.15em] block uppercase select-none font-sans">
                          组织提效的思考
                        </span>
                        <div className="h-[1px] flex-1 bg-gradient-to-r from-amber-500/25 to-transparent" />
                      </div>

                      {/* 提效思路 交互图 */}
                      <div 
                        className="w-full aspect-[4/3] overflow-hidden rounded-md border border-white/10 bg-white/[0.01] shadow-xl cursor-zoom-in group/tipsblock relative"
                        onClick={() => handleOpenPreview("/提效思路.webp", "组织提效的思考")}
                      >
                        <img 
                          src="/提效思路.webp" 
                          alt="组织提效的思考" 
                          className="w-full h-full object-cover object-center opacity-85 group-hover/tipsblock:opacity-100 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/tipsblock:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-[9px] text-white/80 tracking-widest px-2 py-1 bg-black/60 backdrop-blur rounded border border-white/10">
                            点击查看大图
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Text content */}
                  <div className="md:col-span-8 space-y-4 text-left order-first md:order-last md:pl-12">
                    <div className="flex items-baseline space-x-3 text-white pb-2.5 border-b border-white/[0.03]">
                      <span className="text-base font-serif font-light text-white/30">04 /</span>
                      <h3 className="text-base text-white font-semibold tracking-[0.12em]">
                        AI如何改变传统的组织形态 - 组织提效的尝试与思考
                      </h3>
                    </div>
                    <div className="space-y-6 text-xs leading-relaxed tracking-[0.15em] font-light font-sans text-white/60">
                      <div className="space-y-1.5">
                        <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                          一句话总结
                        </span>
                        <p className="text-white/70 text-[13px] font-light leading-relaxed">
                          部门需要几位跑在前列的人员，主动、深度的尝试用AI提效并赋能的传统研发流程。
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                          我的角色
                        </span>
                        <p className="text-white/70 text-[13px] font-light leading-relaxed">
                          AI提效的实践与落地者
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <span className="text-[12px] md:text-[13px] text-white/50 font-medium tracking-[0.15em] block uppercase select-none font-sans">
                          我的行动
                        </span>

                        <div className="space-y-2">
                          <p className="text-white/80 text-[13px] font-medium leading-relaxed">
                            1. 产品介入研发流程
                          </p>
                          <p className="text-white/70 text-[13px] font-light leading-relaxed pl-4">
                            Cowork项目中，使用Cursor与研发共创代码，产品在前端的体验问题上，能够做到自己发现问题-自己提MR解决/验收问题。在埋点方面，功能埋点的设计也能够闭环。并将规范的代码标准沉淀为Skill赋能产品团队。
                          </p>
                          <blockquote className="border-l border-amber-500/30 pl-4 py-1.5 text-white/40 text-[12px] font-light italic leading-relaxed bg-white/[0.01] rounded-r-md">
                            “基于组织角度的AI提效，短期必然会让个体的任务量上升。但经历了一个项目后，产品能够做到对代码有一定的话语权，掌控权是一件好事。如果产品对实现逻辑完全不了解，就很难找到用户需求与实现成本的优雅平衡。”
                          </blockquote>
                        </div>

                        <div className="space-y-2">
                          <p className="text-white/80 text-[13px] font-medium leading-relaxed">
                            2. 优先HTML的Demo
                          </p>
                          <p className="text-white/70 text-[13px] font-light leading-relaxed pl-4">
                            几乎不再使用figma的原型设计，而是用快速生成的HTML进行替代。在0-1的功能设计上，HTML的可交互性更强。基于已有的设计仓库，为产品组提供了原型设计skill，可以用AI Coding相对保真的产品原型。
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-white/80 text-[13px] font-medium leading-relaxed">
                            3. 降低数分门槛
                          </p>
                          <p className="text-white/70 text-[13px] font-light leading-relaxed pl-4">
                            AI IDE具备了基本的数分能力，但不了解业务，缺乏洞察视角。通过对已有的数据报表进行字段解读、业务解释、功能说明，沉淀skill赋能团队成员自动化处理常规数据，并外接了webhook，异常数据每日复盘。
                          </p>
                        </div>

                        <div className="space-y-2">
                          <p className="text-white/80 text-[13px] font-medium leading-relaxed">
                            4. 手搓了一个AI热点订阅产品：WeaveRss
                          </p>
                          <p className="text-white/70 text-[13px] font-light leading-relaxed pl-4">
                            独自Vibe Coding，通过订阅X与各大AI平台的RSS链接，每日抓取对应的消息内容，用AI处理并打通WPS的内部IM软件，Webhook通知群消息，多维表自动沉淀有价值信息。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>

      {/* 全局图片 Lightbox 预览弹窗 */}
      <ImagePreviewModal 
        src={activePreview?.src || null} 
        onClose={() => setActivePreview(null)} 
        title={activePreview?.title}
      />
    </main>
  );
}
