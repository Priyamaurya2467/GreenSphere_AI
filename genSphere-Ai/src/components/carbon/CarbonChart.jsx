import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// -------------------- STATIC DATA --------------------

const baselineData = [
  { year: "Jan", emission: 82000 },
  { year: "Feb", emission: 78500 },
  { year: "Mar", emission: 85200 },
  { year: "Apr", emission: 88000 },
  { year: "May", emission: 92500 },
  { year: "Jun", emission: 95000 },
  { year: "Jul", emission: 97800 },
  { year: "Aug", emission: 99200 },
  { year: "Sep", emission: 94300 },
  { year: "Oct", emission: 90000 },
  { year: "Nov", emission: 86500 },
  { year: "Dec", emission: 83200 },
];

const netZeroData = baselineData.map((d, i) => ({
  ...d,
  emission: Math.round(d.emission * (1 - i * 0.04)), // gradual reduction trend
}));

// -------------------- COMPONENT --------------------

export default function CarbonChartCard({
  activeMode,
  onModeChange,
}) {
  const data =
    activeMode === "netzero"
      ? netZeroData
      : baselineData;

  return (
    <section className="rounded-[2rem] border border-white/40 bg-white/70 p-8 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-emerald-900">
            Emission Forecast
          </h2>
          <p className="mt-2 text-gray-500">
            Projected CO₂ emissions (2024–2030 simulation)
          </p>
        </div>

        {/* Toggle */}
        <div className="flex rounded-full bg-emerald-50 p-1">
          <button
            onClick={() => onModeChange("baseline")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeMode === "baseline"
                ? "bg-emerald-800 text-white shadow-lg"
                : "text-emerald-900 hover:bg-white"
            }`}
          >
            Baseline
          </button>

          <button
            onClick={() => onModeChange("netzero")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              activeMode === "netzero"
                ? "bg-emerald-800 text-white shadow-lg"
                : "text-emerald-900 hover:bg-white"
            }`}
          >
            Net Zero
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="carbonGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="year" />
            <YAxis />

            <Tooltip
              formatter={(value) =>
                `${value.toLocaleString()} tons CO₂`
              }
            />

            <Area
              type="monotone"
              dataKey="emission"
              stroke="#047857"
              strokeWidth={3}
              fill="url(#carbonGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}