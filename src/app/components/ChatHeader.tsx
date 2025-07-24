"use client";

import { FC } from "react";
import { Menu } from "lucide-react";
import UserMenu from "../components/chat/UserMenu"; // ✅ import your new dropdown

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

      {/* Right: Profile Dropdown */}
      <UserMenu userName={userName} />
    </header>
  );
};

export default ChatHeader;
