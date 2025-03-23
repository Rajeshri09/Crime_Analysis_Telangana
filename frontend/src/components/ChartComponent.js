import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const ChartComponent = ({ selectedDistrict, selectedCrimeType, chartType }) => {
  const [chartData, setChartData] = useState(null);
  // Use environment variable for the API URL
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!selectedDistrict || !selectedCrimeType) return; // Prevent empty fetch

    axios.get(`${API_URL}/crime-data?district=${selectedDistrict}&crime_type=${selectedCrimeType}`)
      .then(response => {
        setChartData({
          labels: Object.keys(response.data), // Years
          datasets: [{
            label: `${selectedCrimeType} Cases in ${selectedDistrict}`,
            data: Object.values(response.data), // Crime count per year
            borderColor: "rgba(75,192,192,1)",
            backgroundColor: ["#f87171", "#34d399", "#60a5fa", "#fbbf24"],
            borderWidth: 2
          }]
        });
      })
      .catch(error => console.error("Error fetching crime data:", error));
  }, [API_URL, selectedDistrict, selectedCrimeType]);

  return (
    <div>
      <h2>Crime Trend Chart</h2>
      {chartData && (
        chartType === "bar" ? <Bar data={chartData} />
        : chartType === "pie" ? <Pie data={chartData} />
        : <Line data={chartData} />
      )}
    </div>
  );
};

export default ChartComponent;
