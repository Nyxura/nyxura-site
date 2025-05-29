import Link from 'next/link';
import { BYTE_TITLES, BYTE_SECTIONS } from '@/lib/byteTitles';
import { getDeployedByteNumbers } from '@/lib/getDeployedBytes';
// src/app/bytes/page.js

import { redirect } from 'next/navigation';

export default function BytesPage() {
  redirect('/bytes/page/1');

  return (
    <main className="min-h-screen bg-white dark:bg-black px-4 py-10 md:py-16 text-black dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">Byte-Sized AI for MC Pros</h1>
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-10">
        🧠 Progress: {unlockedCount} / 80 Bytes Unlocked
      </p>

      {BYTE_SECTIONS.map((section, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-xl font-semibold mb-4 text-blue-700 dark:text-blue-300">
            {section.label}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {BYTE_TITLES.slice(section.range[0] - 1, section.range[1]).map((title, i) => {
              const byteNumber = section.range[0] + i;
              const padded = String(byteNumber).padStart(3, '0');
              const isUnlocked = deployed.includes(byteNumber);

              return isUnlocked ? (
                <Link
                  key={padded}
                  href={`/bytes/byte-${padded}`}
                  className="block px-3 py-4 bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white rounded-xl shadow-sm hover:bg-blue-200 dark:hover:bg-blue-700 transition text-sm text-center"
                >
                  <span className="block font-semibold mb-1">Byte {padded}</span>
                  <span>{title}</span>
                </Link>
              ) : (
                <div
                  key={padded}
                  className="block px-3 py-4 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-xl shadow-inner text-sm text-center cursor-not-allowed"
                >
                  <span className="block font-semibold mb-1">Byte {padded}</span>
                  <span>{title}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </main>
  );
}