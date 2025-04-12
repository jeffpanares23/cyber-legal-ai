import { useEffect, useState } from "react";

export interface ChatMessage {
  sender: "user" | "bot";
  content: string;
}

export interface ChatSession {
  id: string; // UUID or timestamp
  title: string;
  messages: ChatMessage[];
  createdAt: string;
}

const STORAGE_KEY = "cyberlegal-chat-history";

export const useChatHistory = () => {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      setChatSessions(JSON.parse(data));
    }
  }, []);

  const saveToStorage = (sessions: ChatSession[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  };

  const addSession = (session: ChatSession) => {
    const updated = [session, ...chatSessions];
    setChatSessions(updated);
    saveToStorage(updated);
  };

  const deleteSession = (id: string) => {
    const updated = chatSessions.filter((s) => s.id !== id);
    setChatSessions(updated);
    saveToStorage(updated);
  };

  const getSessionById = (id: string) => {
    return chatSessions.find((s) => s.id === id);
  };

  return {
    chatSessions,
    addSession,
    deleteSession,
    getSessionById,
  };
};
