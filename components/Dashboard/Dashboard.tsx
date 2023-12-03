// "use client";

// import React, { useState, useEffect } from "react";
// import CardDataStats from "../CardDataStats";
// import { GiConfirmed, GiHealingShield, GiDeadHead } from "react-icons/gi";
// import { FaBacteria } from "react-icons/fa";
// import ChartThree from "../Charts/ChartThree";
// import VaccineStats from "../VaccineStats";

// async function getInfo() {
//   const res = await fetch("https://data.covid19india.org/v4/min/data.min.json");
//   const data = await res.json();
//   return data;
// }

// export default function Dashboard() {
//   const [data, setData] = useState(null);
//   const [selection, setSelection] = useState({ state: "", district: "" });
//   const [confirmed, setConfirmed] = useState(0);
//   const [tested, setTested] = useState(0);
//   const [recovered, setRecovered] = useState(0);
//   const [deceased, setDeceased] = useState(0);

//   useEffect(() => {
//     getInfo()
//       .then((data) => {
//         setData(data);
//         updateTotals(data, { state: "", district: "" });
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//       });
//   }, []);

//   const updateTotals = (data: any, { state, district }: any) => {
//     let newConfirmed = 0,
//       newTested = 0,
//       newRecovered = 0,
//       newDeceased = 0;

//     // Example logic to calculate totals
//     if (state && district) {
//       const districtData = data[state].districts[district];
//       newConfirmed = districtData.total?.confirmed || 0;
//       newTested = districtData.total?.tested || 0;
//       newRecovered = districtData.total?.recovered || 0;
//       newDeceased = districtData.total?.deceased || 0;
//     } else if (state) {
//       const stateData = data[state];
//       newConfirmed = stateData.total?.confirmed || 0;
//       newTested = stateData.total?.tested || 0;
//       newRecovered = stateData.total?.recovered || 0;
//       newDeceased = stateData.total?.deceased || 0;
//     } else {
//       // If no specific state or district is selected, sum up the totals from all states
//       Object.values(data).forEach((stateData: any) => {
//         newConfirmed += stateData.total?.confirmed || 0;
//         newTested += stateData.total?.tested || 0;
//         newRecovered += stateData.total?.recovered || 0;
//         newDeceased += stateData.total?.deceased || 0;
//       });
//     }

//     setConfirmed(newConfirmed);
//     setTested(newTested);
//     setRecovered(newRecovered);
//     setDeceased(newDeceased);
//   };

//   const handleSelectionChange = (type) => (event) => {
//     const updatedSelection = {
//       ...selection,
//       [type]: event.target.value,
//       ...(type === "state" ? { district: "" } : {}),
//     };
//     setSelection(updatedSelection);
//     updateTotals(data, updatedSelection);
//   };

//   if (!data) {
//     return <div>Loading...</div>;
//   } else {
//     console.log(data);
//   }

//   const { state, district } = selection;
//   const stateData = data[state] || {};
//   const districts = stateData.districts || {};

//   return (
//     <div>
//       <h1>Dashboard</h1>
//       {/* Selection UI for state and district */}
//       <div className="flex space-x-2">
//         {/* State selection */}
//         <select
//           onChange={handleSelectionChange("state")}
//           value={state}
//           className="rounded-sm border border-stroke bg-white py-1 shadow-default dark:border-strokedark dark:bg-boxdark"
//         >
//           <option value="">Select a State</option>
//           {Object.keys(data).map((stateCode) => (
//             <option key={stateCode} value={stateCode}>
//               {stateCode}
//             </option>
//           ))}
//         </select>

//         {/* District selection */}
//         {state && (
//           <select
//             onChange={handleSelectionChange("district")}
//             value={district}
//             className="rounded-sm border border-stroke bg-white py-1 shadow-default dark:border-strokedark dark:bg-boxdark"
//           >
//             <option value="">Select District (Total)</option>
//             {Object.keys(districts).map((districtName) => (
//               <option key={districtName} value={districtName}>
//                 {districtName}
//               </option>
//             ))}
//           </select>
//         )}
//       </div>

