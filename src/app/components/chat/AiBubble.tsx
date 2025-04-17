// src/app/components/chat/AiBubble.tsx

import React from "react";

interface AiBubbleProps {
  content: string;
}

const AiBubble: React.FC<AiBubbleProps> = ({ content }) => {
  return (
    <div className="flex justify-start mb-4 px-4">
      <div className="max-w-[75%] bg-zinc-800 text-gray-100 text-sm px-4 py-2 rounded-lg rounded-tl-none shadow-md">
        {content}
      </div>
    </div>
  );
};

export default AiBubble;
