export default function Banner() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">

      <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute top-32 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-36">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur">
              🔥 New Season Collection 2026
            </span>

            <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              Upgrade Your
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Shopping Experience
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg text-slate-300 leading-8">
              Explore premium fashion, electronics, accessories, and lifestyle
              products with unbeatable prices, secure payments, and lightning-fast delivery.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <button className="rounded-2xl bg-white px-8 py-4 font-semibold text-slate-900 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl">
                Shop Now →
              </button>

              <button className="rounded-2xl border border-white/30 px-8 py-4 font-semibold backdrop-blur transition hover:bg-white/10">
                Explore Collection
              </button>

            </div>

            {/* Stats */}

            <div className="mt-14 grid grid-cols-3 gap-8">

              <div>
                <h3 className="text-3xl font-bold">10K+</h3>
                <p className="mt-2 text-slate-400 text-sm">
                  Happy Customers
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">2K+</h3>
                <p className="mt-2 text-slate-400 text-sm">
                  Premium Products
                </p>
              </div>

              <div>
                <h3 className="text-3xl font-bold">4.9★</h3>
                <p className="mt-2 text-slate-400 text-sm">
                  Customer Rating
                </p>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="relative hidden lg:flex justify-center">

            <div className="relative h-[550px] w-[500px]">

              {/* Main Card */}

              <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl" />

              <div className="absolute top-10 left-10 right-10">

                <div className="rounded-3xl bg-white p-8 text-slate-900 shadow-2xl">

                  <div className="flex justify-between items-center">

                    <span className="text-sm font-semibold text-slate-500">
                      Featured Product
                    </span>

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      30% OFF
                    </span>

                  </div>

                  <div className="mt-8 flex justify-center">

                    <div className="h-56 w-56 rounded-full bg-gradient-to-br from-slate-100 to-slate-300 shadow-inner" />

                  </div>

                  <h2 className="mt-8 text-2xl font-bold">
                    Premium Collection
                  </h2>

                  <p className="mt-3 text-slate-600">
                    Elegant designs crafted for modern lifestyles with premium quality.
                  </p>

                  <div className="mt-8 flex items-center justify-between">

                    <div>
                      <p className="text-sm text-slate-500">Starting From</p>
                      <h3 className="text-3xl font-bold">$49</h3>
                    </div>

                    <button className="rounded-xl bg-black px-6 py-3 text-white transition hover:bg-slate-800">
                      Buy Now
                    </button>

                  </div>

                </div>

              </div>

              {/* Floating Cards */}

              <div className="absolute -left-10 top-24 rounded-2xl bg-white p-5 text-slate-900 shadow-xl">
                <p className="text-sm text-slate-500">Free Shipping</p>
                <h3 className="text-lg font-bold">Worldwide</h3>
              </div>

              <div className="absolute -right-8 bottom-20 rounded-2xl bg-white p-5 text-slate-900 shadow-xl">
                <p className="text-sm text-slate-500">Secure Payment</p>
                <h3 className="text-lg font-bold">100% Safe</h3>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}