//       {/* Data Display */}
//       <div className="grid grid-cols-1 gap-4 mt-2 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
//         {/* Confirmed Cases Card */}
//         <CardDataStats
//           key={`${district}-Confirmed`}
//           title={district || state || "India"}
//           total={confirmed.toLocaleString() || "N/A"}
//           name="Confirmed" // Example rate, should be calculated dynamically
//         >
//           <GiConfirmed />
//         </CardDataStats>
//         {/* Recovered Cases Card */}
//         <CardDataStats
//           key={`${district}-recovered`}
//           title={district || state || "India"}
//           total={recovered.toLocaleString() || "N/A"}
//           name="Recovered" // Example rate, should be calculated dynamically
//         >
//           <GiHealingShield />
//         </CardDataStats>
//         {/* Deceased Cases Card */}
//         <CardDataStats
//           key={`${district}-deceased`}
//           title={district || state || "India"}
//           total={deceased.toLocaleString() || "N/A"}
//           name="Deceased" // Example rate, should be calculated dynamically
//         >
//           <GiDeadHead />
//         </CardDataStats>{" "}
//         {/* Tested Cases Card */}
//         <CardDataStats
//           key={`${district}-tested`}
//           title={district || state || "India"}
//           total={tested.toLocaleString() || "N/A"}
//           name="Tested" // Example rate, should be calculated dynamically
//         >
//           <FaBacteria />
//         </CardDataStats>
//       </div>
//       <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
//         <ChartThree title="Vacinated" />
//       </div>
//       <div className=" mx-auto mt-6 max-w-[800px]">
//         <VaccineStats total={"1000"} atLeastOne="50" fullyVaccinated="25" />
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import CardDataStats from "../CardDataStats";
import { GiConfirmed, GiHealingShield, GiDeadHead } from "react-icons/gi";
import { FaBacteria } from "react-icons/fa";
import ChartThree from "../Charts/ChartThree";
import VaccineStats from "../VaccineStats";
import Breadcrumb from "../Breadcrumbs/Breadcrumb";

