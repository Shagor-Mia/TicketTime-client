import React, { useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

/* ================= COUNTERS DATA ================= */
const counters = [
  { name: "Jatrabari", type: "bus", lat: 23.72, lon: 90.41 },
  { name: "Saydabad", type: "bus", lat: 23.72, lon: 90.43 },
  { name: "Dolaipar", type: "bus", lat: 23.75, lon: 90.4 },
  { name: "Gabtoli", type: "bus", lat: 23.783726, lon: 90.344246 },
  { name: "Polto", type: "bus", lat: 23.75, lon: 90.41 },
  { name: "Matijhil", type: "bus", lat: 23.73, lon: 90.41 },
  { name: "Komolapur", type: "railway", lat: 23.73, lon: 90.4 },
  { name: "Dhaka Airport", type: "air", lat: 23.85, lon: 90.4 },
  { name: "Tangail", type: "bus", lat: 24.25, lon: 89.92 },
  { name: "Rajshahi", type: "bus/train/air", lat: 24.37, lon: 88.6 },
  { name: "Barisal", type: "bus/train/air", lat: 22.71, lon: 90.37 },
  { name: "Khulna", type: "bus/train/air", lat: 22.81, lon: 89.56 },
  { name: "Chattogram", type: "bus/train/air", lat: 22.34, lon: 91.83 },
  { name: "Cumilla", type: "bus/train", lat: 23.46, lon: 91.19 },
  { name: "Cox’s Bazar", type: "bus/air", lat: 21.44, lon: 92.01 },
  { name: "Sylhet", type: "bus/train/air", lat: 24.9, lon: 91.87 },
  { name: "Rangpur", type: "bus/train", lat: 25.75, lon: 89.25 },
  { name: "Jessore", type: "bus/train", lat: 23.17, lon: 89.21 },
  { name: "Mymensingh", type: "bus/train", lat: 24.76, lon: 90.41 },
];

const Branch = () => {
  const [filter, setFilter] = useState("all");
  const mapRef = useRef(null);

  /* ================= FILTER LOGIC ================= */
  const filteredCounters = useMemo(() => {
    if (filter === "all") return counters;
    return counters.filter((c) => c.type.includes(filter));
  }, [filter]);

  return (
    <div className="my-16 space-y-8">
      <h1 className="text-center text-2xl md:text-4xl font-bold">
        Our Branch Coverage
      </h1>

      {/* ================= FILTER BUTTONS ================= */}
      <div className="flex justify-center gap-3 flex-wrap">
        {["all", "bus", "train", "air"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`px-5 py-2 rounded-full font-semibold transition
              ${
                filter === item
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>

      {/* ================= MAP ================= */}
      <div className="max-w-6xl mx-auto h-[500px]  rounded-xl overflow-hidden">
        <MapContainer
          center={[23.685, 90.3563]} // Bangladesh center
          zoom={7}
          scrollWheelZoom={false}
          className="h-full w-full"
          ref={mapRef}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {filteredCounters.map((c, index) => (
            <Marker key={index} position={[c.lat, c.lon]}>
              <Popup>
                <strong>{c.name}</strong>
                <br />
                Available: {c.type}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Branch;
