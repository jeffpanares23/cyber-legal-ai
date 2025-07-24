// src/app/components/chat/UserBubble.tsx

import React from "react";

interface UserBubbleProps {
  content: string;
}

const UserBubble: React.FC<UserBubbleProps> = ({ content }) => {
  return (
    <div className="flex justify-end mb-4 px-4">
      <div className="max-w-[75%] bg-blue-600 text-white text-sm px-4 py-2 rounded-lg rounded-tr-none shadow-md">
        {content}
      </div>
    </div>
  );
};

export default UserBubble;
