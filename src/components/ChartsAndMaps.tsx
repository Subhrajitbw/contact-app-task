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
  const [lineGraphSize, setLineGraphSize] = useState({
    height: "200px",
    width: "200px"
  });
  const [mapContainerSize, setMapContainerSize] = useState({
    height: "75vh", // Set a default height
    width: "100%",
    zIndex: 0
  });

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

    const handleResize = () => {
      const isSmallScreen = window.innerWidth <= 640;

      setLineGraphSize({
        height: isSmallScreen ? "200px" : "200px",
        width: isSmallScreen ? "200px" : "200px"
      });

      setMapContainerSize({
        height: isSmallScreen ? "40vh" : "75vh",
        width: "100%",
        zIndex: 0
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call on initial render

    return () => {
      window.removeEventListener("resize", handleResize);
    };
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
          height={lineGraphSize.height}
          width={lineGraphSize.width}
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
                ticks: {
                  padding: 10,
                  callback: (value) => {
                    if (window.innerWidth <= 640) {
                      const numValue = typeof value === 'number' ? value : parseFloat(value);
                      if (numValue >= 1_000_000_000) {
                        return (numValue / 1_000_000_000).toFixed(1) + "B";
                      } else if (numValue >= 1_000_000) {
                        return (numValue / 1_000_000).toFixed(1) + "M";
                      } else if (numValue >= 1_000) {
                        return (numValue / 1_000).toFixed(1) + "K";
                      } else {
                        return value.toString();
                      }
                    } else {
                      return value.toString();
                    }
                  },
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
        <MapContainer center={[position?.lat || 0, position?.long || 0]} zoom={4} style={mapContainerSize}>
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
      <h1 className="text-center text-2xl font-bold mb-4">COVID-19 Dashboard</h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        {renderLineGraph()}
        {renderLeafletMap()}
      </div>
    </div>
  );
};

export default Dashboard;
