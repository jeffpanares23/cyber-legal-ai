"use client";

/*
  Component: ChatInput
  Description: Controlled input field and send button for user message entry.
*/

import { FC } from "react";

interface ChatInputProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (e: React.FormEvent<HTMLFormElement>) => void;
}

const ChatInput: FC<ChatInputProps> = ({ input, onInputChange, onSend }) => {
  return (
    <form
      onSubmit={onSend}
      className="p-4 border-t border-zinc-800 bg-zinc-900"
    >
      <div className="max-w-3xl mx-auto flex items-center gap-2">
        <input
          value={input}
          onChange={onInputChange}
          type="text"
          placeholder="Ask about cyber libel, privacy law..."
          className="flex-1 px-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
