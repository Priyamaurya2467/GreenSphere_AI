import { useEffect, useState } from "react";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// =========================
// MOVE MAP TO NEW LOCATION
// =========================

function ChangeMapView({ center }) {

  const map = useMap();

  useEffect(() => {

    map.setView(center, 13, {
      animate: true,
    });

  }, [center, map]);

  return null;
}

export default function AQIMap({
  location,
  city,
  aqi,
  onDetectLocation,
}) {

  const [liveLocation, setLiveLocation] = useState(location);

  // =========================
  // UPDATE MAP WHEN LOCATION CHANGES
  // =========================

  useEffect(() => {

    if (location?.lat && location?.lon) {

      setLiveLocation({
        lat: location.lat,
        lon: location.lon,
      });
    }

  }, [location]);

  // =========================
  // DETECT LIVE LOCATION
  // =========================

  const handleDetectLocation = () => {

    if (!navigator.geolocation) {

      alert("Geolocation is not supported");

      return;
    }

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const newLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        setLiveLocation(newLocation);

        // Optional parent callback
        if (onDetectLocation) {
          onDetectLocation(newLocation);
        }
      },

      (error) => {

        console.log(error);

        alert("Unable to fetch location");
      },

      {
        enableHighAccuracy: true,
      }
    );
  };

  // =========================
  // LOADING STATE
  // =========================

  if (!liveLocation?.lat || !liveLocation?.lon) {

    return (
      <div className="flex h-[550px] items-center justify-center rounded-[2rem] bg-white shadow-2xl">

        <p className="text-lg text-gray-500">
          Loading Map...
        </p>

      </div>
    );
  }

  // =========================
  // OPEN GOOGLE MAPS
  // =========================

  const openGoogleMaps = () => {

    window.open(
      `https://www.google.com/maps?q=${liveLocation.lat},${liveLocation.lon}`,
      "_blank"
    );
  };

  return (

    <div className="overflow-hidden rounded-[2rem] border border-white/50 bg-white/70 shadow-2xl backdrop-blur-xl">

      {/* HEADER */}

      <div className="flex flex-col gap-4 border-b border-gray-200 p-6 md:flex-row md:items-center md:justify-between">

        <div>

          <h2 className="text-3xl font-bold text-emerald-900">
            AQI Live Map
          </h2>

          <p className="mt-2 text-gray-500">
            Environmental monitoring for {city}
          </p>

        </div>

        {/* BUTTONS */}

        <div className="flex gap-3">

          <button
            onClick={handleDetectLocation}
            className="rounded-xl bg-emerald-800 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-emerald-700"
          >
            Detect Location
          </button>

          <button
            onClick={openGoogleMaps}
            className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 transition-all hover:bg-gray-50"
          >
            Full Map
          </button>

        </div>
      </div>

      {/* MAP */}

      <div className="h-[550px] w-full">

        <MapContainer
          center={[liveLocation.lat, liveLocation.lon]}
          zoom={11}
          scrollWheelZoom={true}
          className="h-full w-full z-0"
        >

          {/* LIVE MAP MOVEMENT */}

          <ChangeMapView
            center={[
              liveLocation.lat,
              liveLocation.lon,
            ]}
          />

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={[
              liveLocation.lat,
              liveLocation.lon,
            ]}
          >

            <Popup>

              <div className="space-y-2">

                <h3 className="text-lg font-bold">
                  {city}
                </h3>

                <p>
                  AQI: <strong>{aqi}</strong>
                </p>

                <p>
                  Latitude: {liveLocation.lat}
                </p>

                <p>
                  Longitude: {liveLocation.lon}
                </p>

              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}