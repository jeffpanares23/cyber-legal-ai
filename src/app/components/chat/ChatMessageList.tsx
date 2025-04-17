// Updated ChatMessageList.tsx
import React, { ForwardedRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/types/ChatTypes";
import UserBubble from "./UserBubble";
import AiBubble from "./AiBubble";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  smartTitle?: string;
  chatRef?: React.RefObject<HTMLDivElement | null>;
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isTyping,
  smartTitle,
  chatRef,
}) => {
  return (
    <div
      ref={chatRef}
      className="w-full flex flex-col overflow-y-auto max-h-full pb-20"
    >
      {smartTitle && (
        <div className="text-center text-white font-semibold italic mb-6 text-lg">
          {smartTitle}
        </div>
      )}

      <AnimatePresence>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            {msg.sender === "bot" ? (
              <AiBubble content={msg.content} />
            ) : (
              <UserBubble content={msg.content} />
            )}
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            key="typing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: messages.length * 0.05 }}
            className="flex justify-start px-4"
          >
            <div className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-md">
              <span className="text-zinc-400">Cyberlegal.AI is typing</span>
              <span className="typing-dot w-2 h-2 bg-white rounded-full animate-bounce" />
              <span className="typing-dot w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
              <span className="typing-dot w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatMessageList;
