// src/api/environmentApi.js

const API_KEY = "47d2c24520b5297fbb118268820b3c38";

// ==============================
// Get User Current Location
// ==============================

export function getUserLocation() {

  return new Promise((resolve, reject) => {

    if (!navigator.geolocation) {
      reject("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });

      },

      (error) => {
        reject(error.message);
      }

    );
  });
}

// ==============================
// AQI HELPER
// ==============================

function getAQILevel(aqi) {

  switch (aqi) {

    case 1:
      return "Good";

    case 2:
      return "Fair";

    case 3:
      return "Moderate";

    case 4:
      return "Poor";

    case 5:
      return "Very Poor";

    default:
      return "Unknown";
  }
}

// ==============================
// FETCH ENVIRONMENT DATA
// ==============================

export async function fetchEnvironmentalData(coords = null) {

  try {

    let lat;
    let lon;

    // ==========================
    // USE PASSED COORDS
    // ==========================

    if (coords?.lat && coords?.lon) {

      lat = coords.lat;
      lon = coords.lon;

    }

    // ==========================
    // OTHERWISE USE LIVE LOCATION
    // ==========================

    else {

      const location = await getUserLocation();

      lat = location.lat;
      lon = location.lon;
    }

    // ==========================
    // WEATHER API
    // ==========================

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    const weatherData = await weatherResponse.json();

    // ==========================
    // AQI API
    // ==========================

    const aqiResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );

    const aqiData = await aqiResponse.json();

    // ==========================
    // FORECAST API
    // ==========================

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );

    const forecastData = await forecastResponse.json();

    // ==========================
    // FINAL DATA
    // ==========================

    return {

      city: weatherData.name,

      country: weatherData.sys.country,

      coordinates: {
        lat,
        lon,
      },

      weather: {

        temperature: Math.round(weatherData.main.temp),

        feelsLike: Math.round(
          weatherData.main.feels_like
        ),

        humidity: weatherData.main.humidity,

        pressure: weatherData.main.pressure,

        windSpeed: weatherData.wind.speed,

        visibility: weatherData.visibility,

        weatherType: weatherData.weather[0].main,

        description:
          weatherData.weather[0].description,

        icon: weatherData.weather[0].icon,
      },

      airQuality: {

        value: aqiData.list[0].main.aqi,

        level: getAQILevel(
          aqiData.list[0].main.aqi
        ),

        pm25: aqiData.list[0].components.pm2_5,

        pm10: aqiData.list[0].components.pm10,

        o3: aqiData.list[0].components.o3,

        no2: aqiData.list[0].components.no2,

        so2: aqiData.list[0].components.so2,

        co: aqiData.list[0].components.co,
      },

      forecast: forecastData.list,
    };

  } catch (error) {

    console.error(
      "Environmental API Error:",
      error
    );

    return null;
  }
}