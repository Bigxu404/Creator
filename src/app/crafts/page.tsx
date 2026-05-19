import { NeoFeedShowcase } from "@/components/NeoFeedShowcase";

export default function CraftsPage() {
  return (
    <main className="min-h-screen bg-black pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h1 className="text-4xl font-bold mb-4">创造 Crafts</h1>
        <p className="text-white/50 text-lg">
          我亲手从 0 到 1 打造的完整级产品与工具。
        </p>
      </div>

      <div className="w-full h-px bg-white/10 max-w-7xl mx-auto mb-12" />

      {/* Featured Project: NeoFeed */}
      <NeoFeedShowcase />
    </main>
  );
}
