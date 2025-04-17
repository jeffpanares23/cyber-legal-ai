// src/app/components/chat/ReferenceBox.tsx

import React from "react";

const ReferenceBox: React.FC = () => {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow p-4 text-sm text-gray-800 dark:text-gray-100 space-y-2">
      <h3 className="font-semibold text-base mb-2">Rules and Regulations</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>
          <strong>RA 9775</strong> – Anti-Child Pornography Act
        </li>
        <li>
          <strong>RA 7610</strong> – Child Abuse Law
        </li>
        <li>
          <strong>RA 10175</strong> – Cybercrime Prevention Act
        </li>
      </ul>
      <h3 className="font-semibold text-base mt-4 mb-2">Cases</h3>
      <ul className="list-disc list-inside space-y-1">
        <li>
          <strong>People v. XXX</strong> – Online exploitation conviction using
          Facebook
        </li>
        <li>
          <strong>Republic Act No. 11648</strong> – Updated definition of sexual
          abuse
        </li>
      </ul>
    </div>
  );
};

export default ReferenceBox;
