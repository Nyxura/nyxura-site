import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { BYTE_TITLES } from '@/lib/byteTitles';
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

  const byteNumber = parseInt(params.slug.replace('byte-', ''));
  const padded = String(byteNumber).padStart(3, '0');
  const byteTitle = BYTE_TITLES[byteNumber - 1] || 'Unknown Byte';
  const publishDate = new Date().toLocaleDateString('en-CA');

  const prevByte = byteNumber > 1 ? `/bytes/byte-${String(byteNumber - 1).padStart(3, '0')}` : null;
  const nextByte = byteNumber < BYTE_TITLES.length ? `/bytes/byte-${String(byteNumber + 1).padStart(3, '0')}` : null;

  return (
    <main className="min-h-screen bg-white text-black px-4 py-10 md:py-20 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="text-sm text-gray-500">Byte #{padded}</p>
        <h1 className="text-3xl font-bold text-blue-800 mb-2">{byteTitle}</h1>
        <p className="text-sm text-gray-500">
          Published on {publishDate} by <span className="font-semibold">Nyxura.ai</span> - Curated by <span className="font-semibold">Tarafa Homsy</span>
        </p>
      </div>

      {/* Placeholder image using local static file (update as needed) */}
      <div className="mb-8">
        <Image
          src="/nyxura-placeholder-light.PNG" // Adjust path to your actual image file
          alt={`Visual for ${byteTitle}`}
          width={800}
          height={300}
          className="w-full rounded-xl object-cover shadow-sm"
        />
      </div>

      {/* Rendered Byte HTML content */}
      <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: bodyContent }} />

      {/* Navigation */}
      <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4">
        {prevByte ? (
          <Link href={prevByte} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm text-gray-800">
            ← Previous Byte
          </Link>
        ) : <div />}

        <Link href="/bytes" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm text-center">
          Back to Byte Index
        </Link>

        {nextByte ? (
          <Link href={nextByte} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm text-gray-800">
            Next Byte →
          </Link>
        ) : <div />}
      </div>
    </main>
  );
}