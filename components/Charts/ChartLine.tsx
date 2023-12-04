import React, { useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

// Dynamic import to avoid SSR issues with ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define a type for a single data point
type DataPoint = {
  x: number;
  y: number;
};

// Define a type for the data object
type DataObject = {
  confirmed: { x: string; y: number }[];
  deceased: { x: string; y: number }[];
  other: { x: string; y: number }[];
  recovered: { x: string; y: number }[];
  tested: { x: string; y: number }[];
  vaccinated1: { x: string; y: number }[];
  vaccinated2: { x: string; y: number }[];
};

type ChartLineProps = {
  title: string;
  data: DataObject;
};

const ChartLine = ({ title, data }: ChartLineProps) => {
  const [selectedMetric, setSelectedMetric] = useState<keyof DataObject | "all">("all");

  const getCumulativeData = (data: DataPoint[]): { x: number; y: number }[] => {
    let sum = 0;
    return data.map((point) => {
      sum += point.y;
      return { x: point.x, y: sum };
    });
  };

  // Define color mapping
  const metricColors = {
    confirmed: "#36A2EB",
    deceased: "#FF6384",
    other: "#FFCE56",
    recovered: "#4BC0C0",
    tested: "#9966FF",
    vaccinated1: "#FF9F40",
    vaccinated2: "#4D5360",
  };

  let series = [];
  if (selectedMetric === "all") {
    // Handle the 'all' case by iterating over each metric in 'data'
    series = Object.entries(data).map(([metric, values]: any) => ({
      name: metric.charAt(0).toUpperCase() + metric.slice(1),
      data: getCumulativeData(values),
      color: metricColors[metric as keyof DataObject],
    }));
  } else {
    // For a specific metric, directly access its data
    const metricData: any = data[selectedMetric as keyof DataObject];
    if (!metricData) {
      console.error(`No data found for metric: ${selectedMetric}`);
      return null; // or handle the error appropriately
    }
    series = [
      {
        name: selectedMetric.charAt(0).toUpperCase() + selectedMetric.slice(1),
        data: getCumulativeData(metricData),
        color: metricColors[selectedMetric as keyof DataObject],
      },
    ];
  }

  const options: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      zoom: {
        enabled: true,
        type: "x",
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
    },
    title: {
      text: title,
      align: "left",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      title: {
        text: "People",
      },
    },
    tooltip: {
      shared: true,
      y: {
        formatter: function (val, { seriesIndex, dataPointIndex, w }) {
          const dailyGain = w.globals.series[seriesIndex][dataPointIndex] - (w.globals.series[seriesIndex][dataPointIndex - 1] || 0);
          const totalFormatted = val.toLocaleString();
          const dailyGainFormatted = dailyGain.toLocaleString();
          return `Total: ${totalFormatted} (Daily Gain: ${dailyGainFormatted})`;
        },
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center rounded-sm bg-white dark:bg-boxdark">
      <div className="mb-4">
        <label>Sort by: </label>
        <select
          value={selectedMetric}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedMetric(e.target.value as keyof DataObject | "all")}
          className="rounded-sm border border-stroke bg-white py-1 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <option value="all">All</option>
          {Object.keys(data).map((metric) => (
            <option key={metric} value={metric}>
              {metric.charAt(0).toUpperCase() + metric.slice(1)}
            </option>
          ))}
        </select>
      </div>
      <ReactApexChart options={options} series={series} type="line" height={400} className=" w-[350px] lg:w-[800px] lg:px-6" />
    </div>
  );
};

export default ChartLine;
