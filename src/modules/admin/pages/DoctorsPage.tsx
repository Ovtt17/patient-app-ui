import { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import { useDoctores } from "../hooks/useDoctors";

const DoctorsPage = () => {
  const [page, setPage] = useState(0);
  const size = 10;

  const { data, isLoading, isFetching, error } = useDoctores({
    page,
    size,
    sortBy: "createdDate",
    sortOrder: "DESC",
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse">
          Cargando doctores...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64 text-red-500">
        Ocurrió un error al cargar los doctores.
      </div>
    );

  const totalPages = data?.totalPages ?? 1;

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Doctores Activos
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {data?.totalElements ?? 0} doctores registrados
          </p>
        </div>
        {isFetching && (
          <span className="text-sm text-gray-400 animate-pulse">
            Actualizando...
          </span>
        )}
      </header>

      {/* Tabla */}
      <div className="overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Correo
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Teléfono
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                Género
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {data?.doctors.map((doctor) => (
              <tr
                key={doctor.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-gray-400" />
                  {doctor.firstName} {doctor.lastName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                  {doctor.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-gray-400" />
                  {doctor.phone ?? "—"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                  {doctor.gender ?? "—"}
                </td>
              </tr>
            ))}

            {data?.doctors.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-8 text-gray-500 dark:text-gray-400"
                >
                  No hay doctores registrados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition",
            page === 0
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          <ChevronLeftIcon className="w-4 h-4" />
          Anterior
        </button>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          Página {typeof data?.page === "number" ? data.page + 1 : 1} de{" "}
          {totalPages}
        </p>

        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages - 1))}
          disabled={page + 1 >= totalPages}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition",
            page + 1 >= totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
          )}
        >
          Siguiente
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default DoctorsPage;
