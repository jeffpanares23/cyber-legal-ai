import { FC } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy } from "lucide-react";

interface Props {
  sender: "user" | "bot";
  content: string;
}

const ChatBubble: FC<Props> = ({ sender, content }) => {
  const isUser = sender === "user";

  return (
    <div
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"} py-5`}
    >
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={`group relative max-w-[85%] sm:max-w-[75%] px-4 py-3 text-sm leading-relaxed mr-2
          rounded-2xl
          ${
            isUser ? "bg-[#212E4A] text-white rounded-br-none" : "text-zinc-100"
          }`}
      >
        {/* Markdown renderer */}
        {/* <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          className="prose prose-invert prose-sm"
        >
          {content}
        </ReactMarkdown> */}
        {/* <ReactMarkdown remarkPlugins={[remarkGfm]} children={content} /> */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        {/* Copy button */}
        <button
          onClick={() => navigator.clipboard.writeText(content)}
          title="Copy"
          className="invisible group-hover:visible absolute -top-2 -right-2 bg-zinc-900/90 backdrop-blur
                     p-1 rounded-full hover:scale-110 transition-a ease-in-out duration-2000 cursor-pointer"
        >
          <Copy size={14} />
        </button>
      </motion.article>
    </div>
  );
};

export default ChatBubble;
