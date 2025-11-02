import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";
import type { FC } from "react";

interface MonthlyAppointmentsChartProps {
  monthlyData: number[];
}

export const MonthlyAppointmentsChart: FC<MonthlyAppointmentsChartProps> = ({ monthlyData }) => {

  const options: ApexOptions = {
    chart: { type: "area", toolbar: { show: false }, fontFamily: "Satoshi, sans-serif" },
    colors: ["#6366f1"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 2 },
    xaxis: {
      categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      labels: { style: { colors: "#6b7280" } },
    },
    yaxis: { labels: { style: { colors: "#6b7280" } } },
    tooltip: { theme: "dark" },
    grid: { show: false }
  };

  const series = [{ name: "Citas", data: monthlyData }];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
      <Chart options={options}
        series={series}
        type="area"
        width="100%"
        height="100%"
      />
    </div>
  );
};