export default function CurrentTemperatureCard({
  temperature,
  feelsLike,
  humidity,
  windSpeed,
  weatherType,
}) {
  function getWeatherIcon(type) {
    switch (type?.toLowerCase()) {
      case "clouds":
        return "cloud";

      case "rain":
        return "rainy";

      case "clear":
        return "sunny";

      case "thunderstorm":
        return "thunderstorm";

      default:
        return "partly_cloudy_day";
    }
  }

  return (
    <div className="rounded-[2rem] border border-white/50 bg-white/70 p-8 shadow-2xl backdrop-blur-xl">
      
      <div className="flex items-center justify-between">
        
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Current Temperature
          </p>

          <h2 className="mt-4 text-6xl font-bold text-emerald-900">
            {temperature}°
          </h2>

          <p className="mt-2 text-gray-500">
            Feels like {feelsLike}°
          </p>
        </div>

        <span className="material-symbols-outlined text-[80px] text-amber-500">
          {getWeatherIcon(weatherType)}
        </span>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        
        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm text-gray-500">
            Humidity
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-900">
            {humidity}%
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 p-4">
          <p className="text-sm text-gray-500">
            Wind Speed
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-900">
            {windSpeed} km/h
          </p>
        </div>
      </div>
    </div>
  );
}