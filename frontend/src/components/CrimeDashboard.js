import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartComponent from "./ChartComponent";

const CrimeDashboard = () => {
    const [districts, setDistricts] = useState([]);
    const [crimeTypes, setCrimeTypes] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedCrimeType, setSelectedCrimeType] = useState("");
    const [chartType, setChartType] = useState("bar"); // Default chart type

    // Fetch districts
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/districts")
            .then(response => setDistricts(response.data.districts))
            .catch(error => console.error("Error fetching districts:", error));
    }, []);

    // Fetch crime types
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/crime-types")
            .then(response => setCrimeTypes(response.data.crime_types))
            .catch(error => console.error("Error fetching crime types:", error));
    }, []);

    return (
        <div className="dashboard-container">
            <h2>Crime Data Dashboard</h2>

            {/* District Dropdown */}
            <label>Select District:</label>
            <select value={selectedDistrict} onChange={e => setSelectedDistrict(e.target.value)}>
                <option value="">-- Select a District --</option>
                {districts.map((district, index) => (
                    <option key={index} value={district}>{district}</option>
                ))}
            </select>

            {/* Crime Type Dropdown */}
            <label>Select Crime Type:</label>
            <select value={selectedCrimeType} onChange={e => setSelectedCrimeType(e.target.value)}>
                <option value="">-- Select a Crime Type --</option>
                {crimeTypes.map((crime, index) => (
                    <option key={index} value={crime}>{crime}</option>
                ))}
            </select>

            {/* Chart Type Dropdown */}
            <label>Select Chart Type:</label>
            <select value={chartType} onChange={e => setChartType(e.target.value)}>
                <option value="bar">Bar Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="line">Line Chart</option>
            </select>

            {/* Pass Data to ChartComponent */}
            <ChartComponent selectedDistrict={selectedDistrict} selectedCrimeType={selectedCrimeType} chartType={chartType} />
        </div>
    );
};

export default CrimeDashboard;
