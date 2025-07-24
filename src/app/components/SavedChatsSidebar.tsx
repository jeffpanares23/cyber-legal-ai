"use client";

import { useEffect, useState } from "react";
import { ChatSession } from "@/types/ChatTypes";
import {
  loadChatSessions,
  // saveChatSessions,
  deleteChatSession,
  renameChatSession,
} from "@/utils/chatStorage";
import { MoreHorizontal } from "lucide-react";
import Toast from "./ui/Toast";

interface SavedChatsSidebarProps {
  onSelect: (session: ChatSession) => void;
  sessions: ChatSession[];
  setSessions: React.Dispatch<React.SetStateAction<ChatSession[]>>;
  activeId: string | null;
}

export default function SavedChatsSidebar({
  onSelect,
  sessions,
  setSessions,
  activeId,
}: SavedChatsSidebarProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setSessions(loadChatSessions());
  }, [setSessions]);

  const triggerToast = (msg: string) => {
    setToastMsg(msg);
    setShowToast(true);
  };

  const handleRename = (id: string) => {
    const updated = sessions.map((s) =>
      s.id === id ? { ...s, title: editTitle } : s
    );
    setSessions(updated);
    renameChatSession(id, editTitle);
    setEditingId(null);
    triggerToast("Title updated");
  };

  const handleDelete = (id: string) => {
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    deleteChatSession(id);
    triggerToast("Chat deleted");
  };

  return (
    <div className="my-6">
      <h4 className="text-xs text-zinc-400 uppercase tracking-wide mb-2">
        Conversations
      </h4>
      <ul className="space-y-2">
        {sessions.map((session) => (
          <li
            key={session.id}
            className={`relative p-3 rounded-md transition group cursor-pointer ${
              activeId === session.id
                ? "bg-zinc-700 text-white"
                : "hover:bg-zinc-700 text-zinc-300"
            }`}
            onClick={() => onSelect(session)}
          >
            {editingId === session.id ? (
              <input
                type="text"
                className="w-full bg-transparent border-b border-white focus:outline-none"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onBlur={() => handleRename(session.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleRename(session.id);
                  if (e.key === "Escape") {
                    setEditingId(null);
                    setDropdownOpenId(null); // ✅ Also hide dropdown just in case
                  }
                }}
                autoFocus
              />
            ) : (
              <>
                <div className="font-medium text-md truncate pr-6">
                  {session.title}
                </div>
                <div className="text-xs mt-1">
                  {new Date(session.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </>
            )}
            <div
              className="absolute top-2 right-2"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpenId((prev) =>
                  prev === session.id ? null : session.id
                );
              }}
            >
              <MoreHorizontal
                size={18}
                className="text-zinc-400 hover:text-white"
              />
              {dropdownOpenId === session.id && (
                <div className="absolute right-0 mt-1 w-32 border rounded shadow-lg z-50">
                  <button
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-zinc-800"
                    onClick={() => {
                      setEditTitle(session.title);
                      setEditingId(session.id);
                      setTimeout(() => setDropdownOpenId(null), 0);
                    }}
                  >
                    Rename
                  </button>
                  <button
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-red-800 text-red-400"
                    onClick={() => {
                      handleDelete(session.id);
                      setDropdownOpenId(null);
                    }}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Toast
        message={toastMsg}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
