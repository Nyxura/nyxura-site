import { getDeployedByteNumbers } from '@/lib/getDeployedBytes';
import { BYTE_TITLES, BYTE_SECTIONS } from '@/lib/byteTitles';
import ByteIndexClient from './ByteIndexClient';

export default function ByteIndexPage() {
  const deployed = getDeployedByteNumbers();

  return (
    <ByteIndexClient
      deployed={deployed}
      byteTitles={BYTE_TITLES}
      byteSections={BYTE_SECTIONS}
    />
  );
}