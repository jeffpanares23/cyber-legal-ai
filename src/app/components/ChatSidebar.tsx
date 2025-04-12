"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import SavedChatsSidebar from "./SavedChatsSidebar";
import { ChatSession } from "../../types/ChatTypes";

interface ChatSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectSession: (session: ChatSession) => void;
}

const ChatSidebar: FC<ChatSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  onSelectSession,
}) => {
  const router = useRouter();
  const goHome = () => router.push("/");
  const handleClose = () => setSidebarOpen(false);

  return (
    <>
      <aside className={`fixed md:static z-30 top-0 left-0 h-full w-64 bg-zinc-950 border-r border-zinc-800 p-4 transform transition-transform duration-200 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <h2 className="text-lg font-semibold mb-4">Cyberlegal.AI</h2>
        <nav className="text-sm space-y-3 flex flex-col">
          <button onClick={goHome} className="text-left text-zinc-300 hover:text-white">Home</button>
          <button className="text-left text-zinc-300 hover:text-white">Cyber Legal Chat</button>
          <button className="text-left text-zinc-300 hover:text-white">My Saved Questions</button>
        </nav>

        <SavedChatsSidebar
          onSelect={(session) => {
            onSelectSession(session);
            setSidebarOpen(false);
          }}
        />

        <div className="mt-auto pt-4 border-t border-zinc-800 text-xs text-zinc-600">
          © 2025 Cyberlegal.AI
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={handleClose}
        ></div>
      )}
    </>
  );
};

export default ChatSidebar;
