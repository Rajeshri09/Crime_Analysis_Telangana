import React from "react";
import CrimeDashboard from "./components/CrimeDashboard";
import ChartComponent from "./components/ChartComponent"; // Import ChartComponent
import "./App.css";  // Import CSS for styling

function App() {
    return (
        <div className="app-container">
            <h1 className="app-title">Crime Analysis Dashboard</h1>
            <CrimeDashboard />
            <ChartComponent />  {/* Now added below the dashboard */}
        </div>
    );
}

export default App;
