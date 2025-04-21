// src/app/components/chat/ReferenceBox.tsx

import React from "react";

type SourceItem = {
  title: string;
  description: string;
};

type ReferenceBoxProps = {
  sources?: {
    rules?: SourceItem[];
    cases?: SourceItem[];
  } | null;
};

const ReferenceBox: React.FC<ReferenceBoxProps> = ({ sources }) => {
  if (!sources) return null;

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow p-4 text-sm text-gray-800 dark:text-gray-100 space-y-2">
      {sources.rules && sources.rules.length > 0 && (
        <>
          <h3 className="font-semibold text-base mb-2">
            Rules and Regulations
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {sources.rules.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong> – {item.description}
              </li>
            ))}
          </ul>
        </>
      )}

      {sources.cases && sources.cases?.length > 0 && (
        <>
          <h3 className="font-semibold text-base mt-4 mb-2">Cases</h3>
          <ul className="list-disc list-inside space-y-1">
            {sources.cases.map((item, index) => (
              <li key={index}>
                <strong>{item.title}</strong> – {item.description}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ReferenceBox;
