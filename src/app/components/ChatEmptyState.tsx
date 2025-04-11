// components/ChatEmptyState.tsx

interface ChatEmptyStateProps {
    onPresetClick: (text: string) => void;
  }
  
  export default function ChatEmptyState({ onPresetClick }: ChatEmptyStateProps) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center transition-opacity duration-500">
        <h2 className="text-2xl font-semibold mb-3">What can I help with?</h2>
        <p className="text-sm text-zinc-400 mb-6 max-w-md">
          Ask any question about Philippine cyber law: cyber libel, data privacy, electronic evidence, and more.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: "Explain", prompt: "What is cyber libel?" },
            { label: "Digest", prompt: "Summarize G.R. No. 123456" },
            { label: "Find", prompt: "What laws protect online data?" },
            { label: "Draft", prompt: "Draft a cyber complaint" },
          ].map(({ label, prompt }) => (
            <button
              key={label}
              onClick={() => onPresetClick(prompt)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-sm hover:bg-zinc-700"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  }
  