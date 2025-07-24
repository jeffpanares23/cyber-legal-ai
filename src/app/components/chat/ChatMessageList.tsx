"use client";

import { FC, Dispatch, SetStateAction } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatBubble from "./ChatBubble";
import { ChatMessage } from "@/types/ChatTypes";

interface Props {
  messages: ChatMessage[];
  isTyping: boolean;
  smartTitle?: string;
  chatRef: React.RefObject<HTMLDivElement | null>;
  setSelectedReference: Dispatch<SetStateAction<string | null>>;
}

const ChatMessageList: FC<Props> = ({
  messages,
  isTyping,
  smartTitle,
  chatRef,
}) => (
  <div
    ref={chatRef}
    className="flex flex-col w-full overflow-y-auto overflow-x-hidden max-h-full pb-28"
  >
    {smartTitle && (
      <h2 className="text-center text-lg font-semibold italic text-white mb-6">
        {smartTitle}
      </h2>
    )}

    <AnimatePresence>
      {messages.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ delay: i * 0.045 }}
        >
          <ChatBubble sender={m.sender} content={m.content} />
        </motion.div>
      ))}

      {isTyping && (
        <motion.div
          key="typing"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start px-4"
        >
          <div className="bg-zinc-800 px-4 py-2 rounded-lg shadow-md flex items-center gap-1 text-xs text-zinc-300">
            Cyberlegal.AI is typing
            <span className="animate-bounce">⋯</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default ChatMessageList;
