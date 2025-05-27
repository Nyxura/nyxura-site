import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white">
      {/* Logo */}
      <div className="mb-10">
        <Image
          src="/nyxura-logo-dark.png" // Adjust path to your actual logo file
          alt="Nyxura Logo"
          width={140}
          height={140}
          priority
        />
      </div>

      {/* Hero */}
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
