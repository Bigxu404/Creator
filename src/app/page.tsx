import { DynamicBackground } from "@/components/DynamicBackground";

export default function Home() {
  return (
    <main className="w-screen h-screen pointer-events-none">
      {/* 动态背景已经在 layout.tsx 中挂载，这里不再重复挂载，只提供一个透明的壳 */}
    </main>
  );
}
