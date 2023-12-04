"use client";

import React, { useEffect, useState } from "react";
import ChartLine from "./Charts/ChartLine";
import { stateNames } from "@/lib/stateNames";

// Type definitions
type StateData = {
  dates: {
    [date: string]: {
      total: {
        confirmed: number;
        deceased: number;
        other: number;
        recovered: number;
        tested: number;
        vaccinated1: number;
        vaccinated2: number;
      };
    };
  };
};

type DataProp = {
  [stateCode: string]: StateData;
};

type ChartSeries = {
  confirmed: { x: string; y: number }[];
  deceased: { x: string; y: number }[];
  other: { x: string; y: number }[];
  recovered: { x: string; y: number }[];
  tested: { x: string; y: number }[];
  vaccinated1: { x: string; y: number }[];
  vaccinated2: { x: string; y: number }[];
};

// Assuming this is a placeholder for your stateNames

const TableBoard = ({ data }: { data: DataProp }) => {
  const [chartData, setChartData] = useState<ChartSeries>({});
  const [selectedState, setSelectedState] = useState<string>("TT");
  const [stateOptions, setStateOptions] = useState<string[]>([]);
  const [allData, setAllData] = useState<DataProp>({});

  useEffect(() => {
    const stateCodes = Object.keys(data);
    setStateOptions(stateCodes);
    processData(data, selectedState);
    setAllData(data);
  }, [data, selectedState]);

  const processData = (data: DataProp, stateCode: string) => {
    if (!data[stateCode]) {
      console.error(`No data found for state code: ${stateCode}`);
      return;
    }

    const stateData = data[stateCode].dates;

    const createSeries = (metric: keyof StateData["dates"][string]["total"]) => {
      return Object.entries(stateData).map(([date, value]) => ({
        x: date,
        y: value.total[metric] || 0,
      }));
    };

    const series: ChartSeries = {
      confirmed: createSeries("confirmed"),
      deceased: createSeries("deceased"),
      other: createSeries("other"),
      recovered: createSeries("recovered"),
      tested: createSeries("tested"),
      vaccinated1: createSeries("vaccinated1"),
      vaccinated2: createSeries("vaccinated2"),
    };

    setChartData(series);
  };

  const getStateNameByCode = (stateCode: string) => {
    return stateNames[stateCode];
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newState = event.target.value;
    console.log(`Selected state: ${newState}`);
    setSelectedState(newState);
    processData(allData, newState);
  };

  return (
    <>
      <div className="mb-4">
        <select
          value={selectedState}
          onChange={handleStateChange}
          className="rounded-sm border border-stroke bg-white py-1 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          {stateOptions.map((stateCode) => (
            <option key={stateCode} value={stateCode}>
              {getStateNameByCode(stateCode)}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-10">
        <ChartLine title={`COVID-19 Testing Data - ${selectedState}`} data={chartData} />
      </div>
    </>
  );
};

export default TableBoard;
