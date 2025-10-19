import { UserIcon } from "@heroicons/react/24/outline";

export const PatientEmptyState = () => (
  <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
    <UserIcon className="w-10 h-10 text-gray-400 mb-2" />
    <p className="text-gray-500 dark:text-gray-400">
      No se encontraron pacientes.
    </p>
  </div>
);
