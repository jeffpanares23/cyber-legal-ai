'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleConsent = (accepted: boolean) => {
    localStorage.setItem('cookieConsent', accepted ? 'accepted' : 'rejected');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-300 shadow p-4 flex flex-col md:flex-row items-start md:items-center justify-between text-sm md:text-base gap-2 md:gap-4">
      <span className="text-gray-800">
        We and <strong>our partners</strong> use cookies to personalize your experience, show ads based on your interests, and for analytics. By using our site, you agree to our use of cookies. See our{' '}
        <Link href="/cookie-policy" className="underline font-medium text-blue-700 hover:text-blue-900">Cookie Policy</Link>.
      </span>
      <div className="flex gap-2 mt-2 md:mt-0">
        <button
          onClick={() => handleConsent(true)}
          className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-1 rounded-md"
        >
          Accept
        </button>
        <button
          onClick={() => handleConsent(false)}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded-md"
        >
          Reject
        </button>
      </div>
    </div>
  );
}
