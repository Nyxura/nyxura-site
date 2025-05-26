import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

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
  } catch (err) {
    return {
      title: 'Byte-Sized AI for MC Pros',
      description: 'AI strategy insights built for modern consultants.',
    };
  }
}

export default async function BytePage({ params }) {
  const filePath = path.join(process.cwd(), 'content/bytes', `${params.slug}.html`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fullHTML = fs.readFileSync(filePath, 'utf-8');

  // Extract just the content between <body> and </body>
  const bodyMatch = fullHTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : fullHTML;

  return (
    <main className="min-h-screen bg-white text-black p-10 prose prose-lg mx-auto">
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </main>
  );
}
