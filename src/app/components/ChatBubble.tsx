// src/app/components/chat/ChatBubble.tsx

interface ChatBubbleProps {
    sender: "user" | "bot";
    content: string;
  }
  
  export default function ChatBubble({ sender, content }: ChatBubbleProps) {
    const isUser = sender === "user";
  
    return (
      <div
        className={`max-w-2xl px-6 py-4 rounded-lg text-sm whitespace-pre-wrap ${
          isUser
            ? "bg-indigo-600 text-white self-end ml-auto"
            : "bg-zinc-800 text-zinc-100"
        }`}
      >
        {content}
      </div>
    );
  }
  