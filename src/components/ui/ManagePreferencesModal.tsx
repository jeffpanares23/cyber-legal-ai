// src/app/components/ui/ManagePreferencesModal.tsx
'use client';

import { useState } from 'react';
import { Dialog } from '@headlessui/react';

export default function ManagePreferencesModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: false,
  });

  const handleSave = () => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    setIsOpen(false);
  };

  const toggle = (type: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm underline text-blue-700 hover:text-blue-900"
      >
        Manage Preferences
      </button>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Dialog.Panel className="bg-[#111827] border-4 p-6 rounded-lg shadow-lg w-full max-w-md">
            <Dialog.Title className="text-lg font-bold mb-4">Manage Cookie Preferences</Dialog.Title>

            <div className="space-y-3">
              <div>
                <label className="flex items-center justify-between">
                  <span>Analytics Cookies</span>
                  <input type="checkbox" checked={preferences.analytics} onChange={() => toggle('analytics')} />
                </label>
              </div>
              <div>
                <label className="flex items-center justify-between">
                  <span>Marketing Cookies</span>
                  <input type="checkbox" checked={preferences.marketing} onChange={() => toggle('marketing')} />
                </label>
              </div>
            </div>
            

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} className="px-4 py-1 text-sm border rounded-md">Cancel</button>
              <button
                onClick={handleSave}
                className="px-4 py-1 text-sm bg-blue-700 text-white rounded-md hover:bg-blue-800"
              >
                Save Preferences
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
