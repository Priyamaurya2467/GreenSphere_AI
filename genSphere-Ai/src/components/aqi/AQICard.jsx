import { useState } from "react";

export default function AQICard({
  aqiData,
  city,
  loading,
  onRefresh,
  onShare,
}) {

  const [refreshing, setRefreshing] = useState(false);

  // =========================
  // REFRESH
  // =========================

  const handleRefresh = async () => {

    try {

      setRefreshing(true);

      if (onRefresh) {
        await onRefresh();
      }

    } finally {

      setRefreshing(false);
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="h-[420px] animate-pulse rounded-[2rem] bg-white shadow-xl" />
    );
  }

  // =========================
  // NO DATA
  // =========================

  if (!aqiData) {

    return (
      <div className="flex h-[420px] items-center justify-center rounded-[2rem] bg-white shadow-xl">

        <h2 className="text-xl font-bold text-red-500">
          AQI Data Not Available
        </h2>

      </div>
    );
  }

  // =========================
  // POLLUTANT VALUES
  // =========================

  const pm25 = Number(aqiData?.pm25 || 0);
  const pm10 = Number(aqiData?.pm10 || 0);
  const no2 = Number(aqiData?.no2 || 0);

  // =========================
  // AQI CALCULATION
  // =========================

  const calculateAQI = (pm25) => {

    if (pm25 <= 12.0) {
      return Math.round((50 / 12.0) * pm25);
    }

    if (pm25 <= 35.4) {
      return Math.round(
        ((100 - 51) / (35.4 - 12.1)) *
        (pm25 - 12.1) +
        51
      );
    }

    if (pm25 <= 55.4) {
      return Math.round(
        ((150 - 101) / (55.4 - 35.5)) *
        (pm25 - 35.5) +
        101
      );
    }

    if (pm25 <= 150.4) {
      return Math.round(
        ((200 - 151) / (150.4 - 55.5)) *
        (pm25 - 55.5) +
        151
      );
    }

    if (pm25 <= 250.4) {
      return Math.round(
        ((300 - 201) / (250.4 - 150.5)) *
        (pm25 - 150.5) +
        201
      );
    }

    if (pm25 <= 350.4) {
      return Math.round(
        ((400 - 301) / (350.4 - 250.5)) *
        (pm25 - 250.5) +
        301
      );
    }

    return Math.round(
      ((500 - 401) / (500.4 - 350.5)) *
      (pm25 - 350.5) +
      401
    );
  };

  const aqi = calculateAQI(pm25);

  // =========================
  // STATUS LOGIC
  // =========================

  const getStatus = () => {

    /*
      Main Logic:

      - PM2.5 is most important
      - PM10 second priority
      - NO2 third priority

      Delhi-like polluted cities:
      PM2.5 usually 80+
      -> Poor / Very Poor

      Hill stations:
      PM2.5 usually below 25
      -> Good / Moderate
    */

    // GOOD

    if (
      pm25 <= 15 &&
      pm10 <= 40 &&
      no2 <= 30
    ) {
      return "Good";
    }

    // MODERATE

    if (
      pm25 <= 35 &&
      pm10 <= 80 &&
      no2 <= 60
    ) {
      return "Moderate";
    }

    // UNHEALTHY

    if (
      pm25 <= 55 ||
      pm10 <= 150 ||
      no2 <= 100
    ) {
      return "Unhealthy";
    }

    // POOR

    if (
      pm25 <= 120 ||
      pm10 <= 250 ||
      no2 <= 180
    ) {
      return "Poor";
    }

    // VERY POOR

    if (
      pm25 <= 250 ||
      pm10 <= 400 ||
      no2 <= 300
    ) {
      return "Very Poor";
    }

    return "Hazardous";
  };

  // =========================
  // COLORS
  // =========================

  const getColor = () => {

    const status = getStatus();

    if (status === "Good") {
      return "#22c55e";
    }

    if (status === "Moderate") {
      return "#eab308";
    }

    if (status === "Unhealthy") {
      return "#f97316";
    }

    if (status === "Poor") {
      return "#ef4444";
    }

    if (status === "Very Poor") {
      return "#9333ea";
    }

    return "#7f1d1d";
  };

  // =========================
  // RING
  // =========================

  const radius = 110;

  const circumference = 2 * Math.PI * radius;

  const normalizedAQI = Math.min(aqi, 500);

  const offset =
    circumference -
    (normalizedAQI / 500) * circumference;

  // =========================
  // POLLUTANTS
  // =========================

  const pollutants = [

    {
      label: "PM2.5",
      value: Math.round(pm25),
    },

    {
      label: "PM10",
      value: Math.round(pm10),
    },

    {
      label: "NO2",
      value: Math.round(no2),
    },
  ];

  // =========================
  // SHARE
  // =========================

  const handleShare = () => {

    if (onShare) {
      return onShare();
    }

    navigator.clipboard.writeText(
      `Current AQI in ${city}: ${aqi}`
    );

    alert("AQI copied to clipboard");
  };

  return (

    <div className="rounded-[2rem] border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-xl">

      {/* HEADER */}

      <div className="mb-8 flex justify-between">

        <div>

          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Current Air Quality
          </p>

          <h2 className="mt-2 text-3xl font-bold text-emerald-900">
            {city || "Unknown City"}
          </h2>

        </div>

        <div className="flex gap-3">

          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="rounded-full px-4 py-2 text-sm font-medium text-emerald-800 transition"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>

          <button
            onClick={handleShare}
            className="rounded-full px-4 py-2 text-sm font-medium text-emerald-800 transition"
          >
            Share
          </button>

        </div>
      </div>

      {/* AQI RING */}

      <div className="flex flex-col items-center">

        <div className="relative flex h-64 w-64 items-center justify-center">

          <svg
            viewBox="0 0 256 256"
            className="h-full w-full -rotate-90"
          >

            {/* BACKGROUND */}

            <circle
              cx="128"
              cy="128"
              r={radius}
              strokeWidth="22"
              stroke="#e5e7eb"
              fill="transparent"
            />

            {/* PROGRESS */}

            <circle
              cx="128"
              cy="128"
              r={radius}
              strokeWidth="22"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              stroke={getColor()}
              fill="transparent"
              style={{
                transition:
                  "stroke-dashoffset 0.8s ease",
              }}
            />

          </svg>

          {/* CENTER */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <span
              className="text-7xl font-bold"
              style={{
                color: getColor(),
              }}
            >
              {aqi}
            </span>

            

          </div>
        </div>

        {/* POLLUTANTS */}

        <div className="mt-10 grid w-full grid-cols-3 gap-4">

          {pollutants.map((item) => (

            <div
              key={item.label}
              className="rounded-2xl bg-emerald-50 p-4 text-center"
            >

              <p className="text-xs uppercase text-gray-500">
                {item.label}
              </p>

              <p className="mt-2 text-2xl font-bold text-emerald-900">
                {item.value}
              </p>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}