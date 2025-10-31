import { useState, type FC } from "react";

interface Option {
  id: string;
  name: string;
}

interface AppointmentSelectFilterProps {
  label: string;
  options: Option[];
  selected: string | null;
  onSelect: (value: string | null) => void;
}

const AppointmentSelectFilter: FC<AppointmentSelectFilterProps> = ({
  label,
  options,
  selected,
  onSelect,
}) => {
  const [current, setCurrent] = useState<string | null>(selected);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setCurrent(value);
    onSelect(value || null);
  };

  return (
    <div className="flex justify-end w-full my-3">
      <div className="w-full sm:w-56">
        <label
          htmlFor={label}
          className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
        >
          {label}
        </label>

        <div className="relative">
          <select
            id={label}
            value={current ?? ""}
            onChange={handleChange}
            className="w-full cursor-pointer appearance-none py-3 pl-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-boxdark text-sm text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          >
            <option value="">TODOS</option>
            {options.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))}
          </select>

          {/* Icono de flecha */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentSelectFilter;