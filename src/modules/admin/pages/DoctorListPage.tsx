import { useState } from "react";
import {
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useAllDoctors } from "../hooks/useAllDoctors";
import { PaginationControls } from "@/shared/components/PaginationControls/PaginationControls";

const DoctorListPage = () => {
  const [search, setSearch] = useState("");

  const {
    doctors,
    totalPages,
    totalElements,
    loading,
    error,
    page,
    handlePageChange
  } = useAllDoctors();

  // 🔍 Filtrar localmente (simple)
  const filteredDoctors = doctors?.filter((d) =>
    `${d.firstName} ${d.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando doctores...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-72 text-red-500">
        <p>Ocurrió un error al cargar los doctores. Intenta nuevamente.</p>
      </div>
    );
  }

  return (
    <section className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <header className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900 dark:text-white tracking-tight">
            Doctores
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalElements ?? 0} profesionales registrados
          </p>
        </div>

        <div className="relative w-full md:w-72">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </header>

      {/* Lista de doctores */}
      <div
        className={cn(
          "grid gap-6",
          filteredDoctors?.length ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}
      >
        {filteredDoctors?.length ? (
          filteredDoctors.map((doctor) => (
            <article
              key={doctor.id}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col justify-between"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h2 className="font-medium text-gray-900 dark:text-white">
                    {doctor.firstName} {doctor.lastName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                    {doctor.gender ?? "—"}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                  {doctor.email}
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <PhoneIcon className="w-4 h-4 text-gray-400" />
                  {doctor.phone ?? "—"}
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
            <UserIcon className="w-10 h-10 text-gray-400 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">No se encontraron doctores.</p>
          </div>
        )}
      </div>

      {/* Paginación */}
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