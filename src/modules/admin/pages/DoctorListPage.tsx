import { useState } from "react";
import { useAllDoctors } from "../hooks/useAllDoctors";
import { PaginationControls } from "@/shared/components/PaginationControls/PaginationControls";
import { DoctorHeader } from "../components/DoctorListPage/DoctorHeader";
import { DoctorGrid } from "../components/DoctorListPage/DoctorGrid";

const DoctorListPage = () => {
  const [search, setSearch] = useState("");

  const {
    doctors,
    totalPages,
    totalElements,
    loading,
    error,
    page,
    handlePageChange,
  } = useAllDoctors();

  const filteredDoctors = doctors?.filter((d) =>
    `${d.firstName} ${d.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando doctores...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-72 text-red-500">
        <p>Ocurrió un error al cargar los doctores. Intenta nuevamente.</p>
      </div>
    );

  return (
    <section className="p-6 mx-auto">
      <DoctorHeader
        totalElements={totalElements}
        search={search}
        onSearchChange={setSearch}
      />
      <DoctorGrid doctors={filteredDoctors ?? []} />
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

export default DoctorListPage;