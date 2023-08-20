import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "tailwindcss/tailwind.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chart.js/auto'
import L from 'leaflet';
import { useQuery } from "react-query";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  active: number;
  recovered: number;
  deaths: number;
}

const Dashboard: React.FC = () => {
  const [position, setPosition] = useState<{ lat: number; long: number } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (geoPosition) => {
          const { latitude, longitude } = geoPosition.coords;
          setPosition({ lat: latitude, long: longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const { data: casesData } = useQuery("casesData", async () => {
    const historicalResponse = await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all");
    const { cases } = await historicalResponse.json();
    return Object.values(cases);
  });

  const { data: countryData } = useQuery<CountryData[]>("countryData", async () => {
    const countryResponse = await fetch("https://disease.sh/v3/covid-19/countries");
    return await countryResponse.json();
  });

  if (!position || !casesData || !countryData) {
    return <div className="text-center">Loading...</div>;
  }

  const renderLineGraph = () => {
    const data = {
      labels: casesData.map((_, index) => index.toString()),
      datasets: [
        {
          label: "Total Cases",
          data: casesData,
          fill: false,
          borderColor: "rgb(255,99,132)",
          backgroudColor: "rgba(255, 99, 132, 0.5)"
        },
      ],
    };

    return (
      <div className="w-full md:w-1/2 p-4">
        <Line
          data={data}
          height="200px"
          width="200px"
          options={{
            responsive: true,
            interaction: {
              mode: 'index' as const,
              intersect: false,
            },
            plugins: {
              title: {
                display: true,
                text: 'Covid-19 World-Wide data',
              },
            },
            scales: {
              y: {
                type: 'linear' as const,
                display: true,
                position: 'left' as const,
              },
              y1: {
                type: 'linear' as const,
                display: true,
                position: 'right' as const,
                grid: {
                  drawOnChartArea: false,
                },
              },
            },
          }}
        />
      </div>
    );
  };

  const renderLeafletMap = () => {
    return (
      <div className="w-full md:w-1/2 p-4">
        <MapContainer center={[position.lat, position.long]} zoom={4} style={{ height: window.innerWidth <= 640 ? "40vh" : "75vh", width: "100%", zIndex: 0 }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countryData.map((country) => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
              icon={L.icon({
                iconUrl: require('./assets/marker-icon.png'),
                iconSize: [20, 30],
              })}
            >
              <Popup>
                <h3>{country.country}</h3>
                <p>
                  Active Cases: {country.active}<br />
                  Recovered Cases: {country.recovered}<br />
                  Deaths: {country.deaths}
                </p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    );
  };

  return (
    <div className="p-3">
      <h1 className="text-2xl font-bold mb-4">COVID-19 Dashboard</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        {renderLineGraph()}
        {renderLeafletMap()}
      </div>
    </div>
  );
};

export default Dashboard;
