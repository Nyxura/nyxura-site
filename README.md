This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

#####################################################################################################################################################

## 🧾 Nyxura.ai — Full Technical Documentation with Code & Commentary

This documentation serves as the definitive technical backup for the Nyxura.ai site. Every critical file is preserved with inline annotations and architectural context, making it easy to restore or explain the codebase even if memory is lost.

---

### 🏗️ Project Purpose
Nyxura.ai delivers structured, bite-sized AI content to management consultants through a searchable and gamified web interface. The site is powered by **Next.js App Router**, **TailwindCSS**, and an automated publishing pipeline via **Zapier + GitHub + Vercel**.

---

### 📁 Project Structure
```
nyxura-site/
├── content/                   # Static HTML Bytes
│   └── bytes/byte-XXX.html    # Pre-rendered Byte content files
├── public/                    # Static assets (logo, favicon)
├── src/
│   ├── app/
│   │   ├── page.js            # Landing page (root)
│   │   ├── layout.js          # Global layout wrapper
│   │   ├── globals.css        # Global styles
│   │   └── bytes/
│   │       ├── page.js        # Byte index (/bytes)
│   │       ├── ByteIndexClient.js
│   │       └── [slug]/
│   │           └── page.js    # Dynamic Byte page (/bytes/byte-XXX)
│   ├── components/
│   │   ├── HtmlRenderer.js
│   │   └── SafeHtmlRenderer.js
│   └── lib/
│       ├── getDeployedBytes.js
│       └── byteTitles.js
├── next.config.js
├── package.json
└── README.md
```

---

### 🌐 Route Overview
| URL                  | File                              | Description                              |
|----------------------|-----------------------------------|------------------------------------------|
| `/`                  | `src/app/page.js`                | Landing page                             |
| `/bytes`             | `src/app/bytes/page.js`          | Byte index                               |
| `/bytes/byte-XXX`    | `src/app/bytes/[slug]/page.js`   | Individual Byte page                     |

---

### 🖥️ Code with Inline Notes

#### 1. `src/app/page.js` — Landing Page
```js
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white">
      {/* Logo block */}
      <div className="mb-10">
        <Image
          src="/nyxura-logo-dark.png"
          alt="Nyxura Logo"
          width={300}
          height={300}
          priority
        />
      </div>

      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          AI Fluency for the Consulting World
        </h1>
        <p className="text-lg md:text-xl text-gray-400 mb-8">
          Nyxura.ai delivers focused, real-world insights for consultants navigating the AI era.
        </p>
        <Link
          href="/bytes"
          className="inline-block px-6 py-3 text-black bg-white font-semibold rounded-xl hover:bg-gray-200 transition"
        >
          Browse the Bytes
        </Link>
      </section>

      {/* Footer */}
      <footer className="mt-24 text-center text-gray-500 text-sm">
        Nyxura.ai © {new Date().getFullYear()} — Future-proof your edge.
      </footer>
    </main>
  );
}
```

---

#### 2. `src/app/bytes/page.js` — Byte Index (Server Component)
```js
import { getDeployedByteNumbers } from '@/lib/getDeployedBytes';
import { BYTE_TITLES, BYTE_SECTIONS } from '@/lib/byteTitles';
import ByteIndexClient from './ByteIndexClient';

export default async function ByteIndexPage() {
  // Reads from /content/bytes and extracts numeric Byte identifiers
  const deployed = getDeployedByteNumbers();

  return (
    <ByteIndexClient
      deployed={deployed} // e.g., [1, 2, 3, 5, 11]
      byteTitles={BYTE_TITLES}
      byteSections={BYTE_SECTIONS}
    />
  );
}
```

---

#### 3. `src/app/bytes/[slug]/page.js` — Individual Byte Renderer
```js
import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

// Extract <title> tag from the static HTML file for SEO
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
  if (!fs.existsSync(filePath)) notFound();

  const fullHTML = fs.readFileSync(filePath, 'utf-8');
  const bodyMatch = fullHTML.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : fullHTML;

  return (
    <main className="min-h-screen bg-white text-black p-10 prose prose-lg mx-auto">
      <div dangerouslySetInnerHTML={{ __html: bodyContent }} />
    </main>
  );
}
```

---

#### 4. `lib/getDeployedBytes.js`
```js
import fs from 'fs';
import path from 'path';

// Reads file names and extracts the 3-digit byte number (e.g., 011)
export function getDeployedByteNumbers() {
  const contentDir = path.join(process.cwd(), 'content/bytes');
  const files = fs.readdirSync(contentDir);
  return files
    .map((file) => file.match(/byte-(\d{3})\.html/))
    .filter(Boolean)
    .map((match) => parseInt(match[1]));
}
```

---

#### 5. `lib/byteTitles.js`
```js
// Groups of Bytes as defined by the roadmap
export const BYTE_SECTIONS = [
  { label: "🧭 Strategic AI Awareness for Consultants", range: [1, 20] },
  { label: "🔧 Tactical AI for Daily Consulting Work", range: [21, 40] },
  { label: "🏗️ Leading AI Projects and Initiatives", range: [41, 60] },
  { label: "🧠 Advanced & Emerging Frontiers", range: [61, 80] },
];

export const BYTE_TITLES = [
  "The Real Meaning of AI for Today’s Consultant",
  "Beyond Hype: What Consultants Should Actually Know About AI",
  "Machine Learning vs. Management Thinking",
  // ... up to Byte 80
];
```

---

#### 6. `content/bytes/byte-011.html` — Byte HTML File Format
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Byte #11 – Computer Vision in Industry</title>
  </head>
  <body style="background:#f7f7f7;">
    <table width="100%" style="background:#f7f7f7;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="20" style="background:#fff; border-radius:12px;">
            <tr>
              <td>
                <!-- Main Byte content (formatted HTML with sections) -->
                <h1>Byte #11: Computer Vision in Industry</h1>
                <p>Introductory overview...</p>
                <h3>Real-world Consulting Examples:</h3>
                <ul>
                  <li>Retail shelf monitoring</li>
                  <li>Logistics tracking</li>
                  <li>Agriculture drone imaging</li>
                </ul>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

---

## 🔁 Automation Flow
```text
Notion ➝ Zapier ➝ OpenAI ➝ HTML ➝ GitHub Commit ➝ Vercel ➝ Live Route
```
- HTML Byte files are saved to `/content/bytes/`
- Pushed to GitHub
- GitHub triggers Vercel auto-deploy
- URL becomes live at `/bytes/byte-XXX`

---

📦 This backup file now contains all source logic, structure, and code commentary. Ready to be copied back to any future session to restore your Assistant’s context completely.
Let me know if you'd like a downloadable version.
