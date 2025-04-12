"use client";

import { FC } from "react";

interface ChatInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (e: React.FormEvent) => void;
}

const ChatInput: FC<ChatInputProps> = ({ input, onInputChange, onSend }) => {
  return (
    <form
      onSubmit={onSend}
      className="w-full border-t border-zinc-800 bg-zinc-900 p-4"
    >
      <div className="max-w-3xl mx-auto flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={onInputChange}
          placeholder="Ask about cyber libel, privacy law..."
          className="flex-1 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
        />
        <button
          type="submit"
          className="px-5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition-all cursor-pointer"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
