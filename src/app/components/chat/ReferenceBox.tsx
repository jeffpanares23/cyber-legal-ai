"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import type { SourceItem } from "@/types/ChatTypes"; // ✅ Assuming you created this shared type

interface ReferenceBoxProps {
  expanded: boolean;
  onToggle: () => void;
  content?: string | null;
  onClose: () => void;
  sources?: {
    rules?: SourceItem[];
    cases?: SourceItem[];
  } | null;
}

const ReferenceBox: React.FC<ReferenceBoxProps> = ({
  expanded,
  onToggle,
  content,
  onClose,
  sources,
}) => {
  console.log("🧩 ReferenceBox received:", { expanded, sources, content });
  // Render specific clicked reference content (from AiBubble)
  if (content) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow p-4 text-sm text-gray-800 dark:text-gray-100 space-y-2 max-w-sm"
      >
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-base">📖 Source Detail</h3>
          <button onClick={onClose}>
            <X className="w-4 h-4 text-zinc-400 hover:text-zinc-100" />
          </button>
        </div>
        <p className="whitespace-pre-wrap">{content}</p>
      </motion.div>
    );
  }

  // Render structured list of sources (rules + cases)
  if (!sources) return null;

  return (
    <AnimatePresence>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow p-4 text-sm text-gray-800 dark:text-gray-100 space-y-2 max-w-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-base">📚 References</h3>
            <button onClick={onToggle}>
              <X className="w-4 h-4 text-zinc-400 hover:text-zinc-100" />
            </button>
          </div>

          {sources.rules && sources.rules.length > 0 && (
            <>
              <h4 className="font-semibold mt-2">Rules and Regulations</h4>
              <ul className="list-disc list-inside space-y-1">
                {sources.rules.map((item, index) => (
                  <li key={index}>
                    <strong>{item.title}</strong> – {item.description}
                  </li>
                ))}
              </ul>
            </>
          )}

          {sources.cases && sources.cases.length > 0 && (
            <>
              <h4 className="font-semibold mt-4">Cases</h4>
              <ul className="list-disc list-inside space-y-1">
                {sources.cases.map((item, index) => (
                  <li key={index}>
                    <strong>{item.title}</strong> – {item.description}
                  </li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReferenceBox;
