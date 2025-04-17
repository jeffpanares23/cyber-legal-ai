import { ChatSession } from "@/types/ChatTypes";

export const CHAT_STORAGE_KEY = "chatSessions";

export function saveChatSessions(sessions: ChatSession[]) {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(sessions));
}

export function loadChatSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(CHAT_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function renameChatSession(id: string, newTitle: string) {
  const sessions = loadChatSessions();
  const updated = sessions.map((s) =>
    s.id === id ? { ...s, title: newTitle } : s
  );
  saveChatSessions(updated);
}

export function deleteChatSession(id: string) {
  const sessions = loadChatSessions();
  const filtered = sessions.filter((s) => s.id !== id);
  saveChatSessions(filtered);
}
