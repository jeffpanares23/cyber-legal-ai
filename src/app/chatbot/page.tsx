// src/app/chatbot/page.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import ChatSidebar from "../components/ChatSidebar";
import ChatEmptyState from "../components/ChatEmptyState";
import ChatInput from "../components/ChatInput";
import ChatHeader from "../components/ChatHeader";
import ChatMessageList from "../components/chat/ChatMessageList";
import NewChatConfirmModal from "../components/NewChatConfirmModal";
import ReferenceBox from "../components/chat/ReferenceBox";
import useIsMobile from "../hooks/useIsMobile";
import { ChatMessage, ChatSession } from "@/types/ChatTypes";
import { saveChatSessions, loadChatSessions } from "@/utils/chatStorage";
import { useAutoScroll } from "../hooks/useAutoScroll";

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
  const isMobile = useIsMobile(); // ✅ Mobile detection
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [title, setTitle] = useState<string>("");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isReferenceExpanded, setIsReferenceExpanded] = useState(false);
  const [isReferenceBoxExpanded, setIsReferenceBoxExpanded] = useState(false);
  const [selectedReference, setSelectedReference] = useState<string | null>(
    null
  );
  const [refBoxExpanded, setRefBoxExpanded] = useState(false);

  const handleReferenceClick = (ref: string) => {
    setSelectedReference(ref);
    setIsReferenceBoxExpanded(true);
  };

  // const chatRef = useRef<HTMLDivElement>(null);
  // const chatRef = useAutoScroll(messages, isTyping);
  const {
    containerRef: chatRef,
    showScrollButton,
    scrollToBottom,
  } = useAutoScroll(messages, isTyping);

  const [showNewChatModal, setShowNewChatModal] = useState(false);

  const hasAiResponse = messages.some((msg) => msg.sender === "bot");

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
      sessionStorage.getItem("cyberlegal-auth") ||
      Cookies.get("cyberlegal-auth");
    if (!isLoggedIn) router.push("/login");
    else setAuthChecked(true);
  }, [router]);

  // useEffect(() => {
  //   if (chatRef.current) {
  //     chatRef.current.scrollTop = chatRef.current.scrollHeight;
  //   }
  // }, [messages]);

  useEffect(() => {
    setSessions(loadChatSessions());
  }, []);

  useEffect(() => {
    setSelectedReference(null);
    setIsReferenceBoxExpanded(false);
  }, [activeSessionId]);

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

  // const handleSend = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;

  //   const userMessage: ChatMessage = {
  //     sender: "user",
  //     content: input.trim(),
  //     role: "",
  //   };
  //   const updatedMessages = [...messages, userMessage];
  //   setMessages(updatedMessages);
  //   setInput("");
  //   setIsTyping(true);

  //   try {
  //     const res = await fetch("http://127.0.0.1:8000/api/rag/query", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         query: userMessage.content,
  //         metadata: {
  //           source: "chat",
  //           time: new Date().toISOString(),
  //         },
  //       }),
  //     });

  //     const data = await res.json();
  //     const botReply: ChatMessage = {
  //       sender: "bot",
  //       content: data.response,
  //       role: "",
  //     };
  //     const fullChat = [...updatedMessages, botReply];
  //     if (data.sources && data.sources.length > 0) {
  //       const formattedSources = data.sources
  //         .map((src: string) => `- ${src}`)
  //         .join("\n");
  //       const sourceReply: ChatMessage = {
  //         sender: "bot",
  //         content: `📚 **Sources:**\n${formattedSources}`,
  //         role: "",
  //       };
  //       fullChat.push(sourceReply);
  //     }
  //     setMessages(fullChat);
  //     persistSession(fullChat, generateSmartTitle(userMessage.content));
  //     setTitle(generateSmartTitle(userMessage.content));
  //   } catch (err) {
  //     console.error("Backend error:", err);
  //   } finally {
  //     setIsTyping(false);
  //   }
  // };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      sender: "user",
      content: input.trim(),
      role: "",
    };

    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/rag/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: userMessage.content,
          metadata: {
            source: "chat",
            time: new Date().toISOString(),
          },
        }),
      });

      const data = await res.json();
      const botReply: ChatMessage = {
        sender: "bot",
        content: data.response,
        role: "",
      };

      const fullChat: ChatMessage[] = [...messages, userMessage, botReply];

      // Add sources if present
      if (data.sources && data.sources.length > 0) {
        const formattedSources = data.sources
          .map((src: string) => `- ${src}`)
          .join("\n");

        fullChat.push({
          sender: "bot",
          content: `📚 **Sources:**\n${formattedSources}`,
          role: "",
        });
      }

      setMessages(fullChat);
      persistSession(fullChat, generateSmartTitle(userMessage.content));
      setTitle(generateSmartTitle(userMessage.content));
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
    <div className="flex h-screen overflow-hidden text-white">
      <ChatSidebar
        sidebarOpen={sidebarOpen && !isReferenceExpanded}
        setSidebarOpen={setSidebarOpen}
        onSelectSession={handleSelectSession}
        sessions={sessions}
        activeId={activeSessionId}
        setSessions={setSessions}
        onNewChatClick={() => setShowNewChatModal(true)}
      />
      <main className="flex flex-col flex-1">
        <ChatHeader setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {messages.length === 0 && !isTyping ? (
            <div className="max-w-5xl mx-auto">
              <ChatEmptyState
                onPresetClick={sendPreset}
                input={input}
                onInputChange={(e) => setInput(e.target.value)}
                onSend={handleSend}
              />
            </div>
          ) : (
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 transition-all duration-300">
              {/* 💬 Chat Area */}
              <div
                className={`flex-1 w-full transition-all duration-300 ${
                  isReferenceExpanded
                    ? "lg:w-[calc(100%-28rem)]"
                    : "lg:w-[calc(100%-20rem)]"
                }`}
              >
                <ChatMessageList
                  messages={messages}
                  isTyping={isTyping}
                  smartTitle={title}
                  chatRef={chatRef}
                  setSelectedReference={setSelectedReference}
                />
              </div>

              {/* 📚 Reference Box */}
              {/* <div className="hidden lg:block">
                <ReferenceBox
                  // expanded={isReferenceExpanded}
                  // onToggle={() => setIsReferenceExpanded((prev) => !prev)}
                  expanded={refBoxExpanded}
                  onToggle={() => setRefBoxExpanded((prev) => !prev)}
                  content={selectedReference}
                />
              </div> */}
              {selectedReference && (
                <ReferenceBox
                  expanded={isReferenceBoxExpanded}
                  content={selectedReference}
                  onToggle={() => setIsReferenceBoxExpanded((prev) => !prev)}
                  onClose={() => {
                    setSelectedReference(null); // ✅ Auto-hide the ReferenceBox
                    setIsReferenceBoxExpanded(false);
                  }}
                />
              )}
            </div>
          )}
        </div>

        {messages.length > 0 && (
          <ChatInput
            input={input}
            onInputChange={(e) => setInput(e.target.value)}
            onSend={handleSend}
          />
        )}
        {showScrollButton && (
          <button
            onClick={scrollToBottom}
            className="fixed bottom-24 right-6 z-50 bg-blue-600 text-white text-sm px-4 py-2 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 animate-bounce"
          >
            New message ↓
          </button>
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
