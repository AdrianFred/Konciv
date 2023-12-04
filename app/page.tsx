import { Metadata } from "next";
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Covid-19 | India",
  description: "Dashboard for covid-19 data",
};

async function getData() {
  const res = await fetch("https://data.covid19india.org/v4/min/data.min.json", { next: { revalidate: 3600 } });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(`Failed to fetch data from https://data.covid19india.org/v4/min/data.min.json, status code ${res.status}`);
  }

  return data;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Dashboard indiaData={data} />
    </>
  );
}
