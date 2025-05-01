 // src/app/cookie-policy/page.tsx
import React from 'react';

export default function CookiePolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>

      <p className="mb-4">
        This Cookie Policy explains how Cyberlegal.AI (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) uses cookies and similar
        technologies to recognize you when you visit our website. It explains what these technologies are,
        why we use them, and your rights to control our use of them.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">What are cookies?</h2>
      <p className="mb-4">
        Cookies are small data files that are placed on your computer or mobile device when you visit a website.
        Cookies are widely used by website owners to make their websites work, or to work more efficiently,
        as well as to provide reporting information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Why do we use cookies?</h2>
      <p className="mb-4">
        We use cookies for several reasons: to ensure the website operates correctly, to analyze how our
        website is used, to personalize your experience, and to serve targeted content.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Types of cookies we use</h2>
      <ul className="list-disc list-inside mb-4">
        <li><strong>Essential cookies:</strong> Required for the website to function properly.</li>
        <li><strong>Analytics cookies:</strong> Help us understand how users interact with our site (e.g., Google Analytics).</li>
        <li><strong>Functional cookies:</strong> Remember your preferences and settings.</li>
        <li><strong>Marketing cookies:</strong> Used to deliver relevant ads or content based on browsing behavior.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">How to control cookies</h2>
      <p className="mb-4">
        You have the right to accept or reject cookies. You can do this via the banner on our site or change your
        browser settings to reject cookies. Note that disabling cookies may affect your site experience.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-party cookies</h2>
      <p className="mb-4">
        Some cookies may be placed by third-party services that appear on our pages. We do not control these cookies.
        Refer to their respective policies for more information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Updates to this policy</h2>
      <p className="mb-4">
        We may update this Cookie Policy from time to time. When we do, we will revise the updated date at the top of this page.
      </p>
    </div>
  );
}
