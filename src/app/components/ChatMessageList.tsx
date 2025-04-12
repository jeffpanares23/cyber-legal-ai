// File: src/app/components/ChatMessageList.tsx

import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatBubble from "./ChatBubble";
import { ChatMessage } from "@/types/ChatTypes";

// ✅ Correct props interface
interface ChatMessageListProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

const ChatMessageList: FC<ChatMessageListProps> = ({ messages, isTyping }) => {
  return (
    <AnimatePresence>
      {messages.map((msg, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <ChatBubble sender={msg.sender} content={msg.content} />
        </motion.div>
      ))}

      {isTyping && (
        <motion.div
          key="typing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: messages.length * 0.05 }}
          className="flex justify-start"
        >
          <div className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-1">
            <div className="text-sm text-zinc-500 animate-pulse">
              Cyberlegal.AI is typing
            </div>
            <span className="typing-dot w-2 h-2 bg-white rounded-full animate-bounce" />
            <span className="typing-dot w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
            <span className="typing-dot w-2 h-2 bg-white rounded-full animate-bounce delay-300" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatMessageList;
