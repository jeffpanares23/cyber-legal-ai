"use client";

/*
  Enhanced ChatHeader Component
  Design: Based on CyberLegal updated UI (April 2025)
*/

import { FC } from "react";
import { Menu } from "lucide-react";
import { logout } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Optional - use shadcn/ui avatar

interface ChatHeaderProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userName: string;
}

const ChatHeader: FC<ChatHeaderProps> = ({ setSidebarOpen, userName }) => {
  return (
    <header className="w-full px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Left: Mobile Menu + Title */}
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-1 rounded hover:bg-white/10 transition"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5 text-white" />
        </button>
        <h1 className="text-xl font-poppins font-semibold text-white">
          Cyber<span className="text-pink-500">Legal</span>
        </h1>
      </div>

      {/* Right: Avatar and Dropdown */}
      <div className="flex items-center gap-3">
        <span className="text-sm text-white hidden sm:inline">
          {userName} ▾
        </span>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarImage src="/avatar.png" alt={userName} />
          <AvatarFallback className="bg-pink-500 text-white">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
        <button
          onClick={logout}
          className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition hidden md:inline"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default ChatHeader;
