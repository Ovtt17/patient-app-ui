import { type FC } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: FC<{ className?: string }>;
  gradient?: [string, string];
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  gradient,
}) => {
  // Colores por defecto pasteles
  const defaultGradient = ["#A7F3D0", "#6EE7B7"]; // verde pastel
  const bgGradient = gradient || defaultGradient;

  return (
    <div
      className="rounded-2xl shadow-md p-6 flex flex-col items-center justify-center text-center cursor-pointer transform transition-all duration-300 hover:scale-105"
      style={{
        background: `linear-gradient(135deg, ${bgGradient[0]}, ${bgGradient[1]})`,
      }}
    >
      <div
        className="p-3 rounded-full mb-4"
        style={{
          background: "rgba(255,255,255,0.3)",
        }}
      >
        <Icon className="w-8 h-8 text-white" />
      </div>
      <span className="text-2xl font-extrabold text-white">{value}</span>
      <span className="text-white/80 mt-1">{title}</span>
    </div>
  );
};
