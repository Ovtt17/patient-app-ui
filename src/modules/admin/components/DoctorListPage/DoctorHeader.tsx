import PageHeader from "@/shared/components/Header/PageHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface DoctorHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const DoctorHeader = ({
  search,
  onSearchChange,
}: DoctorHeaderProps) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <PageHeader title="Crear nuevo doctor" />

      <div className="relative w-full md:w-72">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Buscar doctor..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
    </div>
  );
};
