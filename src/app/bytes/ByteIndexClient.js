'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

export default function ByteIndexClient({
  deployed,
  byteTitles,
  byteSections,
  sectionLabel,
  pageNum,
  totalPages
}) {
  const [search, setSearch] = useState('');
  const unlockedCount = deployed.length;
  const totalCount = byteTitles.length;

  const filteredTitles = useMemo(() => {
    return byteTitles
      .map((title, i) => ({
        number: i + 1,
        title
      }))
      .filter((b) =>
        b.title.toLowerCase().includes(search.trim().toLowerCase())
      );
  }, [search, byteTitles]);

  const renderByteButton = (byte) => {
    const padded = String(byte.number).padStart(3, '0');
    const isDeployed = deployed.includes(byte.number);

    return (
      <a
        key={byte.number}
        href={isDeployed ? `/bytes/byte-${padded}` : '#'}
        className={`block px-4 py-3 rounded-lg text-sm font-medium transition w-full text-left ${
          isDeployed
            ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500'
        }`}
        title={isDeployed ? '' : 'Coming soon'}
      >
        Byte {padded} – {byte.title}
      </a>
    );
  };

  const renderSection = (section) => {
    const { label, range } = section;
    const sectionBytes = filteredTitles.filter(
      (b) => b.number >= range[0] && b.number <= range[1]
    );

    if (sectionBytes.length === 0) return null;

    return (
      <div key={label} className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{label}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectionBytes.map(renderByteButton)}
        </div>
      </div>
    );
  };

  const renderPagination = () => (
    <div className="flex justify-between items-center my-8">
      <Link
        href={pageNum > 1 ? `/bytes/page/${pageNum - 1}` : '#'}
        className={`px-4 py-2 rounded-lg font-semibold ${
          pageNum > 1
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Previous
      </Link>
      <span className="font-semibold text-gray-700">
        Page {pageNum} of {totalPages}
      </span>
      <Link
        href={pageNum < totalPages ? `/bytes/page/${pageNum + 1}` : '#'}
        className={`px-4 py-2 rounded-lg font-semibold ${
          pageNum < totalPages
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
      >
        Next
      </Link>
    </div>
  );

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Section Label */}
      {!search && (
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          {sectionLabel}
        </h2>
      )}

      {/* Top Pagination */}
      {!search && renderPagination()}

      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-bold text-center md:text-left">
          Byte-Sized AI Index
        </h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search Bytes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 dark:bg-gray-900 dark:text-white"
          />
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {unlockedCount} / {totalCount} Bytes unlocked
          </div>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded mb-10 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-500"
          style={{ width: `${(unlockedCount / totalCount) * 100}%` }}
        />
      </div>

      {search ? (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTitles.map(renderByteButton)}
          </div>
        </div>
      ) : (
        byteSections.map(renderSection)
      )}

      {/* Bottom Pagination */}
      {!search && renderPagination()}
    </main>
  );
}