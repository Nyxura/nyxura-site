import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { BYTE_TITLES } from '@/lib/byteTitles';

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
  const publishDate = new Date().toLocaleDateString('en-CA'); // use your real date logic later

  const prevByte = byteNumber > 1 ? `/bytes/byte-${String(byteNumber - 1).padStart(3, '0')}` : null;
  const nextByte = byteNumber < BYTE_TITLES.length ? `/bytes/byte-${String(byteNumber + 1).padStart(3, '0')}` : null;

  return (
    <main className="min-h-screen bg-white text-black px-4 py-10 md:py-20 max-w-3xl mx-auto">
      <div className="mb-6">
        <p className="text-sm text-gray-500">Byte #{padded}</p>
        <h1 className="text-3xl font-bold text-blue-800 mb-2">{byteTitle}</h1>
        <p className="text-sm text-gray-500">
          Published on {publishDate} by <span className="font-semibold">Nyxura.ai</span> – Curated by <span className="font-semibold">Tarafa Homsy</span> - AI Strategist & Consultant
        </p>
      </div>

      {/* Optional AI image placeholder */}
      <div className="mb-8">
        <img
        //src="https://placehold.co/800x300?text=nyxura.ai"
        src="/nyxura-logo-light.png"
        alt={`Placeholder for ${byteTitle}`}
        className="w-full rounded-xl object-cover shadow-sm"
        />

      </div>

      {/* Rendered Byte HTML */}
      <article className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: bodyContent }} />

      {/* Navigation buttons */}
      <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4">
        {prevByte ? (
          <a href={prevByte} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm text-gray-800">
            ← Previous Byte
          </a>
        ) : <div />}
        
        <a href="/bytes" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm text-center">
          Back to Byte Index
        </a>

        {nextByte ? (
          <a href={nextByte} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm text-gray-800">
            Next Byte →
          </a>
        ) : <div />}
      </div>
    </main>
  );
}
