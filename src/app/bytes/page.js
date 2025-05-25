import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export const dynamic = 'force-static';

export default function ByteIndex() {
  const dirPath = path.join(process.cwd(), 'content/bytes');
  const files = fs.readdirSync(dirPath);
const bytes = files.map(filename => {
  const match = filename.match(/(\d+)/);
  const paddedNumber = match ? match[1].padStart(3, '0') : '???';
  return {
    slug: filename.replace('.html', ''),
    title: `Byte ${paddedNumber}`
  };
});
  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8 text-center">Byte-Sized AI for MC Pros</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bytes.map(byte => (
          <Link href={`/bytes/${byte.slug}`} key={byte.slug}>
            <div className="bg-white text-black p-6 rounded-xl shadow-md hover:bg-gray-100 transition-all">
              {byte.title}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}