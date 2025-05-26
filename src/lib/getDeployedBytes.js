import fs from 'fs';
import path from 'path';

export function getDeployedByteNumbers() {
  const contentDir = path.join(process.cwd(), 'content/bytes');

  const files = fs.readdirSync(contentDir);

  const deployed = files
    .map((file) => file.match(/byte-(\d{3})\.html/))
    .filter(Boolean)
    .map((match) => parseInt(match[1]));

  return deployed;
}