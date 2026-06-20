export default function Banner() {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <p className="uppercase text-sm tracking-widest text-slate-500 mb-4">
            New Collection
          </p>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            Discover Products
            <br />
            You'll Love.
          </h1>

          <p className="text-slate-600 text-lg mb-8">
            Shop modern essentials with a clean and seamless
            shopping experience.
          </p>

          <button className="px-6 py-3 rounded-xl bg-black text-white hover:scale-105 transition">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
}