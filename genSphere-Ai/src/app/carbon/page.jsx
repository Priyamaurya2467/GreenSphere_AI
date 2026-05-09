import { useState } from "react";


import CarbonChartCard from "../../components/carbon/CarbonChart";

export default function CarbonDashboard() {
  const baselineData = [
    {
      year: "2024",
      emission: 2400,
    },
    {
      year: "2025",
      emission: 2600,
    },
    {
      year: "2026",
      emission: 2900,
    },
    {
      year: "2027",
      emission: 3200,
    },
    {
      year: "2028",
      emission: 3500,
    },
    {
      year: "2029",
      emission: 3900,
    },
    {
      year: "2030",
      emission: 4300,
    },
  ];

  const netZeroData = [
    {
      year: "2024",
      emission: 2400,
    },
    {
      year: "2025",
      emission: 2100,
    },
    {
      year: "2026",
      emission: 1800,
    },
    {
      year: "2027",
      emission: 1400,
    },
    {
      year: "2028",
      emission: 1000,
    },
    {
      year: "2029",
      emission: 700,
    },
    {
      year: "2030",
      emission: 300,
    },
  ];

  const [mode, setMode] =
    useState("baseline");

  const [chartData, setChartData] =
    useState(baselineData);

  const handleModeChange = (type) => {
    setMode(type);

    if (type === "baseline") {
      setChartData(baselineData);
    } else {
      setChartData(netZeroData);
    }
  };

  const handleRunModel = (formData) => {
    console.log(
      "AI MODEL INPUT:",
      formData
    );

    alert(
      "AI Carbon Prediction Model Executed"
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-emerald-50 px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* HEADER */}
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-5xl font-bold text-emerald-900">
              Carbon Emission Predictor
            </h1>

            <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
              AI-powered carbon emission
              analytics and sustainability
              forecasting for industrial
              infrastructure.
            </p>
          </div>

          <div className="flex gap-4">
            <button className="rounded-2xl border border-gray-200 bg-white px-6 py-4 font-medium text-emerald-900 shadow-sm hover:bg-gray-50">
              Export PDF
            </button>

            <button className="rounded-2xl bg-emerald-800 px-6 py-4 font-medium text-white shadow-lg hover:bg-emerald-700">
              Run AI Model
            </button>
          </div>
        </header>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-12">
          <div className="xl:col-span-4">
            <CarbonFormCard
              onRunModel={handleRunModel}
            />
          </div>

          <div className="xl:col-span-8">
            <CarbonChartCard
              data={chartData}
              activeMode={mode}
              onModeChange={
                handleModeChange
              }
            />
          </div>
        </div>
      </div>
    </main>
  );
}