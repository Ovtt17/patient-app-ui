import { useState, useMemo } from "react";
import { useAllDoctors } from "../hooks/useAllDoctors";
import { PaginationControls } from "@/shared/components/PaginationControls/PaginationControls";
import { DoctorHeader } from "../components/DoctorListPage/DoctorHeader";
import { DoctorGrid } from "../components/DoctorListPage/DoctorGrid";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import DoctorTable from "../components/DoctorTable/DoctorTable";
import { MagnifyingGlassIcon, Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";

const Doctor = () => {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const {
    doctors,
    totalPages,
    totalElements,
    loading,
    error,
    page,
    handlePageChange,
  } = useAllDoctors();

  const filteredDoctors = useMemo(
    () =>
      doctors?.filter((d) =>
        `${d.firstName} ${d.lastName}`.toLowerCase().includes(search.toLowerCase())
      ),
    [doctors, search]
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando doctores...
        </p>
      </div>
    );

  return (
    <section className="p-6 mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <DoctorHeader search={search} onSearchChange={setSearch} />
        {/* Toggle Grid / Table */}
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 rounded-md border ${viewMode === "grid"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300"
              } transition-colors flex items-center justify-center`}
            aria-label="Vista de cuadrícula"
          >
            <Squares2X2Icon className="h-5 w-5" />
          </button>
          <button
            onClick={() => setViewMode("table")}
            className={`px-3 py-1 rounded-md border ${viewMode === "table"
              ? "bg-blue-500 text-white border-blue-500"
              : "bg-white text-gray-700 border-gray-300"
              } transition-colors flex items-center justify-center`}
            aria-label="Vista de tabla"
          >
            <TableCellsIcon className="h-5 w-5" />
          </button>

        </div>
      </div>
      {viewMode === 'grid' && (
        <div className="relative w-full max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Buscar doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <MagnifyingGlassIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      )}

      {error && <ErrorDisplay errors={error} />}

      <div className="py-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {totalElements ?? 0} profesionales registrados
        </p>
      </div>

      {viewMode === "grid" ? (
        <DoctorGrid doctors={filteredDoctors ?? []} />
      ) : (
        <DoctorTable doctors={filteredDoctors ?? []} />
      )}

      {filteredDoctors?.length ? (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : null}
    </section>
  );
};

export default Doctor;
