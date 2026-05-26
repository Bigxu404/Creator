"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <main className="w-screen h-screen relative flex items-center justify-center pointer-events-none">
      {/* 全屏电影级 70% 深度毛玻璃遮罩层 (让 3D 人物和营火在背后形成隐隐约约的绝美氛围) */}
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
          
          {/* 
            两栏排版（独立滚动视窗）：
            - 左边：纯文字文章，极精细的行高 and 字距，百分之百沉浸阅读。
            - 间隔：浅浅、清澈的垂直分割线。
            - 右边：单列画轴精品图像，完全无裁剪展示。
          */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 w-full h-full items-stretch">
            
            {/* 针对 Webkit 浏览器隐藏滚动条 */}
            <style jsx global>{`
              .hide-scrollbar::-webkit-scrollbar {
                display: none !important;
              }
            `}</style>

            {/* 左侧：文章区域 (8/12 宽度，在桌面端右侧加上极为内敛的细分割线) */}
            <div 
              className="md:col-span-8 h-full overflow-y-auto pr-6 md:pr-12 space-y-6 scroll-smooth pb-[15vh] hide-scrollbar md:border-r md:border-white/[0.04]"
              style={{
                scrollbarWidth: "none", // Firefox 隐藏滚动条
                msOverflowStyle: "none" // IE 隐藏滚动条
              }}
            >
              {/* 纯享文本段落 (使用苹方/PingFang SC，字号优化为 text-[15px]，提供极致的清澈阅读舒适度) */}
              <div 
                className="space-y-6 text-left"
                style={{ 
                  fontFamily: '"PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif' 
                }}
              >
                <p className="text-[15px] text-white/70 leading-loose tracking-[0.15em] font-light">
                  Hi，你好，我是阿旭。
                </p>
                <p className="text-[15px] text-white/70 leading-loose tracking-[0.15em] font-light">
                  一名 WPS 的 AI Product Manager，已经在 WPS 工作快要 3 年了。除此之外，没有太多的花哨标签。
                </p>
                <p className="text-[15px] text-white/70 leading-loose tracking-[0.15em] font-light">
                  我很热爱产品经理这个工作，且自我判断相对“理想主义” and “old school”。因为做产品，本质是研究人。
                </p>
                <p className="text-[15px] text-white/70 leading-loose tracking-[0.15em] font-light">
                  这可以让我在拥有物理重力的 3D 星球里，用心理学的理论去思考、解构问题，很有成就感 and 岗位的归属感。
                </p>
                <p className="text-[15px] text-white/70 leading-loose tracking-[0.15em] font-light">
                  在 WPS 的三年经历，最开始曾在 B 端，也就是企业事业部做中后台的事情。逻辑严密、具备丰富边界场景、且以安全为核心的“那些需求”，无比苛刻扣细节的 leader，让我学会了：主动、本分且踏实地做事情是职场的基本原则。没有人敢保证不出错，但要做足功课面对挑战。
                </p>
                <p className="text-[15px] text-white/70 leading-loose tracking-[0.15em] font-light">
                  后面来到 C 端，office 事业部做移动端的 AI 产品，更是有趣。我从一名对 AI 仅仅感兴趣，到参与公司黑客松，到 Vibe coding 变成家常便饭，用 AI 做成了一件又一件能带来正收益、正反馈的事情。一个自我成长的飞轮，让我越走越远，想要走的更远。
                </p>
                <p className="text-[15px] text-white/70 leading-loose tracking-[0.15em] font-light">
                  我该如何介绍我自己？一份简历？一份作品集？似乎在当前的这个 AI 时代好像都差点意思。曾经某个腾讯面试官问过我一个问题：“你怎么理解交互？”。
                </p>
                <p className="text-[15px] text-white/70 leading-loose tracking-[0.15em] font-light">
                  说实话这个问题挺无聊的，但是也间接让我思考出一个想法：交互或者互动，可能是人和人，人和机器发生“理解”的必要条件之一。So，这个网站的意义就是如此。
                </p>
                <p className="text-[15px] text-white/90 leading-loose tracking-[0.15em] font-normal">
                  再次欢迎你，陌生人～ 希望能够成为你的朋友。
                </p>

                {/* 极简人文落款 */}
                <div className="pt-8 border-t border-white/[0.02] flex items-center justify-between select-none">
                  <span className="font-serif text-[9px] text-white/25 tracking-[0.25em] uppercase">
                    LAT.22.2760 // 珠海
                  </span>
                  <span className="text-[11px] text-white/40 font-medium italic font-serif tracking-[0.28em] hover:text-white/80 transition-colors duration-500">— — — From Zhuhai</span>
                </div>
              </div>
            </div>

            {/* 右侧：集中图片区域 (4/12 宽度，独立垂直滚动，增加 md:pl-10 微微将画卷整体往右侧推移) */}
            <div 
              className="md:col-span-4 h-full overflow-y-auto pr-2 md:pl-10 space-y-6 scroll-smooth pb-[15vh] hide-scrollbar flex flex-col items-start"
              style={{
                scrollbarWidth: "none", // Firefox 隐藏滚动条
                msOverflowStyle: "none" // IE 隐藏滚动条
              }}
            >
              {/* 人像原片 2 (直接采用原生 img 并设为 h-auto，彻底摒弃任何可能有裁切的外层 aspect/overflow 类，百分之百原画无损全显) */}
              <div className="relative group/img2 w-[180px] md:w-[260px]">
                <img 
                  src="/alice-gen-1779295412219.png" 
                  alt="阿旭 02"
                  className="w-full h-auto rounded-md border border-white/10 bg-white/[0.02] opacity-90 group-hover/img2:opacity-100 transition-opacity duration-500 ease-out shadow-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none rounded-md" />
              </div>

              {/* 珠海风光 4 联片：采用单列（一行一张）画卷式排版，完美对准上方人像的 260px 宽度线 */}
              <div className="space-y-3 w-[180px] md:w-[260px]">
                <span className="text-[8px] text-white/25 tracking-[0.25em] font-serif uppercase block select-none pl-1">珠海纪行 // ZHUHAI DIARY</span>
                <div className="flex flex-col gap-4">
                  {[1, 2, 3, 4].map((num) => (
                    <div key={num} className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/5 bg-white/[0.01] group/zhimg shadow-md">
                      <img 
                        src={`/Zhuhai${num}.jpg`} 
                        alt={`珠海风光 ${num}`}
                        className="w-full h-full object-cover opacity-85 group-hover/zhimg:opacity-100 group-hover/zhimg:scale-[1.03] transition-all duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </motion.div>
    </main>
  );
}
