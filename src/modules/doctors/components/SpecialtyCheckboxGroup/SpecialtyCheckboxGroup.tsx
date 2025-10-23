import type { FC } from "react";
import { cn } from "@/lib/utils";
import type { SpecialtyResponse } from "../../types/SpecialtyResponse";

interface SpecialtyFilterGroupProps {
  specialties: SpecialtyResponse[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  loading?: boolean;
}

const SpecialtyCheckboxGroup: FC<SpecialtyFilterGroupProps> = ({
  specialties,
  selectedIds,
  onChange,
  loading = false,
}) => {
  const toggleSpecialty = (id: number) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((sid) => sid !== id)
      : [...selectedIds, id];
    onChange(updated);
  };

  return (
    <div>
      <h4 className="block font-bold text-gray-900 dark:text-white mb-3">Especialidades</h4>
      {loading ? (
        <div className="text-sm text-gray-500 dark:text-gray-400">Cargando especialidades...</div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {specialties.map((spec) => {
            const isSelected = selectedIds.includes(spec.id);
            return (
              <button
                key={spec.id}
                type="button"
                onClick={() => toggleSpecialty(spec.id)}
                className={cn(
                  "px-4 py-1.5 text-sm rounded-full border transition-colors",
                  isSelected
                    ? "bg-gradient-to-r from-primary to-secondary text-white border-primary hover:brightness-110"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-white border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                )}
              >
                {spec.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SpecialtyCheckboxGroup;