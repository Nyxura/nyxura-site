// Server Component — safe and clean

import { notFound } from 'next/navigation';
import { BYTE_TITLES, BYTE_SECTIONS } from '@/lib/byteTitles';
import { getDeployedByteNumbers } from '@/lib/server/getDeployedByteNumbers';
import ByteSearchGrid from '@/components/ByteSearchGrid'; // this is the client component

const BYTES_PER_PAGE = 20;

export async function generateStaticParams() {
  const totalPages = Math.ceil(BYTE_TITLES.length / BYTES_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }));
}

export default async function ByteIndexPage({ params }) {
  const pageNum = parseInt(params.page);
  const totalPages = Math.ceil(BYTE_TITLES.length / BYTES_PER_PAGE);

  if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) notFound();

  const deployed = await getDeployedByteNumbers();
  const start = (pageNum - 1) * BYTES_PER_PAGE;
  const end = start + BYTES_PER_PAGE;
  const byteSlice = BYTE_TITLES.slice(start, end);
  const sectionLabel = BYTE_SECTIONS[Math.floor((pageNum - 1) / 1)]?.label || '';

  return (
    <ByteSearchGrid
      pageNum={pageNum}
      totalPages={totalPages}
      sectionLabel={sectionLabel}
      byteSlice={byteSlice}
      deployed={deployed}
      start={start}
    />
  );
}
