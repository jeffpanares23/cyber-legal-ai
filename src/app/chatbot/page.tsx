"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import ChatSidebar from "../components/ChatSidebar";
import ChatEmptyState from "../components/ChatEmptyState";
import ChatInput from "../components/ChatInput";
import ChatHeader from "../components/ChatHeader";
import ChatMessageList from "../components/ChatMessageList";
import NewChatConfirmModal from "../components/NewChatConfirmModal";

import { ChatMessage, ChatSession } from "@/types/ChatTypes";
import {
  saveChatSessions,
  loadChatSessions,
} from "@/utils/chatStorage";

function generateSmartTitle(input: string): string {
  const trimmed = input.trim().toLowerCase();

  if (/hello|hi|good\s(morning|afternoon|evening)/i.test(trimmed)) return "Greetings";
  if (/cyber\s?libel|defamation/i.test(trimmed)) return "Cyber Libel Inquiry";
  if (/evidence|admissibility/i.test(trimmed)) return "Evidence Law Question";
  if (/privacy|data\sprotection/i.test(trimmed)) return "Privacy Law Concern";
  if (/fraud|scam|identity|impersonation/i.test(trimmed)) return "Cybercrime Concern";
  if (trimmed.length <= 6) return "Quick Question";
  if (trimmed.length < 25) return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return trimmed.slice(0, 30).charAt(0).toUpperCase() + trimmed.slice(1, 30) + "...";
}

export default function ChatbotPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const handleNewChatConfirm = () => {
    setMessages([]);
    setShowNewChatModal(false);
    setActiveSessionId(null);
  };
  
  const handleNewChatCancel = () => {
    setShowNewChatModal(false);
  };

  useEffect(() => {
    const isLoggedIn =
      sessionStorage.getItem("cyberlegal-auth") || Cookies.get("cyberlegal-auth");
    if (!isLoggedIn) router.push("/login");
    else setAuthChecked(true);
  }, [router]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setSessions(loadChatSessions());
  }, []);

  const persistSession = (updatedMessages: ChatMessage[], title: string) => {
    const newSession: ChatSession = {
      id: activeSessionId || crypto.randomUUID(),
      title,
      createdAt: new Date().toISOString(),
      messages: updatedMessages,
    };

    const filtered = sessions.filter((s) => s.id !== newSession.id);
    const updated = [newSession, ...filtered];
    saveChatSessions(updated);
    setSessions(updated);
    setActiveSessionId(newSession.id);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = { sender: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/rag/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage.content }),
      });

      const data = await res.json();
      const botReply: ChatMessage = {
        sender: "bot",
        content: data.response,
      };
      const fullChat = [...updatedMessages, botReply];

      setMessages(fullChat);
      persistSession(fullChat, generateSmartTitle(userMessage.content));
    } catch (err) {
      console.error("Backend error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSelectSession = (session: ChatSession) => {
    setActiveSessionId(session.id);
    setMessages(session.messages);
  };

  const sendPreset = (text: string) => setInput(text);

  if (!authChecked) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-900 text-white">
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onSelectSession={handleSelectSession}
        sessions={sessions}
        activeId={activeSessionId}
        setSessions={setSessions}
        onNewChatClick={() => setShowNewChatModal(true)}
      />
      <main className="flex flex-col flex-1">
        <ChatHeader setSidebarOpen={setSidebarOpen} />
        <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 && !isTyping ? (
              <ChatEmptyState
                onPresetClick={sendPreset}
                input={input}
                onInputChange={(e) => setInput(e.target.value)}
                onSend={handleSend}
              />
            ) : (
              <ChatMessageList messages={messages} isTyping={isTyping} />
            )}
          </div>
        </div>
        {messages.length > 0 && (
          <ChatInput
            input={input}
            onInputChange={(e) => setInput(e.target.value)}
            onSend={handleSend}
          />
        )}
      </main>
      <NewChatConfirmModal
        show={showNewChatModal}
        onCancel={handleNewChatCancel}
        onConfirm={handleNewChatConfirm}
      />
    </div>
  );
}
