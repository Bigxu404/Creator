"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { defaultPlaylist, Track } from "@/lib/playlist";

const tabs = [
  { name: "首页", mobileName: "首页", path: "/", symbol: "♩" },
  { name: "关于我 About", mobileName: "关于", path: "/about", symbol: "♪" },
  { name: "工作经历 Experience", mobileName: "经历", path: "/experience", symbol: "♭" },
  { name: "作品集 Works", mobileName: "作品", path: "/works", symbol: "♫" },
  { name: "Blog 随笔", mobileName: "Blog", path: "/blog", symbol: "♬" },
];

interface LrcLine {
  time: number;
  text: string;
}

// 解决 Safari 等浏览器下 HTMLMediaElement.play() 可能返回 undefined 导致链式调用 .then()/.catch() 崩溃的兼容性辅助函数
const safePlay = (audio: HTMLAudioElement | null, callback?: () => void) => {
  if (!audio) return;
  try {
    const playPromise = audio.play();
    if (playPromise !== undefined && typeof playPromise.then === "function") {
      playPromise
        .then(() => {
          if (callback) callback();
        })
        .catch((error) => {
          console.log("音频播放被阻止或中断:", error);
        });
    } else {
      // 如果返回 undefined（老版本 Safari），则直接执行回调
      if (callback) callback();
    }
  } catch (error) {
    console.error("播放音频出错:", error);
  }
};

