// File: ChatBubble.tsx
import { FC } from "react";
import { motion } from "framer-motion";

interface ChatBubbleProps {
  sender: "user" | "bot";
  content: string;
}

const ChatBubble: FC<ChatBubbleProps> = ({ sender, content }) => {
  const isUser = sender === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className={`max-w-[75%] px-4 py-2 rounded-lg text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-zinc-800 text-zinc-100 rounded-bl-none"
        }`}
      >
        {content}
      </motion.div>
    </div>
  );
};

export default ChatBubble;
