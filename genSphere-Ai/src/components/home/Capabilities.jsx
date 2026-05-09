const capabilities = [
  {
    icon: "visibility",
    title: "Intelligent Monitoring",
    description:
      "Real-time satellite data analysis provides a comprehensive view of deforestation, wildlife patterns, and ecosystem shifts.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
    glow: false,
  },
  {
    icon: "query_stats",
    title: "Predictive Analytics",
    description:
      "Advanced climate modeling forecasts environmental risks up to 6 months in advance, enabling proactive conservation efforts.",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
    glow: true,
  },
  {
    icon: "public",
    title: "Global Impact",
    description:
      "Uniting governments and NGOs through a shared intelligence platform to drive meaningful carbon reduction at scale.",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-700",
    glow: false,
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-900">
            Our Core Capabilities
          </h2>

          <p className="text-lg text-gray-600 max-w-2xl mt-4 leading-8">
            Harnessing high-precision AI to create actionable insights for a
            healthier planet.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {capabilities.map((item, index) => (
            <div
              key={index}
              className={`
                group
                rounded-3xl
                border
                border-white/50
                bg-white/60
                backdrop-blur-xl
                p-8
                flex
                flex-col
                gap-6
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-2xl
                ${item.glow ? "shadow-emerald-200/50" : ""}
              `}
            >
              {/* Icon */}
              <div
                className={`
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  ${item.iconBg}
                `}
              >
                <span
                  className={`
                    material-symbols-outlined
                    text-[32px]
                    ${item.iconColor}
                  `}
                >
                  {item.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-emerald-900">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-7">
                {item.description}
              </p>

              {/* Learn More */}
              <div className="mt-auto flex items-center gap-2 text-emerald-800 font-semibold cursor-pointer">
                <span>Learn More</span>

                <span className="material-symbols-outlined transition-transform duration-300 group-hover:translate-x-1">
                  arrow_forward
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}