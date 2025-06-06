"use client";

import { FC, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";  
interface ChatEmptyStateProps {
  onPresetClick: (text: string) => void;
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (e: React.FormEvent) => void;
}

const rolePrompts: Record<string, string[]> = {
  Prosecutor: [
    "What constitutes cyber libel under PH law?",
    "What case laws support evidence admissibility?",
    "How to file a complaint against online fraud?"
  ],
  Defendant: [
    "What are defenses against cyber libel?",
    "How to challenge digital evidence in court?",
    "Can I be held liable for private messages leaked?"
  ],
  Judge: [
    "Summarize key rulings on RA 10175.",
    "What is jurisprudence on online entrapment?",
    "Guide to issuing search warrants on cloud data"
  ],
};

const ChatEmptyState: FC<ChatEmptyStateProps> = ({
  onPresetClick,
  input,
  onInputChange,
  onSend,
}) => {
  const [selectedRole, setSelectedRole] =
    useState<keyof typeof rolePrompts>("Prosecutor");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [activePrompt, setActivePrompt] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center h-[70vh] text-center transition-opacity duration-500 px-4">
        <h2 className="text-xl font-semibold p-6">What legal question do you have in mind?</h2>
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg shadow-md w-full max-w-2xl px-6 py-6 space-y-6">

        {/* Role + Tone Dropdowns */}
        <div className="flex justify-start gap-4 text-xs text-zinc-300">
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">AI Role:</span>
            <select
              value={selectedRole}
              onChange={(e) =>
                setSelectedRole(e.target.value as keyof typeof rolePrompts)
              }
              className="bg-zinc-800 border border-zinc-700 px-2 py-1 rounded-md text-white cursor-pointer"
            >
              <option>Prosecutor</option>
              <option>Defendant</option>
              <option>Judge</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">AI Tone:</span>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 px-2 py-1 rounded-md text-white cursor-pointer"
            >
              <option>Professional</option>
              <option>Casual</option>
              <option>Neutral</option>
            </select>
          </div>
        </div>

        {/* Input field */}
        <form
      onSubmit={onSend}
      className="relative flex items-center w-full"
    >
      <input
        value={input}
        onChange={onInputChange}
        type="text"
        placeholder="Tell me about the case..."
        className="w-full pr-12 pl-4 py-2 rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-600 transition cursor-pointer"
        aria-label="Send"
      >
        <PaperAirplaneIcon className="w-5 h-5 rotate-320" />
      </button>
    </form>
      </div>

      {/* Role Tabs */}
      <div className="mt-8 text-sm text-zinc-400">
        <p className="mb-2">Here are some prompts to help you begin:</p>
        <div className="flex justify-center gap-2 mb-4">
          {(["Prosecutor", "Defendant", "Judge"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-md border text-sm cursor-pointer ${
                selectedRole === role
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              As a {role}
            </button>
          ))}
        </div>

        {/* Prompt Suggestions */}
        <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
          {rolePrompts[selectedRole].map((prompt, idx) => {
            const isActive = activePrompt === prompt;

            return (
              <button
                key={idx}
                onClick={() => {
                  onPresetClick(prompt);
                  setActivePrompt(prompt);
                }}
                className={`px-4 py-2 rounded-full text-sm border transition whitespace-nowrap cursor-pointer
                  ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600"
                      : "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-indigo-500 hover:text-white"
                  }`}
              >
                {prompt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChatEmptyState;
