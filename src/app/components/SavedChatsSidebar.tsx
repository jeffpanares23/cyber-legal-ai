// File: src/app/components/SavedChatsSidebar.tsx
"use client";

import { useEffect, useState } from "react";
import { ChatSession } from "@/types/ChatTypes";
import { loadChatSessions,
    saveChatSessions,
    deleteChatSession,
    renameChatSession, } from "@/utils/chatStorage";
import { MoreHorizontal } from "lucide-react";

export default function SavedChatsSidebar({
  onSelect,
}: {
  onSelect: (session: ChatSession) => void;
}) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");

  useEffect(() => {
    const stored = loadChatSessions();
    setSessions(stored);
  }, []);

  const handleRename = (id: string) => {
    const updated = sessions.map((s) =>
      s.id === id ? { ...s, title: editTitle } : s
    );
    setSessions(updated);
    saveChatSessions(updated);
    renameChatSession(id, editTitle); 
    setEditingId(null);
  };

//   const handleDelete = (id: string) => {
//     const updated = sessions.filter((s) => s.id !== id);
//     setSessions(updated);
//     saveChatSessions(updated);
//   };

const handleDelete = (id: string) => {
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    deleteChatSession(id); // ✅ Save the update to localStorage
  };

  return (
    <div className="mt-6">
      <h4 className="text-xs text-zinc-400 uppercase tracking-wide mb-2 pl-4">Chats</h4>
      <ul className="text-sm space-y-1 px-2">
        {sessions.map((session) => (
          <li
            key={session.id}
            className="group flex justify-between items-center text-zinc-300 hover:text-white hover:bg-zinc-800 px-2 py-1 rounded cursor-pointer"
          >
            {editingId === session.id ? (
              <input
                className="bg-zinc-900 text-white px-2 py-1 rounded w-full mr-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => handleRename(session.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename(session.id);
                }}
                autoFocus
              />
            ) : (
              <span onClick={() => onSelect(session)} className="truncate flex-1">
                {session.title}
              </span>
            )}
            <div className="relative ml-2 group-hover:visible invisible">
              <button
                className="p-1 rounded hover:bg-zinc-700"
                onClick={(e) => {
                  e.stopPropagation();
                  const menu = document.getElementById(`menu-${session.id}`);
                  menu?.classList.toggle("hidden");
                }}
              >
                <MoreHorizontal size={16} />
              </button>
              <div
                id={`menu-${session.id}`}
                className="hidden absolute right-0 mt-1 w-28 bg-zinc-800 text-sm text-white rounded shadow-md z-10"
              >
                <button
                  onClick={() => {
                    setEditingId(session.id);
                    setEditTitle(session.title);
                  }}
                  className="block w-full px-3 py-2 text-left hover:bg-zinc-700"
                >
                  Rename
                </button>
                <button
                  onClick={() => handleDelete(session.id)}
                  className="block w-full px-3 py-2 text-left text-red-400 hover:bg-zinc-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
