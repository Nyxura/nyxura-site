// Server Component — safe and clean

import { notFound } from 'next/navigation';
import { BYTE_TITLES, BYTE_SECTIONS } from '@/lib/byteTitles';
import { getDeployedByteNumbers } from '@/lib/server/getDeployedByteNumbers';
import ByteIndexClient from '../../ByteIndexClient'; // use relative path

export async function generateStaticParams() {
  return BYTE_SECTIONS.map((_, i) => ({ page: (i + 1).toString() }));
}

export default async function ByteIndexPage({ params }) {
  const pageNum = parseInt(params.page);
  const totalPages = BYTE_SECTIONS.length;

  if (isNaN(pageNum) || pageNum < 1 || pageNum > totalPages) notFound();

  const deployed = await getDeployedByteNumbers();

  const section = BYTE_SECTIONS[pageNum - 1];
  const start = section.range[0] - 1; // adjust for 0-based index
  const end = section.range[1];       // slice is exclusive on end

  const byteSlice = BYTE_TITLES.slice(start, end);
  const sectionLabel = section.label || '';

  return (
    <ByteIndexClient
      pageNum={pageNum}
      totalPages={totalPages}
      sectionLabel={sectionLabel}  // ✅ You’ve got this now!
      byteTitles={BYTE_TITLES}
      byteSections={[section]}
      deployed={deployed}
      start={start}
    />
  );
}
