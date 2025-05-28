import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { BYTE_TITLES } from '@/lib/byteTitles';
import Link from 'next/link';
import Image from 'next/image';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { getDeployedByteNumbers } from '@/lib/getDeployedBytes';
import { BYTE_SECTIONS } from '@/lib/byteTitles'; // Make sure this import is present
import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

export async function generateMetadata({ params }) {
  const filePath = path.join(process.cwd(), 'content/bytes', `${params.slug}.html`);
  try {
    const html = await fs.promises.readFile(filePath, 'utf-8');
    const match = html.match(/<title>(.*?)<\/title>/i);
    const title = match ? match[1] : 'Byte-Sized AI for MC Pros';
    return {
      title,
      description: 'Bold, practical AI insights for consultants. Stay sharp. Stay future-proof. One Byte at a time.',
      openGraph: {
        title,
        description: 'Daily Byte from Nyxura.ai – Tactical, powerful AI insights for consultants.',
        type: 'article',
        url: `https://nyxura.ai/bytes/${params.slug}`,
        images: [
          {
            url: `nyxura.ai/nyxura-placeholder-light.PNG`,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
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
  const words = bodyContent.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  const readTime = `${minutes} min read`;

  const sectionLabel = BYTE_SECTIONS.find(
  (section) => byteNumber >= section.range[0] && byteNumber <= section.range[1]
  )?.label || 'AI Insight';

  const deployed = getDeployedByteNumbers().sort((a, b) => a - b);
  const currentIndex = deployed.indexOf(byteNumber);
  const prevByte = currentIndex > 0 ? `/bytes/byte-${String(deployed[currentIndex - 1]).padStart(3, '0')}` : null;
  const nextByte = currentIndex < deployed.length - 1 ? `/bytes/byte-${String(deployed[currentIndex + 1]).padStart(3, '0')}` : null;

  return (
    <main className="min-h-screen bg-white text-black px-4 py-10 md:py-20 max-w-3xl mx-auto dark:bg-black dark:text-white">
      <ScrollToTopButton />

      <div className="mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">{sectionLabel}</p>
        <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-2">{byteTitle}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Byte #{padded} · {readTime} · Published on {publishDate} by <span className="font-semibold">Nyxura.ai</span> — Crafted by <span className="font-semibold">Tarafa Homsy</span>
        </p>
      </div>

      {/* Top Navigation Buttons */}
      <div className="mt-6 mb-8 flex flex-col sm:flex-row justify-between gap-4">
        {prevByte ? (
          <Link href={prevByte} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
            ← Previous Byte
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm cursor-not-allowed" disabled>
            ← Previous Byte
          </button>
        )}

        <Link href="/bytes" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 text-sm text-center dark:bg-blue-800 dark:hover:bg-blue-700">
          Back to All Bytes
        </Link>

        {nextByte ? (
          <Link href={nextByte} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
            Next Byte →
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm cursor-not-allowed" disabled>
            Next Byte →
          </button>
        )}
      </div>

      <div className="mb-8">
        <Image
          src="/nyxura-placeholder-light.PNG"
          alt={`Visual for ${byteTitle}`}
          width={800}
          height={300}
          className="w-full rounded-xl object-cover shadow-sm"
        />
      </div>

      <article className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: bodyContent }} />

      <div className="mt-12 flex flex-col sm:flex-row justify-between gap-4">
        {prevByte ? (
          <Link href={prevByte} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
            ← Previous Byte
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm cursor-not-allowed" disabled>
            ← Previous Byte
          </button>
        )}

        <Link href="/bytes" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 text-sm text-center dark:bg-blue-800 dark:hover:bg-blue-700">
          Back to All Bytes
        </Link>

        {nextByte ? (
          <Link href={nextByte} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
            Next Byte →
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm cursor-not-allowed" disabled>
            Next Byte →
          </button>
        )}
      </div>

<div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-6 text-sm text-gray-500 dark:text-gray-400">
  <p className="mb-2 font-medium">Share this Byte:</p>
  <div className="flex gap-4">
    <a
      href={`https://www.linkedin.com/sharing/share-offsite/?url=https://nyxura.ai/bytes/byte-${padded}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:underline text-blue-700 dark:text-blue-400"
    >
      <FaLinkedin className="text-lg" /> LinkedIn
    </a>
    <a
      href={`https://twitter.com/intent/tweet?url=https://nyxura.ai/bytes/byte-${padded}&text=${encodeURIComponent(byteTitle)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 hover:underline text-blue-500 dark:text-blue-300"
    >
      <FaTwitter className="text-lg" /> Twitter
    </a>
    <a
      href={`mailto:?subject=${encodeURIComponent(byteTitle)}&body=${encodeURIComponent(`Check this out: https://nyxura.ai/bytes/byte-${padded}`)}`}
      className="flex items-center gap-2 hover:underline text-gray-600 dark:text-gray-300"
    >
      <FaEnvelope className="text-lg" /> Email
    </a>
  </div>
</div>
    </main>
  );
}
