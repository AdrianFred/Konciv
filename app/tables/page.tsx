"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ChartLine from "@/components/Charts/ChartLine";
import { useEffect, useState } from "react";
import { stateNames } from "@/lib/stateNames";

const TablesPage = () => {
  const [chartData, setChartData] = useState([]);
  const [selectedState, setSelectedState] = useState("TT"); // Default selection
  const [stateOptions, setStateOptions] = useState([]);
  const [allData, setAllData] = useState({}); // Store all fetched data

  useEffect(() => {
    fetch("https://data.covid19india.org/v4/min/timeseries.min.json")
      .then((res) => res.json())
      .then((data) => {
        setAllData(data); // Store all data for future processing
        setStateOptions(Object.keys(data)); // Set state options for dropdown
        processData(data, "TT"); // Default data loading
      });
  }, []);

  const processData = (data, stateCode) => {
    const stateData = data[stateCode].dates;
    const formattedData = Object.entries(stateData).map(([date, value]) => {
      return {
        x: date,
        y: value.total.confirmed || 0, // Replace 'tested' with the metric you're interested in
      };
    });
    console.log(formattedData);
    setChartData(formattedData);
  };

  const getStateNameByCode = (stateCode: string) => {
    return stateNames[stateCode];
  };

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    processData(allData, newState); // Process the already fetched data
  };

  return (
    <>
      <Breadcrumb pageName="Tables" />
      <div className="mb-4">
        <select value={selectedState} onChange={handleStateChange} className="rounded border border-gray-300 p-2">
          {stateOptions.map((stateCode) => (
            <option key={stateCode} value={stateCode}>
              {getStateNameByCode(stateCode)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-10">
        <ChartLine title={`COVID-19 Testing Data - ${selectedState}`} dates={chartData} />
      </div>
    </>
  );
};

export default TablesPage;
