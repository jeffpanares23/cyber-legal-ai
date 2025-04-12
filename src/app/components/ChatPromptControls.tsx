"use client";

import { FC } from "react";

interface ChatPromptControlsProps {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (e: React.FormEvent) => void;
  role: string;
  tone: string;
  onRoleChange: (role: string) => void;
  onToneChange: (tone: string) => void;
}

const ChatPromptControls: FC<ChatPromptControlsProps> = ({
  input,
  onInputChange,
  onSend,
  role,
  tone,
  onRoleChange,
  onToneChange,
}) => {
  return (
    <form
      onSubmit={onSend}
      className="bg-white border rounded-md px-4 py-3 shadow-sm space-y-3 max-w-3xl mx-auto"
    >
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <div className="flex gap-2">
          <label className="text-sm text-gray-700 font-medium">AI Role:</label>
          <select
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="Prosecutor">Prosecutor</option>
            <option value="Defendant">Defendant</option>
            <option value="Judge">Judge</option>
          </select>
        </div>
        <div className="flex gap-2">
          <label className="text-sm text-gray-700 font-medium">AI Tone:</label>
          <select
            value={tone}
            onChange={(e) => onToneChange(e.target.value)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="Professional">Professional</option>
            <option value="Casual">Casual</option>
            <option value="Strict">Strict</option>
          </select>
        </div>
      </div>

      <input
        type="text"
        placeholder="Tell me about the case..."
        value={input}
        onChange={onInputChange}
        className="w-full border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </form>
  );
};

export default ChatPromptControls;
