// src/app/components/chat/ChatMessageList.tsx
import React from "react";
import { ChatMessage } from "@/types/ChatTypes";
import UserBubble from "./UserBubble";
import AiBubble from "./AiBubble";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
  smartTitle?: string;
  chatRef?: React.RefObject<HTMLDivElement | null>;
  setSelectedReference?: (src: string) => void; // ✅ Added
}

const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isTyping,
  smartTitle,
  chatRef,
  setSelectedReference, // ✅
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
              <AiBubble
                content={msg.content}
                onReferenceClick={setSelectedReference} // ✅ Pass it here
              />
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
