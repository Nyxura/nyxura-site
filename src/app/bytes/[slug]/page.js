import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

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
  return (
    <main className="min-h-screen bg-white text-black p-10 prose prose-lg mx-auto">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}