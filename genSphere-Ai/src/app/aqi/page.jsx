import { useEffect, useState } from "react";

import AQICard from "../../components/aqi/AQICard";
import AQIGraph from "../../components/aqi/AQIGraph";
import AQIMap from "../../components/aqi/AQIMap";

import CurrentTemperatureCard from "../../components/aqi/CurrentTemparatureCard";
import CarbonChartCard from "../../components/carbon/CarbonChart";

const API_KEY = "47d2c24520b5297fbb118268820b3c38";

export default function AQIPage() {

  const [loading, setLoading] = useState(true);

  const [data, setData] = useState(null);

  const [error, setError] = useState("");

  const [graphType, setGraphType] = useState("daily");

  const [locationInput, setLocationInput] = useState("");

  // ✅ CURRENT ACTIVE COORDINATES
  const [currentCoords, setCurrentCoords] = useState({
    lat: 28.6139,
    lon: 77.2090,
  });

  // =========================
  // SEARCH LOCATION
  // =========================

  async function getCoordinates(place) {

    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${place}&limit=1&appid=${API_KEY}`
    );

    const data = await res.json();

    if (!data.length) {
      throw new Error("Location not found");
    }

    return {
      lat: data[0].lat,
      lon: data[0].lon,
      name: data[0].name,
      country: data[0].country,
    };
  }

  async function handleSearchLocation() {

    try {

      setLoading(true);

      const geo = await getCoordinates(locationInput);

      const coords = {
        lat: geo.lat,
        lon: geo.lon,
      };

      // ✅ SAVE CURRENT SEARCHED LOCATION
      setCurrentCoords(coords);

      // ✅ LOAD NEW LOCATION DATA
      await loadData(coords);

    } catch (err) {

      setError(err.message);

      setLoading(false);
    }
  }

  // =========================
  // CHART DATA
  // =========================

  const baselineData = [
    { year: "2024", emission: 2400 },
    { year: "2025", emission: 2600 },
    { year: "2026", emission: 2900 },
    { year: "2027", emission: 3200 },
    { year: "2028", emission: 3500 },
    { year: "2029", emission: 3900 },
    { year: "2030", emission: 4300 },
  ];

  const netZeroData = [
    { year: "2024", emission: 2400 },
    { year: "2025", emission: 2100 },
    { year: "2026", emission: 1800 },
    { year: "2027", emission: 1400 },
    { year: "2028", emission: 1000 },
    { year: "2029", emission: 700 },
    { year: "2030", emission: 300 },
  ];

  const [chartData, setChartData] = useState(baselineData);

  const [mode, setMode] = useState("baseline");

  const handleModeChange = (type) => {

    setMode(type);

    if (type === "baseline") {
      setChartData(baselineData);
    } else {
      setChartData(netZeroData);
    }
  };

  // =========================
  // INITIAL LOAD
  // =========================

  useEffect(() => {

    loadData(currentCoords);

  }, []);

  // =========================
  // LOAD DATA
  // =========================

  async function loadData(coords) {

    try {

      setLoading(true);

      setError("");

      const lat = coords?.lat;
      const lon = coords?.lon;

      // ================= WEATHER =================

      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      const weatherData = await weatherRes.json();

      // ================= AQI =================

      const aqiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );

      const aqiData = await aqiRes.json();

      const aqi = aqiData?.list?.[0]?.main?.aqi || 0;

      const components =
        aqiData?.list?.[0]?.components || {};

      // ================= SAVE =================

      setData({

        city: weatherData.name || "Unknown City",

        coordinates: {
          lat,
          lon,
        },

        weather: {
          temperature: weatherData.main?.temp || 0,
          feelsLike: weatherData.main?.feels_like || 0,
          humidity: weatherData.main?.humidity || 0,
          windSpeed: weatherData.wind?.speed || 0,
          weatherType:
            weatherData.weather?.[0]?.main || "Clear",
        },

        airQuality: {
          value: aqi,
          pm25: components.pm2_5 || 0,
          pm10: components.pm10 || 0,
          o3: components.o3 || 0,
          no2: components.no2 || 0,
        },

        forecast: [],
      });

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);
    }
  }

  // =========================
  // GRAPH DATA
  // =========================

  const baseAQI = data?.airQuality?.value || 50;

  const graphData = Array.from({ length: 12 }).map((_, i) => ({
    time: `${i}:00`,
    aqi: Math.max(
      0,
      baseAQI + Math.sin(i * 0.7) * 20 + Math.random() * 8
    ),
  }));

  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (
      <div className="flex min-h-screen items-center justify-center py-2 bg-gradient-to-b from-white to-emerald-50">

        <div className="text-center pt-32">

          <div className="mx-auto mb-6 h-16 w-16 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-700"></div>

          <h1 className="text-3xl font-bold text-emerald-900">
            Loading Environmental Data...
          </h1>

          <p className="mt-3 text-gray-500">
            Fetching live AQI, weather & forecast
          </p>

        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {

    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-red-50">

        <div className="rounded-3xl bg-white p-10 shadow-2xl">

          <h1 className="text-3xl font-bold text-red-500">
            Failed to Load Data
          </h1>

          <p className="mt-4 text-gray-500">
            {error}
          </p>

          <button
            onClick={() => loadData(currentCoords)}
            className="mt-6 rounded-2xl bg-emerald-800 px-6 py-3 text-white hover:bg-emerald-700"
          >
            Retry
          </button>

        </div>
      </div>
    );
  }

  if (!data) return null;

  // =========================
  // MAIN UI
  // =========================

  return (

    <main className="min-h-screen bg-gradient-to-b from-white via-emerald-50 to-white px-4 py-10 md:px-8">

      <div className="mx-auto max-w-7xl space-y-10">

        {/* HEADER */}

        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

          <div>

            <h1 className="text-4xl font-bold tracking-tight text-emerald-900 md:text-6xl pt-10">
              Intelligence Module
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600">

              Real-time environmental diagnostics for{" "}

              <span className="font-semibold text-emerald-800">
                {data?.city}
              </span>

            </p>

          </div>

          {/* ACTIONS */}

          <div className="flex flex-wrap gap-4">

            <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-lg">

              <span className="h-3 w-3 animate-pulse rounded-full bg-emerald-500"></span>

              <span className="font-medium text-emerald-900">
                Live Sensor Data
              </span>

            </div>

            {/* SEARCH */}

            <div className="flex gap-3 items-center">

              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter city"
                className="rounded-full px-4 py-2 border border-gray-300 focus:outline-none"
              />

              <button
                onClick={handleSearchLocation}
                className="rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                Search
              </button>

            </div>

            {/* REFRESH */}

            <button
              onClick={() => loadData(currentCoords)}
              className="rounded-full bg-emerald-800 px-6 py-3 font-medium text-white transition-all hover:scale-105 hover:bg-emerald-700"
            >
              Refresh
            </button>

          </div>
        </header>

        {/* GRID */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

          {/* AQI CARD */}

          <div className="lg:col-span-4">

            <AQICard
              aqiData={data.airQuality}
              city={data.city}
              loading={loading}
              onRefresh={() => loadData(currentCoords)}
              onShare={() => {
                navigator.share({
                  title: "AQI Report",
                  text: `Current AQI in ${data.city} is ${data.airQuality.value}`,
                });
              }}
            />

          </div>

          {/* CHART */}

          <div className="lg:col-span-8">

            <CarbonChartCard
              data={chartData}
              activeMode={mode}
              onModeChange={handleModeChange}
            />

          </div>
        </div>

        {/* AQI GRAPH */}

        <AQIGraph
          graphData={graphData || []}
          onDaily={() => setGraphType("daily")}
          onWeekly={() => setGraphType("weekly")}
          activeType={graphType}
        />

        {/* BOTTOM */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          <div className="space-y-8">

            <CurrentTemperatureCard
              temperature={data?.weather?.temperature || 0}
              feelsLike={data?.weather?.feelsLike || 0}
              humidity={data?.weather?.humidity || 0}
              windSpeed={data?.weather?.windSpeed || 0}
              weatherType={data?.weather?.weatherType || "Clear"}
            />

          </div>

          {/* MAP */}

          <div className="lg:col-span-2">

            <AQIMap
              key={
                data.coordinates.lat +
                data.coordinates.lon
              }
              location={data.coordinates}
              city={data.city}
              aqi={data.airQuality.value}
            />

          </div>
        </div>
      </div>
    </main>
  );
}