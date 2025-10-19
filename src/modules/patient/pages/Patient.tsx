import { useAllPatients } from "@/modules/patient/hooks/useAllPatients";
import PageHeader from "@/shared/components/Header/PageHeader";
import PatientGrid from "../components/PatientGrid/PatientGrid";
import { PaginationControls } from "@/shared/components/PaginationControls/PaginationControls";

const Patient = () => {
  const {
    patients,
    totalPages,
    totalElements,
    loading,
    error,
    page,
    handlePageChange,
  } = useAllPatients();

  if (loading)
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando pacientes...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-72 text-red-500">
        <p>Ocurrió un error al cargar los pacientes. Intenta nuevamente.</p>
      </div>
    );

  return (
    <section className="p-6 mx-auto">
      <PageHeader title="Pacientes" />

      <div className="pb-2">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {totalElements ?? 0} pacientes registrados
        </p>
      </div>
      <PatientGrid patients={patients} />
      {patients?.length ? (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      ) : null}

    </section>
  );
}

export default Patient;