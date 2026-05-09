

const floatingIcons = [
  {
    icon: "energy_savings_leaf",
    position: "top-[10%] left-[5%]",
    color: "text-emerald-700",
    size: "text-[32px]",
    duration: "4s",
  },
  {
    icon: "cloud",
    position: "bottom-[20%] left-[-5%]",
    color: "text-sky-500",
    size: "text-[28px]",
    duration: "5s",
  },
  {
    icon: "recycling",
    position: "top-[0%] right-[10%]",
    color: "text-green-600",
    size: "text-[24px]",
    duration: "3.5s",
  },
  {
    icon: "water_drop",
    position: "bottom-[10%] right-[0%]",
    color: "text-cyan-500",
    size: "text-[30px]",
    duration: "6s",
  },
  {
    icon: "air",
    position: "top-[45%] right-[-8%]",
    color: "text-teal-600",
    size: "text-[26px]",
    duration: "4.5s",
  },
];

export default function HeroSection() {
  return (
    <main className="pt-20 bg-gradient-to-b from-white to-emerald-50 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center">
        {/* Background Blur */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-200 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-teal-200 blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          {/* LEFT CONTENT */}
          <div className="flex flex-col items-start gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 border border-emerald-200 rounded-full">
              <span className="material-symbols-outlined text-emerald-700 text-[20px]">
                eco
              </span>

              <span className="text-sm font-medium text-emerald-900">
                Pioneering Sustainability
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-emerald-900 leading-tight max-w-xl">
              AI for a Greener and Smarter Future
            </h1>

            <p className="text-lg text-gray-600 max-w-lg leading-8">
              GreenSphere AI integrates precision environmental intelligence
              with advanced machine learning to safeguard our planet’s most
              vital ecosystems.
            </p>

            <div className="flex flex-wrap gap-6 mt-4">
              <button className="bg-emerald-800 text-white px-8 py-3 rounded-2xl font-medium shadow-lg hover:bg-emerald-700 hover:-translate-y-1 transition-all duration-300">
                Explore Dashboard
              </button>

              <button className="bg-white/60 backdrop-blur-md border border-emerald-200 text-emerald-800 px-8 py-3 rounded-2xl font-medium hover:bg-white transition-all duration-300 hover:-translate-y-1 " >
                Track Environment
              </button>
            </div>
          </div>

          {/* RIGHT VISUAL */}
          <div className="relative flex justify-center items-center py-12">
            <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-emerald-200/30 to-teal-100 rounded-full flex items-center justify-center shadow-[0px_10px_50px_rgba(16,185,129,0.15)] border border-white/50">
              
              {/* Inner Globe */}
              <div className="w-[80%] h-[80%] rounded-full bg-white overflow-hidden relative group shadow-xl">
                <img
                  className="w-full h-full object-cover opacity-70 scale-110 group-hover:scale-100 transition-transform duration-1000"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBCfJNTdq0cRVXPt1r2WTXkQVAZaMRZ3SSPVQIYsIlUPerhu-IVuh1o8Gg-SygdzZqIQbhmM15xWoGLI_K471rwEaoiN6C4Dq2_Cp5tlsevmVTmhfxo4oLxx859NONA4uBhJYg5MoTJE6U3PRBnyPEYfpWX8RaPkqVVGxNk8zGvTe10y68dKTq1GuslB8jzCJCmUk9o-RgHdfiIgrP0ZU67YDc7VJYwcnBYyvPHCYX461D5Jbl8838-pQygIL0IQiwQl2idjU3q37U"
                  alt="AI Earth"
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-emerald-900/40">
                    3D Interactive Core
                  </span>
                </div>
              </div>

              {/* FLOATING ICONS */}
              {floatingIcons.map((item, index) => (
                <div
                  key={index}
                  className={`absolute ${item.position} p-4 bg-white/40 backdrop-blur-xl border border-white/30 rounded-2xl shadow-lg animate-bounce`}
                  style={{ animationDuration: item.duration }}
                >
                  <span
                    className={`material-symbols-outlined ${item.color} ${item.size}`}
                  >
                    {item.icon}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              ["1.2M", "Trees Planted"],
              ["500k", "Tons Carbon Reduced"],
              ["85%", "AQI Accuracy"],
              ["24/7", "Global Monitoring"],
            ].map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 bg-white/60 rounded-3xl border border-white shadow-md"
              >
                <span className="text-5xl font-bold text-emerald-800">
                  {item[0]}
                </span>

                <span className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-2">
                  {item[1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}