async function getInfo() {
  const res = await fetch("https://data.covid19india.org/v4/min/data.min.json");
  const data = await res.json();
  return data;
}

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [selection, setSelection] = useState({ state: "", district: "" });
  const [confirmed, setConfirmed] = useState(0);
  const [tested, setTested] = useState(0);
  const [recovered, setRecovered] = useState(0);
  const [deceased, setDeceased] = useState(0);
  const [population, setPopulation] = useState(0);
  const [vaccinated1, setVaccinated1] = useState(0);
  const [vaccinated2, setVaccinated2] = useState(0);

  useEffect(() => {
    getInfo()
      .then((data) => {
        setData(data);
        updateTotals(data, { state: "", district: "" });
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const updateTotals = (data: any, { state, district }: any) => {
    let newConfirmed = 0,
      newTested = 0,
      newRecovered = 0,
      newDeceased = 0;

    // Example logic to calculate totals
    if (state && district) {
      const districtData = data[state].districts[district];
      newConfirmed = districtData.total?.confirmed || "No data";
      newTested = districtData.total?.tested || "No data";
      newRecovered = districtData.total?.recovered || "No data";
      newDeceased = districtData.total?.deceased || "No data";
    } else if (state) {
      const stateData = data[state];
      newConfirmed = stateData.total?.confirmed || "No data";
      newTested = stateData.total?.tested || "No data";
      newRecovered = stateData.total?.recovered || "No data";
      newDeceased = stateData.total?.deceased || "No data";
    } else {
      // If no specific state or district is selected, sum up the totals from all states
      Object.values(data).forEach((stateData: any) => {
        newConfirmed += stateData.total?.confirmed || "No data";
        newTested += stateData.total?.tested || "No data";
        newRecovered += stateData.total?.recovered || "No data";
        newDeceased += stateData.total?.deceased || "No data";
      });
    }

    setConfirmed(newConfirmed);
    setTested(newTested);
    setRecovered(newRecovered);
    setDeceased(newDeceased);
  };

  const updateVaccineData = (data: any, { state, district }: any) => {
    let populationCount = 0;
    let vaccinated1Count = 0;
    let vaccinated2Count = 0;

    if (state && district) {
      const districtData = data[state].districts[district];
      populationCount = districtData.meta?.population || "No data";
      vaccinated1Count = districtData.total.vaccinated1 || 0;
      vaccinated2Count = districtData.total.vaccinated2 || 0;
    } else if (state) {
      const stateData = data[state];
      populationCount = stateData.meta?.population || 0;
      vaccinated1Count = stateData.total.vaccinated1 || 0;
      vaccinated2Count = stateData.total.vaccinated2 || 0;
    } else {
      // Aggregate data for all states if no specific state is selected
      Object.values(data).forEach((stateData: any) => {
        populationCount += stateData.meta.population || 0;
        vaccinated1Count += stateData.total.vaccinated1 || 0;
        vaccinated2Count += stateData.total.vaccinated2 || 0;
      });
    }

    setPopulation(populationCount);
    setVaccinated1(vaccinated1Count);
    setVaccinated2(vaccinated2Count);
  };

  const handleSelectionChange = (type: any) => (event: any) => {
    const updatedSelection = {
      ...selection,
      [type]: event.target.value,
      ...(type === "state" ? { district: "" } : {}),
    };
    setSelection(updatedSelection);
    updateTotals(data, updatedSelection);
  };

  useEffect(() => {
    if (data) {
      updateVaccineData(data, { state: selection.state, district: selection.district });
    }
  }, [selection, data]);

  const atLeastOneDosePercentage = population > 0 ? ((vaccinated1 / population) * 100).toFixed(2) : 0;
  const fullyVaccinatedPercentage = population > 0 ? ((vaccinated2 / population) * 100).toFixed(2) : 0;

  if (!data) {
    return <div>Loading...</div>;
  } else {
    console.log(data);
  }

  const { state, district } = selection;
  const stateData = data[state] || {};
  const districts = stateData.districts || {};

  return (
    <div>
      <Breadcrumb pageName="Home" />
      {/* Selection UI for state and district */}
      <div className="flex space-x-2">
        {/* State selection */}
        <select
          onChange={handleSelectionChange("state")}
          value={state}
          className="rounded-sm border border-stroke bg-white py-1 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <option value="">Select a State</option>
          {Object.keys(data).map((stateCode) => (
            <option key={stateCode} value={stateCode}>
              {stateCode}
            </option>
          ))}
        </select>

        {/* District selection */}
        {state && (
          <select
            onChange={handleSelectionChange("district")}
            value={district}
            className="rounded-sm border border-stroke bg-white py-1 shadow-default dark:border-strokedark dark:bg-boxdark"
          >
            <option value="">Select District (Total)</option>
            {Object.keys(districts).map((districtName) => (
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
          key={`${district}-Confirmed`}
          title={district || state || "India"}
          total={confirmed.toLocaleString() || "N/A"}
          name="Confirmed" // Example rate, should be calculated dynamically
        >
          <GiConfirmed />
        </CardDataStats>
        {/* Recovered Cases Card */}
        <CardDataStats
          key={`${district}-recovered`}
          title={district || state || "India"}
          total={recovered.toLocaleString() || "N/A"}
          name="Recovered" // Example rate, should be calculated dynamically
        >
          <GiHealingShield />
        </CardDataStats>
        {/* Deceased Cases Card */}
        <CardDataStats
          key={`${district}-deceased`}
          title={district || state || "India"}
          total={deceased.toLocaleString() || "N/A"}
          name="Deceased" // Example rate, should be calculated dynamically
        >
          <GiDeadHead />
        </CardDataStats>{" "}
        {/* Tested Cases Card */}
        <CardDataStats
          key={`${district}-tested`}
          title={district || state || "India"}
          total={tested.toLocaleString() || "N/A"}
          name="Tested" // Example rate, should be calculated dynamically
        >
          <FaBacteria />
        </CardDataStats>
      </div>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartThree title="Percentage" />
      </div>
      <div className="mx-auto mt-6 max-w-[800px]">
        <VaccineStats total={population.toLocaleString()} atLeastOne={atLeastOneDosePercentage} fullyVaccinated={fullyVaccinatedPercentage} />
      </div>
    </div>
  );
}
