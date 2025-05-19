"use client";

import { useRef, useEffect } from "react";
import { FC, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

interface ChatEmptyStateProps {
  onPresetClick: (text: string) => void;
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (e: React.FormEvent) => void;
}

const rolePrompts: Record<string, string[]> = {
  Defendant: [
    "What are possible legal defenses against cyber libel accusations in the Philippines?",

    "How can I challenge the authenticity of digital evidence used against me in court?",

    "Am I criminally liable if someone else leaked our private messages?",
  ],
  Prosecutor: [
    "What evidence best supports a cyberlibel case, and how can I collect it to ensure it's admissible in court?",
    "What types of damages (reputational, financial, emotional) should I prove, and how can I show their impact to the court?",
    "How can we identify someone using a fake or anonymous account, and what legal steps can we take against them?",
  ],
  Judge: [
    "Summarize landmark Supreme Court decisions interpreting RA 10175.",
    "What guidelines exist on the validity of online entrapment operations?",
    "What legal standards apply in issuing warrants for cloud-stored data?",
  ],
};

const ChatEmptyState: FC<ChatEmptyStateProps> = ({
  onPresetClick,
  input,
  onInputChange,
  onSend,
}) => {
  const [selectedRole, setSelectedRole] =
    useState<keyof typeof rolePrompts>("Defendant");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"; // reset height
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        200
      )}px`; // max 5 rows
    }
  }, [input]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center transition-opacity duration-500 px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg sm:text-xl font-semibold p-4 sm:p-6">
        What legal question do you have in mind?
      </h2>

      <div className="border border-zinc-700 rounded-lg shadow-md w-full px-4 sm:px-6 py-4 sm:py-6 space-y-6">
        {/* Role + Tone Dropdowns */}
        <div className="flex sm:flex-row gap-3 sm:gap-4 text-xs text-zinc-300">
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
        <form onSubmit={onSend} className="relative flex items-center w-full">
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            value={input}
            onChange={(e) =>
              onInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            rows={4}
            placeholder="Tell me about the case..."
            className="w-full pr-12 pl-4 py-2 resize-none rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-[200px] overflow-y-auto"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#4F39F6" }}
          />
          {/* <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-600 transition cursor-pointer"
            aria-label="Send"
          >
            <PaperAirplaneIcon className="w-5 h-5 rotate-320" />
          </button> */}
          {input.trim() !== "" && input.trim() !== "" && (
            <div className="absolute right-2 bottom-0 group">
              <button
                type="submit"
                className="text-indigo-400 hover:text-indigo-600 transition cursor-pointer py-3"
                aria-label="Send"
              >
                <PaperAirplaneIcon className="w-5 h-5 rotate-320" />
              </button>
              <span className="absolute bottom-0 mb-2 left-5 transform translate-y-1 scale-0 group-hover:scale-100 transition-all bg-zinc-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                Click to Send
              </span>
            </div>
          )}
        </form>
      </div>

      {/* Role Tabs */}
      <div className="mt-8 text-sm text-zinc-400 w-full max-w-3xl">
        <p className="mb-4 text-center px-4 sm:px-0">
          Here are some prompts to help you begin:
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-4 px-4 sm:px-0">
          {(["Defendant", "Prosecutor", "Judge"] as const).map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-lg border text-sm cursor-pointer transition-all ${
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
        <div className="flex flex-col gap-2 px-4 sm:px-0">
          {rolePrompts[selectedRole].map((prompt, idx) => {
            const isActive = activePrompt === prompt;

            return (
              <button
                key={idx}
                onClick={() => {
                  onPresetClick(prompt);
                  setActivePrompt(prompt);
                }}
                className={`px-2 py-2 text-sm transition text-left cursor-pointer border-b-2 max-w-3xl ${
                  isActive
                    ? "text-white rounded-lg bg-indigo-500 border-0"
                    : "text-zinc-300 hover:text-white hover:bg-indigo-500 hover:rounded-lg transition-all ease-in-out"
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
