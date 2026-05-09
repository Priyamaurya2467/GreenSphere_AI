import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
 CartesianGrid,
} from "recharts";

export default function AQIGraph({
  graphData = [],
  onDaily,
  onWeekly,
  activeType
}) {

  // Empty state
  if (!graphData.length) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-[2rem] border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-xl">

        <div className="text-center">

          <h2 className="text-2xl font-bold text-emerald-900">
            AQI Trends
          </h2>

          <p className="mt-4 text-gray-500">
            Graph data unavailable
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[420px] rounded-[2rem] border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-xl">

      {/* HEADER */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

        <div>

          <h2 className="text-3xl font-bold text-emerald-900">
            AQI Trends
          </h2>

          <p className="mt-2 text-gray-500">
            Real-time pollution analytics
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3">

          <button
            onClick={onDaily}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeType === "daily"
                ? "bg-emerald-800 text-white shadow-lg scale-105"
                : "border border-gray-200 bg-white text-emerald-800 hover:bg-gray-50"
            }`}
          >
            Daily
          </button>

          <button
            onClick={onWeekly}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition-all duration-300 ${
              activeType === "weekly"
                ? "bg-emerald-800 text-white shadow-lg scale-105"
                : "border border-gray-200 bg-white text-emerald-800 hover:bg-gray-50"
            }`}
          >
            Weekly
          </button>
        </div>
      </div>

      {/* GRAPH */}
      <ResponsiveContainer width="100%" height="78%">

        <LineChart data={graphData}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="time" />

          <YAxis />

          <Tooltip />

          <Line
  type="monotone"
  dataKey="aqi"
  stroke="#059669"
  strokeWidth={3}
  dot={{ r: 3 }}
  activeDot={{ r: 6 }}
/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}