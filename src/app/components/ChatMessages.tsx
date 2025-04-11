import React from "react";

interface ChatMessageProps {
  sender: "user" | "bot";
  content: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ sender, content }) => {
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
};

export default ChatMessage;
