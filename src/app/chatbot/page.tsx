'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// import ChatSidebar from '@/app/components/chat/ChatSidebar';
// import ChatEmptyState from '@/app/components/chat/ChatEmptyState';
// import ChatInput from '@/app/components/chat/ChatInput';
// import ChatBubble from '@/app/components/chat/ChatBubble';
// import ChatHeader from '@/app/components/chat/ChatHeader';
import ChatSidebar from '../components/ChatSidebar';
import ChatEmptyState from '../components/ChatEmptyState';
import ChatInput from '../components/ChatInput';
import ChatHeader from '../components/ChatHeader';
import ChatBubble from '../components/ChatBubble';

export interface Message {
  sender: 'user' | 'bot';
  content: string;
}

export default function ChatbotPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
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
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { sender: 'user', content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/rag/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userMessage.content }),
      });

      const data = await res.json();
      const botReply: Message = { sender: 'bot', content: data.response };
      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error('Backend error:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          content: '⚠️ Sorry, something went wrong while processing your question.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const sendPreset = (text: string) => {
    setInput(text);
  };

  if (!authChecked) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-900 text-white">
      <ChatSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      <main className="flex flex-col flex-1">
        <ChatHeader setSidebarOpen={setSidebarOpen} />

        <div ref={chatRef} className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.length === 0 && !isTyping ? (
              <ChatEmptyState onPresetClick={sendPreset} />
            ) : (
              messages.map((msg, i) => (
                <ChatBubble key={i} sender={msg.sender} content={msg.content} />
              ))
            )}

            {isTyping && (
              <div className="text-sm text-zinc-500 animate-pulse">
                Cyberlegal.AI is typing...
              </div>
            )}
          </div>
        </div>

        <ChatInput
          input={input}
          onInputChange={(e) => setInput(e.target.value)}
          onSend={handleSend}
        />
      </main>
    </div>
  );
}
