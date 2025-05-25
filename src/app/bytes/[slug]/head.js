import fs from 'fs';
import path from 'path';

export default async function Head({ params }) {
  const filePath = path.join(process.cwd(), 'content/bytes', `${params.slug}.html`);

  let title = 'Byte-Sized AI for MC Pros';
  let description =
    'Bold, practical AI insights for consultants. Stay sharp. Stay future-proof. One Byte at a time.';

  try {
    const html = await fs.promises.readFile(filePath, 'utf-8');
    const match = html.match(/<title>(.*?)<\/title>/i);
    if (match) {
      title = match[1];
    }
  } catch (error) {
    console.error('🔥 head.js failed to load Byte HTML:', error.message);
  }

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
    </>
  );
}