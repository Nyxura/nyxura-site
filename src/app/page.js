import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white">
      {/* Hero Section */}
      <section className="text-center max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Where Management Consulting Meets the AI Revolution
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-6">
          Nyxura.ai is an independent platform delivering practical, no-fluff insights for consultants and leaders navigating the age of artificial intelligence.
        </p>
        <Link
          href="/bytes"
          className="inline-block px-6 py-3 text-black bg-white font-semibold rounded-xl hover:bg-gray-200 transition"
        >
          🔍 Explore the Bytes
        </Link>
      </section>

      {/* About Section */}
      <section className="mt-24 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold mb-4">What is Nyxura?</h2>
        <p className="text-gray-400 text-md leading-relaxed">
          Nyxura isn’t a firm. It’s a frontier.
          <br /><br />
          Born at the intersection of strategy and technology, Nyxura.ai exists to equip management consultants, analysts, and mid-market leaders with the clarity they need to stay competitive in a fast-moving AI landscape.
          <br /><br />
          Through bite-sized lessons, real-world examples, and industry-relevant breakdowns, Nyxura helps you cut through the noise—without promoting specific tools, platforms, or gimmicks.
          <br /><br />
          This platform is <strong>educational, not commercial.</strong> It’s not a service provider or a consulting firm. Instead, it’s a place to learn, reflect, and get sharper.
        </p>
      </section>

      {/* Flagship Series Section */}
      <section className="mt-24 max-w-2xl text-center">
        <h2 className="text-3xl font-semibold mb-4">🚀 Byte-Sized AI for MC Pros</h2>
        <p className="text-gray-400 text-md leading-relaxed">
          A daily, gamified learning journey through the AI landscape—crafted specifically for management consultants.
          <br /><br />
          <strong>80 Bytes. No Fluff. Real-World Relevance.</strong>
          <br /><br />
          Start unlocking what matters in AI.
        </p>