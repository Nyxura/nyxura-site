export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-10">
      <div className="w-full max-w-3xl text-center">
        <img
          src="/nyxura-logo-dark.png"
          alt="Nyxura.ai Logo"
          className="w-40 sm:w-48 md:w-56 lg:w-64 mx-auto mb-4 drop-shadow-xl"
        />
        <p className="text-sm tracking-widest text-indigo-400 uppercase mb-6">
          Unleash the Unseen
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
          AI Strategy & Digital Transformation for Ambitious Organizations
        </h2>
        <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10">
          Nyxura.ai is a boutique consulting firm helping leaders in Western Canada navigate AI adoption with clarity, confidence, and strategic focus. From roadmaps to use cases, we turn AI from buzzword to business asset.
        </p>
        <a
          href="#"
          className="inline-block bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-200"
        >
          Book a Discovery Call
        </a>
      </div>
    </main>
  );
}
