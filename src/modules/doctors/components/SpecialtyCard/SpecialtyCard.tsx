import { cn } from "@/lib/utils";
import type { SpecialtyResponse } from "../../types/SpecialtyResponse";
import { BeakerIcon } from "@heroicons/react/24/outline";

interface SpecialtyCardProps {
  specialty: SpecialtyResponse;
}

export const SpecialtyCard = ({ specialty }: SpecialtyCardProps) => {
  const { id, name, description } = specialty;

  return (
    <article
      key={id}
      className={cn(
        "rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900",
        "shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col justify-between"
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800">
          <BeakerIcon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
        </div>

        <h2 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight">
          {name}
        </h2>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400">
        {description || "Descripción no disponible."}
      </p>
    </article>
  );
};
