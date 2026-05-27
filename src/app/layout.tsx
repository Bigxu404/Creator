import type { Metadata } from "next";
import "./globals.css";
import { DynamicBackground } from "@/components/DynamicBackground";
import { NavigationBar } from "@/components/NavigationBar";
import { GlobalPreloader } from "@/components/GlobalPreloader";

export const metadata: Metadata = {
  title: "xu的作品集",
  description: "阿旭的个人作品集与 3D 营地宇宙",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 用🌟作为网页的标签页 Favicon 图标 */}
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌟</text></svg>"
        />
      </head>
      <body className="bg-black text-white m-0 p-0 overflow-hidden w-screen h-screen">
        <GlobalPreloader />
        <DynamicBackground />
        <div className="relative z-10 pointer-events-none">
          {children}
        </div>
        <NavigationBar />
      </body>
    </html>
  );
}
