import fs from 'fs';
import path from 'path';
import { BYTE_TITLES, BYTE_SECTIONS } from '../../lib/byteTitles';

export default function ByteIndexPage() {
  const contentDir = path.join(process.cwd(), 'content/bytes');
  const files = fs.readdirSync(contentDir);

  const deployed = files
    .map((file) => file.match(/byte-(\d{3})\.html/))
    .filter(Boolean)
    .map((match) => parseInt(match[1]));

  const renderByteButton = (number, title) => {
    const padded = String(number).padStart(3, '0');
    const isDeployed = deployed.includes(number);

    return (
      <a
        key={number}
        href={isDeployed ? `/bytes/byte-${padded}` : '#'}
        className={`block px-4 py-3 rounded-lg text-sm font-medium transition w-full text-left ${
          isDeployed
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
        title={isDeployed ? '' : 'Coming soon'}
      >
        Byte {padded} – {title}
      </a>
    );
  };

  const renderSection = (section, indexOffset) => {
    const { label, range } = section;
    const buttons = [];

    for (let i = range[0]; i <= range[1]; i++) {
      buttons.push(renderByteButton(i, BYTE_TITLES[i - 1]));
    }

    return (
      <div key={label} className="mb-12">
        <h2 className="text-2xl font-bold mb-4">{label}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{buttons}</div>
      </div>
    );
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Byte-Sized AI Index</h1>
      {BYTE_SECTIONS.map(renderSection)}
    </main>
  );
}