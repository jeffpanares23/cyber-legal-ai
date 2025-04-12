// ✅ Replace the entire file with the updated version below:
import { ChatSession } from "@/types/ChatTypes";

export const CHAT_STORAGE_KEY = "chatSessions";

// Add a full session (prepend to history)
export function saveChatSession(session: ChatSession) {
  const prev = loadChatSessions();
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify([session, ...prev]));
}

// Load all chat sessions
export function loadChatSessions(): ChatSession[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(CHAT_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Replace all sessions (for rename/delete)
export function saveChatSessions(sessions: ChatSession[]) {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(sessions));
}

// Rename a session
export function renameChatSession(id: string, newTitle: string) {
  const sessions = loadChatSessions();
  const updated = sessions.map((s) =>
    s.id === id ? { ...s, title: newTitle } : s
  );
  saveChatSessions(updated);
}

// Delete a session
export function deleteChatSession(id: string) {
  const sessions = loadChatSessions();
  const filtered = sessions.filter((s) => s.id !== id);
  saveChatSessions(filtered);
}
