import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableBoard from "@/components/TableBoard";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Covid-19 | Tables",
  description: "Dashboard for covid-19 data",
};

async function getData() {
  const res = await fetch("https://data.covid19india.org/v4/min/timeseries.min.json", { next: { revalidate: 3600 } });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch data from https://data.covid19india.org/v4/min/timeseries.min.json, status code ${res.status}`);
  }

  return data;
}

export default async function TablesPage() {
  const data = await getData();
  return (
    <>
      <Breadcrumb pageName="Line-Chart" />
      <div className="flex flex-col gap-10">
        <TableBoard data={data} />
      </div>
    </>
  );
}
