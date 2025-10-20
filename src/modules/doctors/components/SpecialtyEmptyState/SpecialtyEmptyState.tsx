import { BeakerIcon } from "@heroicons/react/24/outline";

export const SpecialtyEmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
      <BeakerIcon className="w-12 h-12 text-gray-400 mb-3" />
      <p className="text-gray-500 dark:text-gray-400">
        No hay especialidades disponibles en este momento.
      </p>
    </div>
  );
};
