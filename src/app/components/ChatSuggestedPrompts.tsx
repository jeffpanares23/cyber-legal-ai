"use client";

import { FC, useState } from "react";

interface ChatSuggestedPromptsProps {
  onSelect: (text: string) => void;
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
  ]
};

const roles = Object.keys(rolePrompts);

const ChatSuggestedPrompts: FC<ChatSuggestedPromptsProps> = ({ onSelect }) => {
  const [selectedRole, setSelectedRole] = useState("Prosecutor");

  return (
    <div className="max-w-3xl mx-auto mt-6 px-4 sm:px-0">
      {/* Segmented Control Tabs */}
      <div className="flex justify-center mb-4">
        <div className="inline-flex bg-zinc-800 rounded-lg p-1 border border-zinc-700">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-1.5 text-sm rounded-md transition-all ${
                selectedRole === role
                  ? "bg-indigo-600 text-white shadow"
                  : "text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Suggested Prompts */}
      <div className="flex flex-wrap gap-2 justify-center">
        {rolePrompts[selectedRole].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelect(prompt)}
            className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm hover:bg-zinc-700 text-white transition"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatSuggestedPrompts;
