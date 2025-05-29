import fs from 'fs';
import path from 'path';

export function getDeployedByteNumbers() {
  const bytesDir = path.join(process.cwd(), 'content', 'bytes');
  const files = fs.readdirSync(bytesDir);
  const byteNumbers = files
    .filter((f) => f.startsWith('byte-') && f.endsWith('.html'))
    .map((f) => parseInt(f.match(/byte-(\d{3})\.html/)[1]))
    .sort((a, b) => a - b);
  return byteNumbers;
}
