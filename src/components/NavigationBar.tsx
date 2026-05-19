"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const tabs = [
  { name: "主页", path: "/" },
  { name: "创造 Crafts", path: "/crafts" },
  { name: "履历 Work", path: "/work" },
  { name: "探索 Explorations", path: "/explorations" },
  { name: "思考 Thoughts", path: "/thoughts" },
];

export function NavigationBar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
      <nav className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path || (pathname.startsWith(tab.path) && tab.path !== "/");
          return (
            <Link
              key={tab.path}
              href={tab.path}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                isActive ? "text-black" : "text-white/60 hover:text-white hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full z-0"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
