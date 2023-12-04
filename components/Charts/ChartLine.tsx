"use client";

import React from "react";
import dynamic from "next/dynamic";
import ApexCharts, { ApexOptions } from "apexcharts";

// Dynamic import to avoid SSR issues with ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

type ChartLineProps = {
  title: string;
  dates: { x: number; y: number }[];
};

const ChartLine = ({ title, dates }: ChartLineProps) => {
  const series = [
    {
      name: "Deceased",
      data: dates.map((date) => [new Date(date.x).getTime(), date.y]),
    },
    {
      name: "Recovered",
      data: dates.map((date) => [new Date(date.x).getTime(), date.y]),
    },
  ];

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
        text: "Deceased",
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return val.toFixed(2);
        },
      },
    },
  };

  return (
    <div className="flex justify-center items-center ">
      <ReactApexChart options={options} series={series} type="line" height={350} className="w-[800px]" />
    </div>
  );
};

export default ChartLine;
