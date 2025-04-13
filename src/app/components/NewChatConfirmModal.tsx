// File: src/app/components/NewChatConfirmModal.tsx
"use client";

import { FC } from "react";

interface Props {
    show: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }

const NewChatConfirmModal: FC<Props> = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-900 border border-zinc-700 p-6 rounded-lg shadow-lg w-[90%] max-w-sm text-white">
        <h2 className="text-lg font-semibold mb-4 text-center">Start a New Chat?</h2>
        <p className="text-sm text-zinc-300 mb-6 text-center">
            This will start a new chat and save your current conversation in history. Would you like to continue?
        </p>

        <div className="flex justify-between">
          <button
            className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded text-sm"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-sm"
            onClick={onConfirm}
          >
            Start New
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewChatConfirmModal;
