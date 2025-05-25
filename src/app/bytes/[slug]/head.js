import fs from 'fs';
import path from 'path';

export default async function Head({ params }) {
  const filePath = path.join(process.cwd(), 'content/bytes', `${params.slug}.html`);
  const html = await fs.promises.readFile(filePath, 'utf-8');

  const match = html.match(/<title>(.*?)<\/title>/i);
  const title = match ? match[1] : 'Byte-Sized AI for MC Pros';

  return (
    <>
      <title>{title}</title>
      <meta
        name="description"
        content="Daily Byte-Sized AI insights for management consultants. Stay sharp. Stay relevant."
      />
    </>
  );
}