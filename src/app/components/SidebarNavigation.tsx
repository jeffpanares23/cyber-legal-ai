// File: src/app/components/SidebarNavigation.tsx

"use client";

import { useRouter } from "next/navigation";
import { Home, Bookmark, FileText, Bell, Plus } from "lucide-react";

export default function SidebarNavigation({
    onNewChatClick,
}: {
    onNewChatClick: () => void;
}) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Top Nav Items */}
      <nav className="text-sm flex flex-col gap-2">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
        >
          <Home size={18} /> Home
        </button>
        <button
          className="flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
        >
          <Bookmark size={18} /> Bookmarks
        </button>
        <button
          className="flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
        >
          <FileText size={18} /> Drafts & Templates
        </button>
        <button
          className="flex items-center gap-3 px-2 py-2 rounded-md cursor-pointer hover:bg-zinc-800 text-zinc-300 hover:text-white transition"
        >
          <Bell size={18} /> Alerts
        </button>
      </nav>

      {/* New Chat Button */}
      <button
        onClick={onNewChatClick}
        className="w-full mt-4 flex items-center justify-center gap-2 px-3 py-2 bg-zinc-800 cursor-pointer hover:bg-zinc-700 text-white text-sm rounded-md transition"
      >
        <Plus size={16} /> New Chat
      </button>
    </div>
  );
}
