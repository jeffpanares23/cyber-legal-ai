"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import RoleToneControls from "./chat/RoleToneControls";

interface Props {
  input: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: (e: React.FormEvent, role: string, tone: string) => void;
}

export default function ChatInput({ input, onInputChange, onSend }: Props) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [role, setRole] = useState("neutral");
  const [tone, setTone] = useState("neutral");
  const [selectedRole, setSelectedRole] =
    useState<keyof typeof rolePrompts>("Defendant");
  const [selectedTone, setSelectedTone] = useState("Professional");
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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    // <form
    //   onSubmit={(e) => onSend(e, role, tone)}
    //   className="w-full border-t border-zinc-700/60 backdrop-blur"
    // >
    //   <div className="max-w-3xl mx-auto px-4 py-4">
    //     <RoleToneControls
    //       role={role}
    //       onRoleChange={setRole}
    //       tone={tone}
    //       onToneChange={setTone}
    //     />

    //     <div className="flex items-center gap-3">
    //       <input
    //         ref={inputRef}
    //         type="text"
    //         value={input}
    //         onChange={onInputChange}
    //         placeholder="Ask about cyber libel, privacy law..."
    //         className="flex-1 px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //       />

    //       <button
    //         type="submit"
    //         className="shrink-0 px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700
    //                    text-white text-sm font-medium flex items-center gap-1"
    //       >
    //         <PaperPlaneIcon className="h-4 w-4" /> Send
    //       </button>
    //     </div>
    //   </div>
    // </form>
    <div className="flex justify-center">
      <div className="rounded-lg max-w-6xl w-full px-4 sm:px-6 py-4 sm:py-6 space-y-6 shadow-[0px_-30px_10px_-20px_#111827] z-10">
        {/* Role + Tone Dropdowns */}
        <div className="flex sm:flex-row gap-3 sm:gap-4 text-zinc-300">
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">Role:</span>
            <select
              value={selectedRole}
              onChange={(e) =>
                setSelectedRole(e.target.value as keyof typeof rolePrompts)
              }
              className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full text-white cursor-pointer"
            >
              <option>Prosecutor</option>
              <option>Defendant</option>
              <option>Judge</option>
            </select>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">Tone:</span>
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
              className="bg-zinc-800 border border-zinc-700 px-3 py-1 rounded-full text-white cursor-pointer"
            >
              <option>Professional</option>
              <option>Casual</option>
              <option>Neutral</option>
            </select>
          </div>
        </div>

        {/* Input field */}
        <form
          onSubmit={(e) => onSend(e, role, tone)}
          className="relative flex items-center w-full"
        >
          <textarea
            // ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            ref={inputRef}
            value={input}
            onChange={(e) =>
              onInputChange(e as unknown as React.ChangeEvent<HTMLInputElement>)
            }
            rows={4}
            placeholder="Tell me about the case..."
            className="w-full pr-12 pl-4 py-2 resize-none rounded-md bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 max-h-[200px] overflow-y-auto"
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
                <PaperPlaneIcon className="w-5 h-5 rotate-320" />
              </button>
              <span className="absolute bottom-0 mb-2 left-5 transform translate-y-1 scale-0 group-hover:scale-100 transition-all bg-zinc-800 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                Click to Send
              </span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
