"use client";

import Spline from "@splinetool/react-spline";

export function DynamicBackground() {
  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      <Spline 
        // 这是一个高质量的 Spline 3D 房间/场景的占位链接。
        // 等你有专门的露营 3D 资产（通过 Spline 导出的链接），直接替换下面的 URL 即可。
        scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" 
      />
    </div>
  );
}
