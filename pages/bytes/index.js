// Byte Engine Phase 1: Static Publishing System for Nyxura.ai
// Technologies: Next.js + GitHub (via Zapier) + Vercel

// 1. CONTENT STRUCTURE (inside GitHub repo)
// Directory: /content/bytes/
// Files: byte-001.html, byte-002.html, ...

// 2. FRONTEND FILES

// pages/bytes/index.js - Listing all published bytes
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export async function getStaticProps() {
  const dirPath = path.join(process.cwd(), 'content/bytes');
  const files = fs.readdirSync(dirPath);
  const bytes = files.map(filename => ({
    slug: filename.replace('.html', ''),
    title: filename.replace('byte-', 'Byte ').replace('.html', '')
  }));
  return { props: { bytes } };
}

export default function ByteIndex({ bytes }) {
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Byte-Sized AI for MC Pros</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bytes.map(byte => (
          <Link href={`/bytes/${byte.slug}`} key={byte.slug}>
            <div className="bg-white text-black p-6 rounded-xl shadow-md hover:bg-gray-100 transition-all">
              {byte.title}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}