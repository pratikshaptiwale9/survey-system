import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const markers = [
  { name: "USA", position: { lat: 40, lng: -100 }, status: "Satisfied" },
  { name: "Brazil", position: { lat: -15, lng: -50 }, status: "Neutral" },
  { name: "India", position: { lat: 22, lng: 78 }, status: "Very Satisfied" },
  { name: "Australia", position: { lat: -25, lng: 133 }, status: "Dissatisfied" },
  { name: "Russia", position: { lat: 60, lng: 100 }, status: "Very Dissatisfied" },
];

const statusColors = {
  "Very Satisfied": "blue",
  Satisfied: "green",
  Neutral: "orange",
  Dissatisfied: "red",
  "Very Dissatisfied": "brown",
};

const mapContainerStyle = {
  width: "100%",
  height: "450px",
  borderRadius: "20px",
};

const mapCenter = { lat: 20, lng: 0 };

export default function Analysis() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Survey Data Analysis
          </h1>
          <p className="text-gray-600">
            Visualize survey responses across different regions.
          </p>
        </div>

        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Interactive Map</h2>

          <LoadScript googleMapsApiKey="AIzaSyD-coe9sgzoj0My8YGgZTfTwZY_wTiH5zY">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={2}
            >
              {markers.map(({ name, position, status }) => (
                <Marker
                  key={name}
                  position={position}
                  icon={{
                    url: `http://maps.google.com/mapfiles/ms/icons/${statusColors[status]}-dot.png`,
                  }}
                />
              ))}
            </GoogleMap>
          </LoadScript>

          {/* Legend */}
          <div className="mt-4 bg-white rounded-lg shadow p-3 w-48">
            <h3 className="text-sm font-semibold mb-2">Legend</h3>
            <ul className="space-y-1 text-sm">
              {Object.keys(statusColors).map((key) => (
                <li key={key} className="flex items-center space-x-2">
                  <span
                    className="inline-block w-3 h-3 rounded-full"
                    style={{ backgroundColor: statusColors[key] }}
                  ></span>
                  <span>{key}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-xl"
          >
            Back to Dashboard
          </button>
        </div>

      </div>
    </div>
  );
}
