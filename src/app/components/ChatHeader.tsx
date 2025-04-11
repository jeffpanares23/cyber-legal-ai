"use client";

/*
  Component: ChatHeader
  Description: Displays the top navbar of the chatbot including the mobile menu and logout.
*/

import { FC } from "react";
import { Menu } from "lucide-react";
import { logout } from "@/lib/auth";

interface ChatHeaderProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatHeader: FC<ChatHeaderProps> = ({ setSidebarOpen }) => {
  return (
    <header className="bg-zinc-900 border-b border-zinc-800 p-4 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <button className="md:hidden" onClick={() => setSidebarOpen(true)}>
          <Menu />
        </button>
        <h1 className="font-semibold">Cyberlegal.AI Chat Assistant</h1>
      </div>
      <button
        onClick={logout}
        className="text-sm px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default ChatHeader;
