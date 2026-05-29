"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="w-screen h-screen relative flex items-center justify-center pointer-events-none">
      {/* 全屏电影级 70% 深度毛玻璃遮罩层 (让 3D 人物和营火在背后形成隐隐约约的绝美氛围) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1.3, 
          ease: "easeInOut",
          delay: 0.1 
        }}
        className="absolute inset-0 pointer-events-auto flex items-center justify-center"
      >
        <div className="max-w-6xl w-full h-full md:h-[75vh] overflow-y-auto md:overflow-hidden px-4 md:px-12 mx-auto relative pt-24 md:pt-14 hide-scrollbar pb-[15vh] md:pb-0">
          
          {/* 
            两栏排版（独立滚动视窗）：
            - 左边：画廊级平铺探索视窗，一滚到底，避免双选项卡交互冲突。
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

            {/* 左侧：画廊级平铺探索视窗 (8/12 宽度，在桌面端右侧加上极为内敛的细分割线) */}
            <div 
              className="md:col-span-8 h-auto md:h-full overflow-visible md:overflow-y-auto pr-0 md:pr-12 space-y-12 scroll-smooth pb-0 md:pb-[15vh] hide-scrollbar md:border-r md:border-white/[0.04]"
              style={{
                scrollbarWidth: "none", // Firefox 隐藏滚动条
                msOverflowStyle: "none" // IE 隐藏滚动条
              }}
            >
              {/* 纯享文本段落 (使用极简高雅的无彩色系画廊平铺排版，字号优化为 text-[15px]，提供极致的阅读舒适度) */}
              <div 
                className="space-y-12 text-left"
                style={{ 
                  fontFamily: '"PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif' 
                }}
              >
                {/* 模块 1：自我介绍 */}
                <div className="space-y-5">
                  <h1 className="text-base md:text-lg text-white/95 font-medium tracking-[0.2em] select-none">
                    自我介绍
                  </h1>
                  
                  <div className="space-y-5">
                    <p className="text-[14.5px] text-white/90 leading-relaxed tracking-[0.15em] font-light">
                      Hi，你好，我是阿旭。
                    </p>
                    <p className="text-[14.5px] text-white/70 leading-relaxed tracking-[0.15em] font-light">
                      一名 WPS 的 AI Product Manager，已经在 WPS 工作快要 3 年了。除此之外，没有太多的花哨标签。
                    </p>
                    <p className="text-[14.5px] text-white/70 leading-relaxed tracking-[0.15em] font-light">
                      我很热爱产品经理这个工作，且自我判断相对“理想主义” and “old school”。因为做产品，本质是研究人。
                    </p>
                    <p className="text-[14.5px] text-white/70 leading-relaxed tracking-[0.15em] font-light">
                      本站的意义在于方便各位朋友快速了解我。
                    </p>
                  </div>
                </div>

                {/* 模块 2：过往经历 */}
                <div className="space-y-5 pt-2">
                  <h1 className="text-base md:text-lg text-white/95 font-medium tracking-[0.2em] select-none">
                    过往经历
                  </h1>
                  
                  <div className="space-y-10 pl-[1px]">
                    {/* 分段 1：教育经历 */}
                    <div className="space-y-4">
                      <h2 className="text-[13px] md:text-sm text-white/80 font-medium tracking-[0.15em] block select-none">
                        教育经历
                      </h2>
                      <div className="pl-4 border-l border-white/10 space-y-4">
                        <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 select-none">
                          <h3 className="text-[14.5px] text-white/95 font-medium tracking-wider">
                            北京师范大学（硕士） · 应用心理
                          </h3>
                          <span className="text-xs font-serif text-white/35">2021 - 2023</span>
                        </div>
                        
                        <div className="space-y-3 text-[13.5px] text-white/65 leading-loose tracking-[0.12em] font-light">
                          <p>
                            在读硕士期间，选择“心理与大数据方向”。由于方向特性，很早就了解并接触Transformer架构的模型，跑过Bert模型来做过知识图谱，是AI的较早实践者。
                          </p>
                          
                          <div className="space-y-2 pt-1">
                            <div className="text-[13px] text-white/90 font-medium select-none">
                              两份学术结果：
                            </div>
                            
                            <ul className="space-y-2.5 pl-3.5">
                              <li className="list-disc marker:text-white/20">
                                心理理论层面：构建了
                                <Link 
                                  href="https://www.kdocs.cn/l/cp8eZdZj9NKV?f=301" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sky-400 hover:text-sky-300 transition-colors duration-300 cursor-pointer font-medium underline underline-offset-4 decoration-sky-400/20 hover:decoration-sky-300/60 pl-1"
                                >
                                  《心理需求模型》
                                </Link>
                                ；
                              </li>
                              <li className="list-disc marker:text-white/20 leading-relaxed">
                                学术与前沿应用：参与并挂名了儿童自闭症评估相关的 SCI 论文
                                <Link 
                                  href="https://onlinelibrary.wiley.com/doi/abs/10.1002/cav.2059" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sky-400 hover:text-sky-300 transition-colors duration-300 cursor-pointer font-medium italic underline underline-offset-4 decoration-sky-400/20 hover:decoration-sky-300/60 break-words pl-1"
                                >
                                  “Intelligent recognition of portrait sketch components for child autism assessment”
                                </Link>
                                。
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 分段 2：实习经历 */}
                    <div className="space-y-4">
                      <h2 className="text-[13px] md:text-sm text-white/80 font-medium tracking-[0.15em] block select-none">
                        实习经历
                      </h2>
                      <div className="pl-4 border-l border-white/10 text-[13.5px] text-white/70 leading-relaxed tracking-[0.12em] font-light space-y-1.5">
                        <p>
                          2022.04 - 2022.08 实习于 <strong className="text-white font-medium">西山居</strong>，担任行业研究与情报分析实习生；
                        </p>
                        <p>
                          2022.08 - 2022.11 实习于 <strong className="text-white font-medium">快手（北京）</strong>，担任用户研究与数据分析实习生。
                        </p>
                        <div className="pt-2.5 text-[13.5px] text-white/70 leading-relaxed tracking-[0.12em] font-light space-y-1.5">
                          <p>
                            秋招时拿了这些offer：美团（sp）、百度、京东、美的以及金山办公，最后选择金山办公，一部分原因是基于对AI将重塑办公生产力的思考。
                          </p>
                          <p className="text-white/85 font-normal">
                            随后在2023.07入职金山办公（WPS）
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 分段 3：当前工作 */}
                    <div className="space-y-4">
                      <h2 className="text-[13px] md:text-sm text-white/80 font-medium tracking-[0.15em] block select-none">
                        当前工作
                      </h2>
                      <div className="pl-4 border-l border-white/10 space-y-5">
                        <div className="space-y-5">
                          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-1 select-none">
                            <h3 className="text-[14.5px] text-white/95 font-medium tracking-wider">
                              金山办公（WPS）- AI产品经理
                            </h3>
                            <span className="text-xs font-serif text-white/35">2023.07 - 至今</span>
                          </div>
                          
                          <div className="space-y-4 text-[13.5px] text-white/65 leading-loose tracking-[0.12em] font-light">
                            {/* 大厂高绩效核心高光背书 */}
                            <p className="bg-white/[0.01] border border-white/[0.02] p-4 rounded-sm text-[13px] text-white/80 leading-relaxed">
                              过去一共参与两次年度绩效评比，<span className="text-white/90 font-medium">均为A（前20%）</span>（PS：入职首年不参与评比）
                            </p>

                            <div className="space-y-2 text-white/70 font-light leading-relaxed">
                              <p>
                                三年中，最先在B端事业部做一些中后台的事情（WPS账号系统、企业通讯录）。
                              </p>
                              <p>
                                随后来到C端-Office事业部，一直从事AI相关的工作，从<span className="text-white/90 font-normal">灵犀AI（Chat bot）</span>到如今的<span className="text-white/90 font-normal">WPS Cowork（Agent）</span>。
                              </p>
                            </div>

                            {/* 跳转至完整工作经历页的交互式 CTA 按钮 */}
                            <div className="pt-4 select-none">
                              <Link 
                                href="/experience"
                                className="group inline-flex items-center gap-1.5 text-xs md:text-[13px] text-sky-400 hover:text-sky-300 transition-colors duration-300 cursor-pointer pointer-events-auto font-medium tracking-wider"
                              >
                                <span>了解更多工作经历</span>
                                <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

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
              className="md:col-span-4 h-auto md:h-full overflow-visible md:overflow-y-auto pr-0 md:pl-10 space-y-8 scroll-smooth pb-[5vh] md:pb-[15vh] hide-scrollbar flex flex-col items-center md:items-start mt-12 md:mt-0"
              style={{
                scrollbarWidth: "none", // Firefox 隐藏滚动条
                msOverflowStyle: "none" // IE 隐藏滚动条
              }}
            >
              {/* 人像原片 2 (直接采用原生 img 并设为 h-auto，彻底摒弃任何可能有裁切的外层 aspect/overflow 类，百分之百原画无损全显) */}
              <div className="relative group/img2 w-[180px] md:w-[260px]">
                <img 
                  src="/alice-gen-1779295412219.webp" 
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