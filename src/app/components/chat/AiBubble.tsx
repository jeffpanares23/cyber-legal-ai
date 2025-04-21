// src/app/components/chat/AiBubble.tsx
import React from "react";

interface AiBubbleProps {
  content: string;
  onReferenceClick?: (source: string) => void; // ✅ optional prop
}

const AiBubble: React.FC<AiBubbleProps> = ({ content, onReferenceClick }) => {
  const isSourceBlock = content.includes("**Sources:**");

  if (isSourceBlock) {
    const lines = content.split("\n").filter(Boolean);
    const sources = lines.slice(1); // skip the "**Sources:**" line

    return (
      <div className="flex justify-start mb-4 px-4">
        <div className="max-w-[75%] bg-zinc-800 text-gray-100 text-sm px-4 py-2 rounded-lg shadow-md space-y-2">
          <div className="font-semibold text-white">📚 Sources:</div>
          <ul className="list-disc list-inside space-y-1 text-indigo-400">
            {sources.map((src, idx) => (
              <li key={idx}>
                <button
                  onClick={() => onReferenceClick?.(src.trim())}
                  className="hover:underline text-left"
                >
                  {src.replace(/^- /, "")}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4 px-4">
      <div className="max-w-[75%] bg-zinc-800 text-gray-100 text-sm px-4 py-2 rounded-lg rounded-tl-none shadow-md">
        {content}
      </div>
    </div>
  );
};

export default AiBubble;
