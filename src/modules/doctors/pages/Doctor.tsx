import { useState } from "react";
import { usePaginatedDoctors } from "../hooks/usePaginatedDoctors";
import { PaginationControls } from "@/shared/components/PaginationControls/PaginationControls";
import { DoctorHeader } from "../components/DoctorListPage/DoctorHeader";
import { DoctorGrid } from "../components/DoctorListPage/DoctorGrid";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import DoctorTable from "../components/DoctorTable/DoctorTable";
import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";

const Doctor = () => {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const {
    doctors,
    totalPages,
    loading,
    error,
    page,
    handlePageChange,
  } = usePaginatedDoctors();

  if (loading)
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando doctores...
        </p>
      </div>
    );

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <DoctorHeader />
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

      {error && <ErrorDisplay errors={error} />}

      {viewMode === "grid" ? (
        <DoctorGrid doctors={doctors ?? []} />
      ) : (
        <DoctorTable doctors={doctors ?? []} />
      )}

      {doctors?.length ? (
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
