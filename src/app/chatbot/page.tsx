// Enhanced Chatbot UI with fixed mobile nav spacing
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import Cookies from "js-cookie";
import { Menu } from "lucide-react";

interface Message {
  sender: "user" | "bot";
  content: string;
}

export default function ChatbotPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const isLoggedIn =
      sessionStorage.getItem("cyberlegal-auth") ||
      Cookies.get("cyberlegal-auth");
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setAuthChecked(true);
    }
  }, [router]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  if (!authChecked) return null;

  // const handleSend = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;

  //   const userMessage: Message = { sender: 'user', content: input.trim() };
  //   setMessages(prev => [...prev, userMessage]);
  //   setInput('');
  //   setIsTyping(true);

  //   setTimeout(() => {
  //     const botReply: Message = {
  //       sender: 'bot',
  //       content: `🔍 Here's a sample response related to your query: "${userMessage.content}". (Simulated)`
  //     };
  //     setMessages(prev => [...prev, botReply]);
  //     setIsTyping(false);
  //   }, 1200);
  // };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch(
        "https://cyberlegal-ai-api.onrender.com/api/rag/query",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: userMessage.content }),
        }
      );

      const data = await res.json();
      const botReply: Message = { sender: "bot", content: data.response };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error("Backend error:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          content:
            "⚠️ Sorry, something went wrong while processing your question.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const sendPreset = (text: string) => {
    setInput(text);
  };

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-900 text-white">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-30 top-0 left-0 h-full w-64 bg-zinc-950 border-r border-zinc-800 p-4 transform transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Cyberlegal.AI</h2>
        <nav className="text-sm space-y-3 flex flex-col">
          <button
            onClick={goHome}
            className="text-left text-zinc-300 hover:text-white"
          >
            Home
          </button>
          <button className="text-left text-zinc-300 hover:text-white">
            Cyber Legal Chat
          </button>
          <button className="text-left text-zinc-300 hover:text-white">
            My Saved Questions
          </button>
        </nav>
        <div className="mt-auto pt-4 border-t border-zinc-800 text-xs text-zinc-600">
          © 2025 Cyberlegal.AI
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main chat area */}
      <main className="flex flex-col flex-1">
        {/* Header */}
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

        {/* Chat area */}
        <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 && !isTyping && (
              <div className="flex flex-col items-center justify-center h-[70vh] text-center transition-opacity duration-500">
                <h2 className="text-2xl font-semibold mb-3">
                  What can I help with?
                </h2>
                <p className="text-sm text-zinc-400 mb-6 max-w-md">
                  Ask any question about Philippine cyber law: cyber libel, data
                  privacy, electronic evidence, and more.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => sendPreset("What is cyber libel?")}
                    className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm hover:bg-zinc-700"
                  >
                    Explain
                  </button>
                  <button
                    onClick={() => sendPreset("Summarize G.R. No. 123456")}
                    className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm hover:bg-zinc-700"
                  >
                    Digest
                  </button>
                  <button
                    onClick={() => sendPreset("What laws protect online data?")}
                    className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm hover:bg-zinc-700"
                  >
                    Find
                  </button>
                  <button
                    onClick={() => sendPreset("Draft a cyber complaint")}
                    className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm hover:bg-zinc-700"
                  >
                    Draft
                  </button>
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-2xl px-6 py-4 rounded-lg text-sm whitespace-pre-wrap ${
                  msg.sender === "user"
                    ? "bg-indigo-600 text-white self-end ml-auto"
                    : "bg-zinc-800 text-zinc-100"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {isTyping && (
              <div className="text-sm text-zinc-500 animate-pulse">
                Cyberlegal.AI is typing...
              </div>
            )}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t border-zinc-800 bg-zinc-900"
        >
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Ask about cyber libel, privacy law..."
              className="flex-1 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Send
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
