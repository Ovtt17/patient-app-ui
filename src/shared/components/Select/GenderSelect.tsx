import { GENDERS } from "@/shared/types/Gender";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

interface GenderSelectProps {
  fieldName: string;
}

const GenderSelect: FC<GenderSelectProps> = ({ fieldName }) => {
  const { register } = useFormContext();

  return (
    <div className="w-full mb-2">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-2">
        Género
      </label>
      <div className="relative">
        <select
          id={fieldName}
          {...register(fieldName)}
          className="w-full appearance-none h-12 px-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-boxdark text-sm text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
          aria-label="Selecciona tu género"
        >
          {Object.values(GENDERS).map((gender) => (
            <option key={gender} value={gender}>
              {gender}
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
  );
};

export default GenderSelect;
