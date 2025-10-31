import { useState } from "react";
import { Squares2X2Icon, TableCellsIcon } from "@heroicons/react/24/outline";
import { usePaginatedPatients } from "@/modules/patient/hooks/usePaginatedPatients";
import PageHeader from "@/shared/components/Header/PageHeader";
import PatientGrid from "../components/PatientGrid/PatientGrid";
import { PaginationControls } from "@/shared/components/PaginationControls/PaginationControls";
import PatientTable from "../components/PatientTable/PatientTable";

const Patient = () => {
  const {
    patients,
    totalPages,
    totalElements,
    loading,
    errors,
    page,
    handlePageChange,
  } = usePaginatedPatients();

  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  if (loading)
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando pacientes...
        </p>
      </div>
    );

  if (errors)
    return (
      <div className="flex justify-center items-center h-72 text-red-500">
        <p>Ocurrió un error al cargar los pacientes. Intenta nuevamente.</p>
      </div>
    );

  return (
    <section>
      <PageHeader title="Pacientes" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {totalElements ?? 0} pacientes registrados
        </p>

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

      {/* Contenido */}
      {viewMode === "grid" ? (
        <PatientGrid patients={patients} />
      ) : (
        <PatientTable patients={patients} />
      )}

      {patients?.length ? (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : null}
    </section>
  );
};

export default Patient;
