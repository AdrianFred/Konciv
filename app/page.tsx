import { Metadata } from "next";
import Dashboard from "@/components/Dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Konciv",
  description: "Dashboard for covid-19 data",
};

export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}
