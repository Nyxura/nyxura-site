import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { BYTE_TITLES, BYTE_SECTIONS } from '@/lib/byteTitles';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata({ params }) {
  const filePath = path.join(process.cwd(), 'content/bytes', `${params.slug}.html`);
  try {
    const html = await fs.promises.readFile(filePath, 'utf-8');
    const match = html.match(/<title>(.*?)<\/title>/i);
    const title = match ? match[1] : 'Byte-Sized AI for MC Pros';
    return {
      title,
      description: 'Bold, practical AI insights for consultants. Stay sharp. Stay future-proof. One Byte at a time.',
    };
  } catch {
    return {
      title: 'Byte-Sized AI for MC Pros',
      description: 'AI strategy insights built for modern consultants.',
    };
  }
}

export default async function BytePage({ params }) {
  const filePath = path.join(process.cwd(), 'content/bytes', `${params.slug}.html`);
  if (!fs.existsSync(filePath)) notFound();

  const fullHTML = fs.readFileSync(filePath, 'utf-8');
  const bodyMatch = fullHTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : fullHTML;

  const responsiveStyle = `
    <style>
      @media (max-width: 640px) {
        table {
          width: 100% !important;
        }
        td {
          padding: 12px !important;
        }
        img {
          max-width: 100% !important;
          height: auto !important;
        }
      }
    </style>
  `;

  const wrappedBody = `${responsiveStyle}${bodyContent}`;
  const byteNumber = parseInt(params.slug.replace('byte-', ''));
  const padded = String(byteNumber).padStart(3, '0');
  const byteTitle = BYTE_TITLES[byteNumber - 1] || 'Unknown Byte';
  const publishDate = new Date().toLocaleDateString('en-CA');

  const prevByte = byteNumber > 1 ? `/bytes/byte-${String(byteNumber - 1).padStart(3, '0')}` : null;
  const nextByte = byteNumber < BYTE_TITLES.length ? `/bytes/byte-${String(byteNumber + 1).padStart(3, '0')}` : null;

  const NavButtons = () => (
    <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
      {prevByte ? (
        <Link href={prevByte} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm">
          ← Previous Byte
        </Link>
      ) : <div />}

      <Link href="/bytes" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm text-center">
        ← All Bytes
      </Link>

      {nextByte ? (
        <Link href={nextByte} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 text-sm">
          Next Byte →
        </Link>
      ) : <div />}
    </div>
  );

  return (
    <main className="min-h-screen bg-white text-black px-4 py-10 md:py-20 max-w-3xl mx-auto">
      <NavButtons />

      <div className="mb-6">
        <p className="text-sm text-gray-500">Byte #{padded}</p>
        <h1 className="text-3xl font-bold text-blue-800 mb-2">{byteTitle}</h1>
        <p className="text-sm text-gray-500">
          Published on {publishDate} by <span className="font-semibold">Nyxura.ai</span> – Curated by <span className="font-semibold">Tarafa Homsy</span>
        </p>
      </div>

      <div className="mb-8">
        <Image
          src="/nyxura-placeholder-light.png"
          alt={`Visual for ${byteTitle}`}
          width={800}
          height={300}
          className="w-full rounded-xl object-cover shadow-sm"
        />
      </div>

      <article className="prose prose-lg max-w-none overflow-x-auto">
        <div dangerouslySetInnerHTML={{ __html: wrappedBody }} />
      </article>

      <div className="mt-12">
        <NavButtons />
      </div>
    </main>
  );
}
