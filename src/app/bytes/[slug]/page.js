import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { BYTE_TITLES, BYTE_SECTIONS } from '@/lib/byteTitles';
import { getDeployedByteNumbers } from '@/lib/getDeployedBytes';
import Link from 'next/link';
import Image from 'next/image';
import ScrollToTopButton from '@/components/ScrollToTopButton';
import DarkModeToggle from '@/components/DarkModeToggle';
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
            url: `https://www.nyxura.ai/nyxura-placeholder-light.PNG`,
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

  // 🆕 Calculate the page number for this Byte
  const pageNumber = BYTE_SECTIONS.findIndex(
    (section) => byteNumber >= section.range[0] && byteNumber <= section.range[1]
  ) + 1;

  const deployed = getDeployedByteNumbers().sort((a, b) => a - b);
  const currentIndex = deployed.indexOf(byteNumber);
  const prevByte = currentIndex > 0 ? `/bytes/byte-${String(deployed[currentIndex - 1]).padStart(3, '0')}` : null;
  const nextByte = currentIndex < deployed.length - 1 ? `/bytes/byte-${String(deployed[currentIndex + 1]).padStart(3, '0')}` : null;

  return (
    <main className="min-h-screen bg-white text-black px-4 pt-4 pb-10 md:pt-8 md:pb-20 max-w-3xl mx-auto dark:bg-black dark:text-white">
      <ScrollToTopButton />
      <DarkModeToggle />

      <div className="mb-6 sticky top-0 z-50 bg-white dark:bg-black pt-4 pb-6 px-4 md:px-8 shadow-sm">
        <p className="text-sm text-gray-500 dark:text-gray-400">{sectionLabel}</p>
        <h1 className="text-3xl font-bold text-blue-800 dark:text-blue-300 mb-2">{byteTitle}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Byte #{padded} · {readTime} · Published on {publishDate} by <span className="font-semibold">Nyxura.ai</span> — Crafted by <span className="font-semibold">Tarafa Homsy</span>
        </p>
      </div>

      <div className="mt-6 mb-6 flex flex-col sm:flex-row justify-between gap-4">
        {prevByte ? (
          <Link href={prevByte} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
            ← Previous Byte
          </Link>
        ) : (
          <button className="px-4 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm cursor-not-allowed" disabled>
            ← Previous Byte
          </button>
        )}

        <Link href={`/bytes/page/${pageNumber}`} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 text-sm text-center dark:bg-blue-800 dark:hover:bg-blue-700">
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

      <article className="prose prose-lg max-w-none dark:prose-invert">
        <div className="w-full mb-6 bg-white dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="relative w-full h-[150px]">
            <Image
              src="/nyxura-placeholder-light.PNG"
              alt={`Visual for ${byteTitle}`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
      </article>

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

        <Link href={`/bytes/page/${pageNumber}`} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-700 text-sm text-center dark:bg-blue-800 dark:hover:bg-blue-700">
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