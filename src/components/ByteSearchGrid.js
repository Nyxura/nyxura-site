'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function ByteSearchGrid({ pageNum, totalPages, label, byteSlice, deployed, start }) {
  const [query, setQuery] = useState('');

  const filteredByteSlice = byteSlice
    .map((title, idx) => ({ title, idx }))
    .filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));

  return (
    <main className="max-w-6xl mx-auto py-12 px-6">
      <div className="flex flex-col items-center mb-12">
        <Image
          src="/nyxura-placeholder-light.PNG"
          alt="Nyxura Logo"
          width={160}
          height={160}
          className="mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">Byte Index — Page {pageNum}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{label}</p>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Page {pageNum} of {totalPages}</p>

        <div className="mb-6 w-full">
          <input
            type="text"
            placeholder="Search Bytes on this page..."
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredByteSlice.map(({ title, idx }) => {
          const byteNum = start + idx + 1;
          const padded = String(byteNum).padStart(3, '0');
          const isUnlocked = deployed.includes(byteNum);

          return isUnlocked ? (
            <Link
              key={padded}
              href={`/bytes/byte-${padded}`}
              className="block p-3 rounded-lg bg-white dark:bg-gray-800 shadow hover:shadow-lg transition"
            >
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Byte {padded}</span>
              <span className="block font-semibold text-gray-900 dark:text-white">{title}</span>
            </Link>
          ) : (
            <div
              key={padded}
              className="block p-3 rounded-lg bg-gray-100 dark:bg-gray-800 opacity-50 cursor-not-allowed"
            >
              <span className="block text-sm text-gray-400 mb-1">Byte {padded} 🔒</span>
              <span className="block text-gray-400 line-clamp-2">{title}</span>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-12 text-sm">
        {pageNum > 1 ? (
          <Link href={`/bytes/page/${pageNum - 1}`} className="text-blue-600 dark:text-blue-400 hover:underline">
            ← Previous
          </Link>
        ) : <span></span>}

        {pageNum < totalPages && (
          <Link href={`/bytes/page/${pageNum + 1}`} className="text-blue-600 dark:text-blue-400 hover:underline">
            Next →
          </Link>
        )}
      </div>
    </main>
  );
}
