import { type FC } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import type { SpecialtyDistribution } from "../../types/SpecialtyDistribution";

interface PieChartCardProps {
  title: string;
  data: SpecialtyDistribution[];
  colors?: string[];
}

export const PieChartCard: FC<PieChartCardProps> = ({ title, data, colors }) => {
  const defaultColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a1cfff", "#f87171", "#34d399"];
  const chartColors = colors || defaultColors;

  const chartData = data.map(d => ({ specialty: d.specialty, doctorCount: d.doctorCount }));

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="doctorCount"
            nameKey="specialty"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label
          >
            {chartData.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};