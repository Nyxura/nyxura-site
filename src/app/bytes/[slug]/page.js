import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import Head from 'next/head';

export async function generateStaticParams() {
  const dirPath = path.join(process.cwd(), 'content/bytes');
  const files = fs.readdirSync(dirPath);
  return files.map(filename => ({
    slug: filename.replace('.html', '')
  }));
}

export default async function BytePage({ params }) {
  const filePath = path.join(process.cwd(), 'content/bytes', `${params.slug}.html`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, 'utf-8');

  // Extract the <title> content from the HTML string
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : 'Byte-Sized AI for MC Pros';

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main className="min-h-screen bg-white text-black p-10 prose prose-lg mx-auto">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </main>
    </>
  );
}
