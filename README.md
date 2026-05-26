# ✦ Creator Portfolio

> **“L'existence précède l'essence.” ( 存在先于本质 ) —— 让-保罗·萨特**

这是一个专为全栈工程师、独立开发者与内容创作者量身定制的**高定制、人文感、极简主义个人作品集与创意日志系统**。基于全新的 Next.js 16 (Turbopack) 与 React 技术栈构建，融合了极致的像素级排版、细腻的物理缓动动效与沉浸式声学唱片机，在数字世界中开辟一处静谧、纯粹、极具质感的人文美学空间。

🔗 独立博客主页：[www.goodxu.cn](https://www.goodxu.cn)

---

## 🎨 核心美学与设计哲学

- **极简主义排版 (Premium Minimalist Typography)**：
  严格遵循报刊社论式 (Editorial) 的留白与对齐。精细调节的字间距 (`tracking-widest`)、温润的透明度渐变 (`text-white/70`) 与 Times New Roman 优雅斜体衬线字体的精微点缀，让字里行间透露出深厚的独立思考与哲学底色。
- **声学画布 (Acoustic Canvas)**：
  右上角悬浮着一个极简而充满细节的物理唱片机控制台。
  - **动态声谱呼吸**：5 根极细高感度音频柱，随播放状态物理起伏。
  - **全功能唱片交互**：支持唱片 3D 匀速旋转动效、高保真播放进度条与歌曲切换历史（洗牌随机随机算法）。
  - **LRC 同步歌词引擎**：自主实现 `.lrc` 时间标签解析算法，平滑、同步且带透明度衰减地在悬浮卡片中滚动展示同步歌词。
  - **Autoplay 阻滞破除**：通过首屏无感交互监听，完美破除现代浏览器对 HTML5 Audio 的自动播放限制。
- **高阶互动叙事 (Interactive Case Study)**：
  “作品集 Works” 下的 NeoFeed 栏目放弃了泛滥且廉价的模版化展示，采用**互动案例分析 (Case Study)** 叙事：
  - **对比折射卡片 (Before/After Card)**：剔除图标噪音，用最纯粹的排版和加粗文案形成鲜明的问题-解决方案对比。
  - **CLI 终端一键检索卡片 (neofeed_cli.sh)**：采用代码级高亮，模拟完整的 CLI 命令行检索高维网络资产的运行逻辑。
  - **Playbook 自动化工作流**：将 “微信公众号文章一键保存、后台自动抓取、AI 整理沉淀、Cursor (或 Codex) CLI 一键调用” 的完整链路，通过卡片阶梯序列动画顺滑拆解。
- **双图并列平铺 (High-definition Double Tiled Showcase)**：
  在 “Blog 随笔” 中，引入多层微光投影，双大图以 **`0.7` 与 `0.85` 秒** 的阶梯式延迟平滑滑入，悬停时触发微弱放大与边框高亮，极具画廊般的纵深感。

---

## 🛠 技术栈与工程架构

- **核心框架**：**Next.js 16 (App Router)** & **React 19** —— 基于 Turbopack 带来的瞬时热热重载与编译。
- **样式方案**：**Tailwind CSS** —— 极致精简、模块化的暗黑底色类，100% 响应式移动端兼容。
- **动画引擎**：**Framer Motion 11** —— 严格的物理回弹（Spring）与延迟缓冲曲线（Ease），避免多余的过度动画。
- **音频系统**：基于原生 **HTML5 Audio API** 封装的防 SSR Mismatch 隔离音频控制器。
- **资源托管**：物理源图分类存放于物理目录并安全软链接至 `public/` 下，实现高效版本管理。

---

## 🚀 快速开始

### 1. 克隆与依赖安装
确保您的开发环境中安装了最新版 Node.js (推荐 v20+)。

```bash
# 安装所需依赖
npm install
```

### 2. 启动开发服务器

```bash
# 启动热重载开发服务器
npm run dev
```
打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可在本地实时预览和开发。

### 3. 生成静态生产构建
```bash
# 进行 Next.js 生产环境静态导出与优化编译
npm run build

# 本地测试生产环境包
npm run start
```

---

## 📂 项目结构指南

```bash
├── src/
│   ├── app/                      # Next.js App Router 页面路由
│   │   ├── page.tsx              # 首页 (存在先于本质哲学宣言)
│   │   ├── layout.tsx            # 全局布局 (挂载音频、背景、全局样式)
│   │   ├── about/                # “关于我” 栏目
│   │   ├── experience/           # “工作经历” 栏目
│   │   ├── works/                # “作品集” NeoFeed 高定案例分析页
│   │   └── blog/                 # “Blog 随笔” 双大图高端平铺页
│   ├── components/               # 可复用高精核心组件
│   │   ├── NavigationBar.tsx     # 整合了声学唱片机的置顶主导航栏
│   │   ├── DynamicBackground.tsx # 迷离动态氛围星空背景
│   │   └── NeoFeedShowcase.tsx   # NeoFeed 入口主视觉组件
│   ├── lib/                      # 核心工具库
│   │   ├── playlist.ts           # 极简唱片机默认播放歌单配置
│   │   └── utils.ts              # Tailwind 类合并 (clsx & tailwind-merge)
│   └── globals.css               # 全局 CSS 注入 (全站隐藏滚动条、基础动画)
├── public/                       # 静态资源，与物理 /picture /video 建立安全软链
├── 0527.md                       # 2026-05-27 最新重大重构与功能迭代变更日志
└── README.md                     # 本说明文件
```

---

## 🕊 独立宣言
这是一个独立思考者的数字自留地。在这里，代码不仅仅是实现功能的逻辑，更是个人审美和人文关怀在二进制世界里的具体投射。感谢您的好奇心，期待与你在数字荒原中擦出思想的火花。
