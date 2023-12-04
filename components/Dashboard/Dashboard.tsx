"use client";

import React, { useState, useEffect } from "react";
import CardDataStats from "../CardDataStats";
import { GiConfirmed, GiHealingShield, GiDeadHead } from "react-icons/gi";
import { PiTestTube } from "react-icons/pi";
import VaccineStats from "../VaccineStats";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import ChartPie from "../Charts/ChartPie";
import { stateNames } from "@/lib/stateNames";
import { DashboardProps } from "@/types/dashboard";

export default function Dashboard({ indiaData }: DashboardProps) {
  const [data, setData] = useState<any>(indiaData);
  const [selection, setSelection] = useState({ state: "TT", district: "" });
  const [confirmed, setConfirmed] = useState(0);
  const [tested, setTested] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deceased, setDeceased] = useState(0);
  const [population, setPopulation] = useState(0);
  const [vaccinated1, setVaccinated1] = useState(0);
  const [vaccinated2, setVaccinated2] = useState(0);

  useEffect(() => {
    updateTotals(data, selection);
  }, [data, selection]);

  const updateTotals = (data: string, { state, district }: any) => {
    const stateData: any = data[state] || {};
    const districtData = district ? stateData.districts[district] : stateData;

    setConfirmed(districtData.total?.confirmed || "No data");
    setTested(districtData.total?.tested || "No data");
    setRecovered(districtData.total?.recovered || "No data");
    setDeceased(districtData.total?.deceased || "No data");
    setPopulation(districtData.meta?.population || "No data");
    setVaccinated1(districtData.total?.vaccinated1 || "No data");
    setVaccinated2(districtData.total?.vaccinated2 || "No data");
  };

  const handleSelectionChange = (type: any) => (event: any) => {
    const value = event.target.value;
    const newSelection = { ...selection, [type]: value };
    if (type === "state") {
      newSelection.district = ""; // Reset district when state changes
    }
    setSelection(newSelection);
    updateTotals(data, newSelection);
  };

  const getStateNameByCode = (stateCode: string) => {
    return stateNames[stateCode];
  };

  const atLeastOneDosePercentage = population > 0 ? ((vaccinated1 / population) * 100).toFixed(2) : 0;
  const fullyVaccinatedPercentage = population > 0 ? ((vaccinated2 / population) * 100).toFixed(2) : 0;

  if (!data) {
    return <div>Loading...</div>;
  } else {
    console.log(indiaData);
  }

  return (
    <div>
      <Breadcrumb pageName="Home" />
      <div className="flex space-x-2">
        {/* State selection */}
        <select
          onChange={handleSelectionChange("state")}
          value={selection.state}
          className="rounded-sm border border-stroke bg-white py-1 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <option value="TT">India (Total)</option>
          {data &&
            Object.keys(data).map((stateCode) => (
              <option key={stateCode} value={stateCode}>
                {getStateNameByCode(stateCode)}
              </option>
            ))}
        </select>

        {/* District selection */}
        {selection.state && data[selection.state].districts && (
          <select
            onChange={handleSelectionChange("district")}
            value={selection.district}
            className="rounded-sm border border-stroke bg-white py-1 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <option value="">Select District (Total)</option>
            {Object.keys(data[selection.state].districts).map((districtName) => (
              <option key={districtName} value={districtName}>
                {districtName}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Data Display */}
      <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {/* Confirmed Cases Card */}
        <CardDataStats
          key={`${selection.district}-Confirmed`}
          title={selection.district || selection.state || "India"}
          total={confirmed.toLocaleString() || "N/A"}
          name="Confirmed"
        >
          <GiConfirmed />
        </CardDataStats>
        {/* Recovered Cases Card */}
        <CardDataStats
          key={`${selection.district}-recovered`}
          title={selection.district || selection.state || "India"}
          total={recovered.toLocaleString() || "N/A"}
          name="Recovered"
        >
          <GiHealingShield />
        </CardDataStats>
        {/* Deceased Cases Card */}
        <CardDataStats
          key={`${selection.district}-deceased`}
          title={selection.district || selection.state || "India"}
          total={deceased.toLocaleString() || "N/A"}
          name="Deceased"
        >
          <GiDeadHead />
        </CardDataStats>
        {/* Tested Cases Card */}
        <CardDataStats
          key={`${selection.district}-tested`}
          title={selection.district || selection.state || "India"}
          total={tested.toLocaleString() || "N/A"}
          name="Tested"
        >
          <PiTestTube />
        </CardDataStats>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:gap-6 lg:grid-cols-2 2xl:mt-7.5 2xl:gap-7.5">
        <div className="max-w-[700px]">
          <ChartPie title="Stats" numbers={[recovered, deceased]} />
        </div>

        <div>
          <VaccineStats total={population.toLocaleString()} atLeastOne={atLeastOneDosePercentage} fullyVaccinated={fullyVaccinatedPercentage} />
        </div>
      </div>
    </div>
  );
}
