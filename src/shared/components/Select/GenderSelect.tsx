import { GENDERS } from "@/shared/types/Gender";
import { get } from "lodash";
import type { FC } from "react";
import { useFormContext } from "react-hook-form";

interface GenderSelectProps {
  fieldName: string;
}

const GenderSelect: FC<GenderSelectProps> = ({ fieldName }) => {
  const { register, formState: { errors } } = useFormContext();
  const error = get(errors, fieldName);

  return (
    <div className="w-full mb-2">
      <label className="mb-2.5 block font-bold text-gray-700 dark:text-gray-200">
        Género
      </label>
      <div className="relative">
        <select
          id={fieldName}
          {...register(fieldName)}
          className="w-full cursor-pointer appearance-none py-4.5 pl-6 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-boxdark text-sm text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
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
      {error && <p className="text-red-500 text-sm pt-1">{String(error.message)}</p>}
    </div>
  );
};

export default GenderSelect;
