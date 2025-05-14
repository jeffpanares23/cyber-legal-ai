// src/app/chatbot/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import ChatSidebar from "../components/ChatSidebar";
import ChatEmptyState from "../components/ChatEmptyState";
import ChatInput from "../components/ChatInput";
import ChatHeader from "../components/ChatHeader";
import ChatMessageList from "../components/chat/ChatMessageList";
import NewChatConfirmModal from "../components/NewChatConfirmModal";
import ReferenceBox from "../components/chat/ReferenceBox";
import { ChatMessage, ChatSession, SourceItem } from "@/types/ChatTypes";
import { saveChatSessions, loadChatSessions } from "@/utils/chatStorage";
import { useAutoScroll } from "../hooks/useAutoScroll";
import { BASE_URL } from "../../config";

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
  const [userName, setUserName] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [title, setTitle] = useState<string>("");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isReferenceExpanded] = useState(false);
  const [isReferenceBoxExpanded, setIsReferenceBoxExpanded] = useState(false);
  const [selectedReference, setSelectedReference] = useState<string | null>(
    null
  );
  const [postJudgeChoice, setPostJudgeChoice] = useState<
    "prosecution" | "defense" | "validate" | null
  >(null);

  const [refBoxExpanded, setRefBoxExpanded] = useState(false);
  const [sources, setSources] = useState<{
    rules?: SourceItem[];
    cases?: SourceItem[];
  } | null>(null);

  // const handleReferenceClick = (ref: string) => {
  //   setSelectedReference(ref);
  //   setIsReferenceBoxExpanded(true);
  // };

  // const chatRef = useRef<HTMLDivElement>(null);
  // const chatRef = useAutoScroll(messages, isTyping);
  const {
    containerRef: chatRef,
    showScrollButton,
    scrollToBottom,
  } = useAutoScroll(messages, isTyping);

  const [showNewChatModal, setShowNewChatModal] = useState(false);

  // const hasAiResponse = messages.some((msg) => msg.sender === "bot");

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
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      const storedName = sessionStorage.getItem("user_name") || "User";
      setUserName(storedName);
      setAuthChecked(true);
    }
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
  //     console.log("📚 Received sources:", data.sources);
  //     const botReply: ChatMessage = {
  //       sender: "bot",
  //       content: data.response,
  //       role: "",
  //     };

  //     const fullChat: ChatMessage[] = [...messages, userMessage, botReply];

  //     // Add sources if present
  //     // if (data.sources) {
  //     //   console.log("✅ SETTING SOURCES:", data.sources);
  //     //   setSources(data.sources);
  //     //   setIsReferenceBoxExpanded(true);
  //     // }
  //     if (
  //       data.sources &&
  //       (data.sources.rules?.length > 0 || data.sources.cases?.length > 0)
  //     ) {
  //       const allSources = [
  //         ...(data.sources.rules || []),
  //         ...(data.sources.cases || []),
  //       ];
  //       (window as any).latestSources = allSources;
  //       // Save to state for ReferenceBox
  //       setSources(data.sources);
  //       setIsReferenceBoxExpanded(true); // Optional: auto-show ReferenceBox

  //       // Render only the titles in the message
  //       const uniqueSources = Array.from(
  //         new Map(
  //           allSources.map((src) => [`${src.title}-${src.url || ""}`, src])
  //         ).values()
  //       );

  //       const formattedTitles = uniqueSources
  //         .map((src) => `- ${src.title}`)
  //         .join("\n");

  //       fullChat.push({
  //         sender: "bot",
  //         content: `📚 **Sources:**\n${formattedTitles}`,
  //         role: "",
  //       });
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

  const handleSend = async (
    e: React.FormEvent,
    role: string = "neutral",
    tone: string = "neutral"
  ) => {
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
      const fullChat = [...messages, userMessage];
      const lastBotMsg = messages
        .slice()
        .reverse()
        .find((msg) => msg.sender === "bot");
      const isPreviousFallback =
        lastBotMsg?.content?.toLowerCase().includes("insufficient evidence") ||
        lastBotMsg?.content
          ?.toLowerCase()
          .includes("please provide specific legal details");

      // Step 1: PromptEnhancerAgent
      // Step 1: Run SufficientInfoAgent on the original user input
      const intakeRes = await fetch(`${BASE_URL}/agents/sufficient-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ query: userMessage.content }),
        body: JSON.stringify({
          query: isPreviousFallback
            ? `${lastBotMsg?.content || ""}\n\nFollow-up: ${
                userMessage.content
              }`
            : userMessage.content,
          role,
          tone,
        }),
      });
      const intake = await intakeRes.json();

      // Step 2: Check if intake is incomplete
      // if (
      //   intake.response.includes("please clarify") ||
      //   intake.response.includes("Could you")
      // ) {
      //   fullChat.push({ sender: "bot", content: intake.response, role: "" });
      //   setMessages(fullChat);
      //   setIsTyping(false);
      //   return;
      // }
      if (
        intake.response.toLowerCase().includes("please clarify") ||
        intake.response.toLowerCase().includes("could you")
      ) {
        // Avoid duplicate fallback message
        if (intake.response !== fullChat[fullChat.length - 1]?.content) {
          fullChat.push({ sender: "bot", content: intake.response, role: "" });
        }

        // Optional Step: Display preset suggestion buttons
        fullChat.push({
          sender: "bot",
          content:
            "Here are some ways you might clarify your question:\n\n" +
            "- I was accused of cyber libel for posting a private message online.\n" +
            "- They claim I defamed someone through Facebook comments.\n" +
            "- The message involved a public figure.\n\n" +
            "You can click on one of these or rephrase your query.",
          role: "",
        });

        setMessages(fullChat);
        setIsTyping(false);
        return;
      }

      // Step 3: Then enhance the normalized query
      const enhancerRes = await fetch(`${BASE_URL}/agents/prompt-enhancer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ normalized_query: intake.response }), // ✅ intake.response is normalized
      });
      const enhancer = await enhancerRes.json();

      // Step 3: ResearchAgent
      const researchRes = await fetch(`${BASE_URL}/agents/research`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enhanced_query: enhancer.response }),
      });
      const research = await researchRes.json();

      // Step 4: WriteAgent
      let facts = "";
      try {
        const parsed = JSON.parse(intake.response);
        facts = parsed.key_facts || "";
      } catch {
        console.warn("⚠️ Failed to parse intake response as JSON.");
      }

      // Step 4: WriteAgent
      const writeRes = await fetch(`${BASE_URL}/agents/write`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          research_notes: research.response,
          facts,
        }),
      });
      const write = await writeRes.json();

      // Step 5: ReviewAgent
      const reviewRes = await fetch(`${BASE_URL}/agents/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initial_report: write.response }),
      });
      const review = await reviewRes.json();

      // Step 6: JudgeAgent
      const judgeRes = await fetch(`${BASE_URL}/agents/judge`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewed_report: review.response }),
      });
      const judge = await judgeRes.json();

      const botReply: ChatMessage = {
        sender: "bot",
        content:
          judge.response ||
          judge.neutral_opinion ||
          "✅ Legal review complete.",
        role: "",
      };

      fullChat.push(botReply);
      setMessages(fullChat);
      setPostJudgeChoice("prosecution");
      persistSession(fullChat, generateSmartTitle(userMessage.content));
      setTitle(generateSmartTitle(userMessage.content));
    } catch (err) {
      console.error("Agent pipeline error:", err);
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
        <ChatHeader setSidebarOpen={setSidebarOpen} userName={userName} />
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
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6 transition-all duration-300">
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
                {postJudgeChoice && (
                  <div className="flex gap-4 mt-4 px-6">
                    <button
                      onClick={async () => {
                        const res = await fetch(
                          `${BASE_URL}/agents/prosecution`,
                          {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              reviewed_report:
                                messages[messages.length - 1].content,
                            }),
                          }
                        );
                        const data = await res.json();
                        setMessages((prev) => [
                          ...prev,
                          { sender: "bot", content: data.response, role: "" },
                        ]);
                        setPostJudgeChoice("defense"); // chain or null
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      🔴 Prosecution
                    </button>
                    <button
                      onClick={async () => {
                        const res = await fetch(`${BASE_URL}/agents/defense`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            prosecution_brief:
                              messages[messages.length - 1].content,
                          }),
                        });
                        const data = await res.json();
                        setMessages((prev) => [
                          ...prev,
                          { sender: "bot", content: data.response, role: "" },
                        ]);
                        setPostJudgeChoice("validate"); // chain or null
                      }}
                      className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      🔵 Defense
                    </button>
                    <button
                      onClick={async () => {
                        const res = await fetch(`${BASE_URL}/agents/validate`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            final_document:
                              messages[messages.length - 1].content,
                            metadata: {
                              source: "chat",
                              time: new Date().toISOString(),
                            },
                          }),
                        });
                        const data = await res.json();
                        setMessages((prev) => [
                          ...prev,
                          { sender: "bot", content: data.response, role: "" },
                        ]);
                        setPostJudgeChoice(null);
                      }}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      ✅ Validate
                    </button>
                  </div>
                )}
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

              <ReferenceBox
                expanded={isReferenceBoxExpanded}
                onToggle={() => setIsReferenceBoxExpanded((prev) => !prev)}
                onClose={() => {
                  setSelectedReference(null);
                  setIsReferenceBoxExpanded(false);
                }}
                content={selectedReference}
                sources={sources}
              />
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
