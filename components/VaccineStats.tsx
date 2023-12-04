// VaccineStats.js
import { FaSyringe, FaHeart } from "react-icons/fa";

interface VaccineStatsProps {
  total: string | number;
  atLeastOne: string | number;
  fullyVaccinated: string | number;
}

const VaccineStats = ({ total, atLeastOne, fullyVaccinated }: VaccineStatsProps) => {
  // Assuming these values will be fetched or passed as props
  const dosesAdministered = total;
  const atLeastOneDosePercentage = atLeastOne;
  const fullyVaccinatedPercentage = fullyVaccinated;

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Syringe Icon and Doses Administered */}
      <div className="flex items-center justify-between mb-2">
        <FaSyringe className="text-xl" />
        <span className="text-lg flex-grow text-center text-black dark:text-white">{dosesAdministered.toLocaleString()} Total People</span>
        <FaHeart className="text-xl" />
      </div>

      {/* Combined Progress Bar */}
      <div className="relative w-full bg-white border rounded-full h-2.5 dark:bg-white mb-4">
        {/* Progress Bar for 'At least one dose' */}
        <div
          className="bg-[#10B981] top-[-1px] absolute h-2.5 rounded-full opacity-75 dark:bg-danger"
          style={{ width: `${atLeastOneDosePercentage}%` }}
        ></div>
        {/* Overlay Progress Bar for 'Fully vaccinated' */}
        <div className="absolute top-[-1px] bg-[#10B981] h-2.5 rounded-full dark:bg-danger" style={{ width: `${fullyVaccinatedPercentage}%` }}></div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs">
        <span>Fully vaccinated</span>
        <span>At least one dose</span>
      </div>

      {/* Percentage Labels */}
      <div className="flex justify-between text-xs mt-1">
        <span>{fullyVaccinatedPercentage}%</span>
        <span>{atLeastOneDosePercentage}%</span>
      </div>
    </div>
  );
};

export default VaccineStats;
