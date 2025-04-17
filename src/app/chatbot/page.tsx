"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import NewChatConfirmModal from "../components/NewChatConfirmModal";

import { ChatMessage, ChatSession } from "@/types/ChatTypes";
import { saveChatSessions, loadChatSessions } from "@/utils/chatStorage";

function generateSmartTitle(input: string): string {
  const trimmed = input.trim().toLowerCase();

  if (/hello|hi|good\s(morning|afternoon|evening)/i.test(trimmed))
    return "Greetings";
  if (/cyber\s?libel|defamation/i.test(trimmed)) return "Cyber Libel Inquiry";
  if (/evidence|admissibility/i.test(trimmed)) return "Evidence Law Question";
  if (/privacy|data\sprotection/i.test(trimmed)) return "Privacy Law Concern";
  if (/fraud|scam|identity|impersonation/i.test(trimmed))
    return "Cybercrime Concern";
  if (trimmed.length <= 6) return "Quick Question";
  if (trimmed.length < 25)
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return (
    trimmed.slice(0, 30).charAt(0).toUpperCase() + trimmed.slice(1, 30) + "..."
  );
}

export default function ChatbotPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isLoggedIn =
      sessionStorage.getItem('cyberlegal-auth') || Cookies.get('cyberlegal-auth');
    if (!isLoggedIn) {
      router.push('/login');
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

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
      const botReply: ChatMessage = { sender: "bot", content: data.response };
      const fullChat = [...updatedMessages, botReply];

      setMessages(fullChat);

      saveChatSession({
        id: crypto.randomUUID(),
        title: userMessage.content,
        messages: fullChat,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.error("Backend error:", err);
    } finally {
      setIsTyping(false);
    }
  };

  const sendPreset = (text: string) => setInput(text);

  const handleSelectSession = (session: ChatSession) => {
    setMessages(session.messages);
  };

  if (!authChecked) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-900 text-white">
      <ChatSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onSelectSession={handleSelectSession}
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
    </div>
  );
}