export function NavigationBar() {
  const pathname = usePathname();
  const isContactActive = pathname === "/contact";

  // 1. 【核心：100% 杜绝 SSR Mismatch 报错与幽灵死锁】
  const [isMounted, setIsMounted] = useState(false);

  // 用户要求：进入网页的第一首歌固定播放 In a notebook
  // 查找 In a notebook 歌曲在 defaultPlaylist 中的索引位置，作为同步初始值或挂载初始值
  const initialIndex = defaultPlaylist.findIndex(t => t.id === "in-a-notebook");
  const fallbackIndex = initialIndex !== -1 ? initialIndex : 0;

  const [currentIndex, setCurrentIndex] = useState(fallbackIndex);
  const currentTrack = isMounted ? defaultPlaylist[currentIndex] : null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [showConsole, setShowConsole] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [lyrics, setLyrics] = useState<LrcLine[]>([]);
  const [currentLrcIndex, setCurrentLrcIndex] = useState(-1);

  // 跟踪已播历史，进入网页时第一首为 In a notebook 的索引
  const [playedHistory, setPlayedHistory] = useState<number[]>([fallbackIndex]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);
  const consoleContainerRef = useRef<HTMLDivElement>(null);

  // 2. 只有在组件【完全在浏览器端挂载成功 (Mounted)】之后，才安全激活锁
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 点击外部自动隐藏控制台
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showConsole && 
        consoleContainerRef.current && 
        !consoleContainerRef.current.contains(event.target as Node)
      ) {
        setShowConsole(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showConsole]);

  // 3. 核心加载效应：加载当前轨，配置基本事件，异步载入歌词
  useEffect(() => {
    if (!isMounted || !currentTrack) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    // 真正的 Mp3 加载通道，100% 干净
    const audio = new Audio(currentTrack.src);
    audio.volume = 0.45;
    audioRef.current = audio;

    setCurrentTime(0);
    setDuration(0);

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime * 1000);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration * 1000);
    };

    const handleEnded = () => {
      handleNext();
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    if (isPlaying) {
      safePlay(audio);
    }

    // 加载歌词
    setLyrics([]);
    setCurrentLrcIndex(-1);
    if (currentTrack.lrcPath) {
      fetch(currentTrack.lrcPath)
        .then((res) => res.text())
        .then((text) => parseLrc(text))
        .catch((err) => console.error("歌词加载失败:", err));
    }

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.pause();
    };
  }, [currentIndex, isMounted]);

  // 4. 当 isPlaying 被用户手动切换时，仅做底层物理播放/暂停响应，实现状态隔离
  useEffect(() => {
    if (!isMounted || !audioRef.current) return;
    if (isPlaying) {
      safePlay(audioRef.current);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, isMounted]);

  // 解析歌词
  const parseLrc = (lrcText: string) => {
    const lines = lrcText.split("\n");
    const parsed: LrcLine[] = [];

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
        try {
          const jsonObj = JSON.parse(trimmed);
          if (typeof jsonObj.t === "number" && Array.isArray(jsonObj.c)) {
            const textContent = jsonObj.c.map((item: any) => item.tx || "").join("");
            parsed.push({ time: jsonObj.t, text: textContent });
          }
        } catch (e) {}
        return;
      }

      const timeRegex = /\[(\d+):(\d+)(?:\.(\d+))?\]/g;
      const tags: string[] = [];
      const text = trimmed.replace(timeRegex, (m) => {
        tags.push(m);
        return "";
      }).trim();

      tags.forEach((tag) => {
        const parts = tag.slice(1, -1).split(":");
        const minutes = parseInt(parts[0], 10);
        const secondsParts = parts[1].split(".");
        const seconds = parseInt(secondsParts[0], 10);
        const ms = secondsParts[1] ? parseInt(secondsParts[1].padEnd(3, "0").slice(0, 3), 10) : 0;
        const totalMs = minutes * 60 * 1000 + seconds * 1000 + ms;
        parsed.push({ time: totalMs, text: text });
      });
    });

    parsed.sort((a, b) => a.time - b.time);
    setLyrics(parsed);
  };

  // 更新歌词进度
  useEffect(() => {
    if (lyrics.length === 0) return;
    let activeIndex = -1;
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) {
        activeIndex = i;
      } else {
        break;
      }
    }
    if (activeIndex !== currentLrcIndex) {
      setCurrentLrcIndex(activeIndex);
    }
  }, [currentTime, lyrics, currentLrcIndex]);

  // 歌词滚动
  useEffect(() => {
    if (lyricsContainerRef.current && currentLrcIndex !== -1) {
      const activeElement = lyricsContainerRef.current.children[currentLrcIndex] as HTMLElement;
      if (activeElement) {
        const containerHeight = lyricsContainerRef.current.clientHeight;
        const elementOffsetTop = activeElement.offsetTop;
        const elementHeight = activeElement.clientHeight;

        lyricsContainerRef.current.scrollTo({
          top: elementOffsetTop - containerHeight / 2 + elementHeight / 2,
          behavior: "smooth"
        });
      }
    }
  }, [currentLrcIndex]);

  // 首次点击/手势破除浏览器 Autoplay 策略，强制鸣响并保持 ON 状态
  useEffect(() => {
    if (!isMounted) return;
    let active = true;
    const handleFirstInteraction = () => {
      if (!active) return;
      if (audioRef.current && isPlaying) {
        safePlay(audioRef.current, () => setIsPlaying(true));
      }
      cleanup();
    };

    const cleanup = () => {
      active = false;
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("touchstart", handleFirstInteraction);

    if (audioRef.current && isPlaying) {
      safePlay(audioRef.current, () => setIsPlaying(true));
    }

    return cleanup;
  }, [isPlaying, isMounted]);

  // 播放暂停动作切换
  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  /**
   * 【精简洗牌随机播放算法】
   */
  const handleNext = () => {
    const totalCount = defaultPlaylist.length;
    
    let currentHistory = [...playedHistory];
    if (currentHistory.length >= totalCount) {
      currentHistory = [];
    }

    const remainingIndices: number[] = [];
    for (let i = 0; i < totalCount; i++) {
      if (!currentHistory.includes(i)) {
        remainingIndices.push(i);
      }
    }

    if (remainingIndices.length > 0) {
      const randomIndex = remainingIndices[Math.floor(Math.random() * remainingIndices.length)];
      setPlayedHistory([...currentHistory, randomIndex]);
      setCurrentIndex(randomIndex);
    } else {
      const fallIndex = Math.floor(Math.random() * totalCount);
      setPlayedHistory([fallIndex]);
      setCurrentIndex(fallIndex);
    }
    setIsPlaying(true);
  };

  // 上一首
  const handlePrev = () => {
    const totalCount = defaultPlaylist.length;
    if (playedHistory.length > 1) {
      const updatedHistory = [...playedHistory];
      updatedHistory.pop(); // 弹出当前播放歌曲
      const prevIndex = updatedHistory[updatedHistory.length - 1]; // 拿到前一首
      setPlayedHistory(updatedHistory);
      setCurrentIndex(prevIndex);
    } else {
      const randomIndex = Math.floor(Math.random() * totalCount);
      setPlayedHistory([randomIndex]);
      setCurrentIndex(randomIndex);
    }
    setIsPlaying(true);
  };

  const formatTime = (ms: number) => {
    if (isNaN(ms) || ms < 0) return "00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <>
      {/* 1. 【PC 端】左侧主导航栏 (仅在 md 及以上大屏显示) */}
      <div className="hidden md:block fixed top-10 left-12 z-50">
        <nav className="relative flex items-center gap-8 px-4 pb-2">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path || (pathname.startsWith(tab.path) && tab.path !== "/");
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={cn(
                  "relative pb-1 text-xs tracking-widest transition-colors duration-500 select-none",
                  isActive ? "text-white font-medium" : "text-white/35 hover:text-white/80"
                )}
              >
                <span className="relative z-10">{tab.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabNote"
                    className="absolute bottom-[-14px] left-1/2 -translate-x-1/2 text-[11px] text-white/90 font-serif leading-none select-none pointer-events-none z-20"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  >
                    {tab.symbol}
                  </motion.div>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 2. 【移动端】底端悬浮高透美学胶囊导航栏 (仅在 md 以下小屏显示) */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[390px]">
        <nav className="flex items-center justify-around py-3 px-3 rounded-full border border-white/[0.04] bg-black/25 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.3)] relative">
          {tabs.map((tab) => {
            const isActive = pathname === tab.path || (pathname.startsWith(tab.path) && tab.path !== "/");
            return (
              <Link
                key={tab.path}
                href={tab.path}
                className={cn(
                  "relative text-[11px] tracking-[0.2em] transition-colors duration-300 px-2 py-0.5 flex flex-col items-center gap-1 select-none",
                  isActive ? "text-white font-medium scale-[1.02]" : "text-white/40 hover:text-white/70"
                )}
              >
                <span className="relative z-10">{tab.mobileName}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeTabNoteMobile"
                    className="text-[10px] text-white/90 leading-none select-none pointer-events-none"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  >
                    {tab.symbol}
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 3. 【自适应】右侧播放控制器栏 (移动端略微往里、往上缩进以防触及手机屏幕安全边缘) */}
      <div className="fixed top-6 md:top-10 right-6 md:right-12 z-50 flex items-baseline gap-6 md:gap-10 pointer-events-auto">
        
        <div ref={consoleContainerRef} className="relative flex items-baseline pointer-events-auto">
          <button
            onClick={() => setShowConsole(!showConsole)}
            className="group flex items-baseline gap-2.5 h-6 px-1.5 focus:outline-none cursor-pointer select-none"
            title="点击展开极简唱片机"
          >
            {/* 5 根极细声谱条 */}
            <div className="inline-flex items-end gap-[1.5px] h-[9px] w-4 overflow-hidden relative top-[-1px]" onClick={togglePlay}>
              {[1, 2, 3, 4, 5].map((bar) => {
                const delay = bar * 0.15;
                const duration = 0.6 + bar * 0.1;
                return (
                  <span
                    key={bar}
                    className="w-[1.2px] bg-white rounded-full transition-all duration-500 origin-bottom"
                    style={{
                      height: isPlaying ? "100%" : "2.5px",
                      animation: isPlaying ? `soundwavePlay ${duration}s ease-in-out ${delay}s infinite alternate` : "none"
                    }}
                  />
                );
              })}
            </div>

            {/* 状态与歌名 */}
            <span className="text-[10px] text-white/35 tracking-[0.15em] font-light group-hover:text-white/80 transition-colors duration-500 flex items-baseline gap-1.5 leading-none">
              <span className="max-w-[80px] sm:max-w-[120px] truncate uppercase">{currentTrack ? currentTrack.title : "LOADING..."}</span>
              <span className="text-[8px] text-white/20 relative top-[-1.5px] font-serif">//</span>
              <span className="text-[8px] text-white/40">{isPlaying ? "ON" : "MUTED"}</span>
            </span>
          </button>

          {/* 唱片控制台卡片 (添加响应式宽度，防止在超窄手机屏上溢出) */}
          <AnimatePresence>
            {showConsole && currentTrack && (
              <motion.div
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute right-0 top-10 w-[280px] sm:w-[300px] p-5 rounded-xl border border-white/5 bg-[#0a0a0a]/90 backdrop-blur-3xl shadow-2xl flex flex-col gap-4 select-none z-50"
              >
                {/* 唱片旋转动效 */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full border border-white/10 bg-black overflow-hidden flex items-center justify-center flex-shrink-0">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(255,255,255,0.05)_50%,transparent_55%)]" />
                    <div 
                      className="w-8 h-8 rounded-full bg-neutral-900 border border-white/5 flex items-center justify-center text-[10px] text-white/80 font-serif"
                      style={{ animation: isPlaying ? "spin 6s linear infinite" : "none" }}
                    >
                      ♩
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs text-white font-medium tracking-wider truncate">{currentTrack.title}</h4>
                    <p className="text-[10px] text-white/40 tracking-wider truncate mt-0.5">{currentTrack.artist}</p>
                  </div>
                </div>

                {/* 极细进度条 */}
                <div className="space-y-1.5">
                  <div className="relative w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white/60 rounded-full transition-all duration-100"
                      style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[8px] text-white/30 font-serif tracking-widest">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* 物理按钮控制模块 */}
                <div className="flex items-center justify-between pt-1 border-t border-white/5">
                  <button
                    onClick={() => setShowLyrics(!showLyrics)}
                    className={cn(
                      "text-[9px] tracking-[0.2em] px-2 py-1 rounded transition-all duration-300 font-serif",
                      showLyrics ? "text-white bg-white/10" : "text-white/30 hover:text-white/70"
                    )}
                    title="展示歌词"
                  >
                    LRC
                  </button>

                  <div className="flex items-center gap-4">
                    <button onClick={handlePrev} className="text-white/40 hover:text-white transition-colors duration-300 focus:outline-none">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                      </svg>
                    </button>

                    <button onClick={togglePlay} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 border border-white/5 flex items-center justify-center text-white transition-all duration-300 focus:outline-none">
                      {isPlaying ? (
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 fill-current ml-[2.5px]" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      )}
                    </button>

                    <button onClick={handleNext} className="text-white/40 hover:text-white transition-colors duration-300 focus:outline-none">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M6 18l8.5-6L6 6zm9-12v12h2V6z"/>
                      </svg>
                    </button>
                  </div>

                  <span className="text-[8px] text-white/25 font-serif tracking-[0.25em]">
                    {playedHistory.length}/{defaultPlaylist.length}
                  </span>
                </div>

                {/* 同步滚动歌词 */}
                <AnimatePresence>
                  {showLyrics && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 120, opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden border-t border-white/5 pt-3"
                    >
                      {lyrics.length > 0 ? (
                        <div ref={lyricsContainerRef} className="lyrics-no-scrollbar h-full overflow-y-auto pr-1 space-y-3.5 text-center scroll-smooth">
                          {lyrics.map((line, idx) => {
                            const isCurrent = idx === currentLrcIndex;
                            return (
                              <div
                                key={idx}
                                className={cn(
                                  "text-[10px] tracking-wide font-light transition-all duration-500 px-2 leading-relaxed",
                                  isCurrent ? "text-white font-medium scale-[1.03] opacity-100" : "text-white/25 opacity-40 scale-100"
                                )}
                              >
                                {line.text}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-[9px] text-white/20 tracking-widest uppercase font-serif">
                          {currentTrack && currentTrack.lrcPath ? "正在载入歌词..." : "暂无歌词"}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 联系我 Contact 按钮 (PC 端显示完整文本，移动端缩写为极简的 Contact 文本并往上提) */}
        <Link
          href="/contact"
          className={cn(
            "relative pb-3 text-xs tracking-widest transition-colors duration-500 select-none block leading-none",
            isContactActive ? "text-white font-medium" : "text-white/35 hover:text-white/80"
          )}
        >
          <span className="relative z-10 pb-1 hidden sm:inline">联系我 Contact</span>
          <span className="relative z-10 pb-1 sm:hidden text-[10px]">Contact</span>
          {isContactActive && (
            <motion.div
              layoutId="activeContactBead"
              className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 text-[11px] text-white/90 font-serif leading-none select-none pointer-events-none z-20"
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
            >
              ♮
            </motion.div>
          )}
        </Link>
      </div>

      <style jsx global>{`
        @keyframes soundwavePlay {
          0% { transform: scaleY(0.2); }
          100% { transform: scaleY(1.2); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .lyrics-no-scrollbar {
          scrollbar-width: none !important;
          -ms-overflow-style: none !important;
        }
        .lyrics-no-scrollbar::-webkit-scrollbar {
          display: none !important;
        }
      `}</style>
    </>
  );
}
