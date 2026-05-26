import type { Metadata } from "next";
import "./globals.css";
import { DynamicBackground } from "@/components/DynamicBackground";
import { NavigationBar } from "@/components/NavigationBar";

export const metadata: Metadata = {
  title: "Campsite Diorama | 3D Space",
  description: "A 3D camping scene using Three.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-black text-white m-0 p-0 overflow-hidden w-screen h-screen">
        <DynamicBackground />
        <div className="relative z-10 pointer-events-none">
          {children}
        </div>
        <NavigationBar />
      </body>
    </html>
  );
}
