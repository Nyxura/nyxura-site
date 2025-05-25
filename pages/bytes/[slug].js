// pages/bytes/[slug].js - Rendering individual byte files
import fs from 'fs';
import path from 'path';

export async function getStaticPaths() {
  const dirPath = path.join(process.cwd(), 'content/bytes');
  const files = fs.readdirSync(dirPath);
  const paths = files.map(filename => ({
    params: { slug: filename.replace('.html', '') }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const filePath = path.join(process.cwd(), 'content/bytes', `${params.slug}.html`);
  const content = fs.readFileSync(filePath, 'utf-8');
  return { props: { content } };
}

export default function BytePage({ content }) {
  return (
    <main className="min-h-screen bg-white text-black p-10 prose prose-lg mx-auto">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}