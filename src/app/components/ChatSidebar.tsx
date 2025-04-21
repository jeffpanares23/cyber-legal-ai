"use client";

import { FC } from "react";
import SavedChatsSidebar from "./SavedChatsSidebar";
import { ChatSession } from "@/types/ChatTypes";
import SidebarNavigation from "./SidebarNavigation";

interface ChatSidebarProps {
  onNewChatClick: () => void;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelectSession: (session: ChatSession) => void;
  sessions: ChatSession[];
  activeId: string | null;
  setSessions: React.Dispatch<React.SetStateAction<ChatSession[]>>;
}

const ChatSidebar: FC<ChatSidebarProps> = ({
  sidebarOpen,
  setSidebarOpen,
  onSelectSession,
  sessions,
  activeId,
  setSessions,
  onNewChatClick,
}) => {
  const handleClose = () => setSidebarOpen(false);
  return (
    <>
      <aside
        className={`overflow-auto fixed md:static z-30 top-0 left-0 h-full w-64 px-4 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="sticky top-0 p-4">
          <h2 className="text-lg font-semibold mb-4">Cyberlegal.AI</h2>
        </div>
        <SidebarNavigation onNewChatClick={onNewChatClick} />

        {/* ✅ Forward session props to SavedChatsSidebar */}
        <SavedChatsSidebar
          onSelect={(session) => {
            onSelectSession(session);
            setSidebarOpen(false);
          }}
          sessions={sessions}
          activeId={activeId}
          setSessions={setSessions}
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
