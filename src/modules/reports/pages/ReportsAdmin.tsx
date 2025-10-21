import type { FC } from "react";
import { UserGroupIcon, UserIcon, CalendarDaysIcon, ClockIcon, ClipboardDocumentCheckIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import PageHeader from "@/shared/components/Header/PageHeader";

export const ReportsAdmin: FC = () => {
  return (
    <section className="p-6 mx-auto max-w-7xl space-y-6">
      <PageHeader title="Reportes Administrativos" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pacientes */}
        <div className="cursor-pointer bg-blue-50 hover:bg-blue-100 transition rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
          <UserGroupIcon className="w-12 h-12 text-blue-600 mb-4" />
          <span className="text-lg font-semibold text-blue-700">Descargar Pacientes</span>
        </div>

        {/* Doctores */}
        <div className="cursor-pointer bg-green-50 hover:bg-green-100 transition rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
          <UserIcon className="w-12 h-12 text-green-600 mb-4" />
          <span className="text-lg font-semibold text-green-700">Descargar Doctores</span>
        </div>

        {/* Todas las Citas */}
        <div className="cursor-pointer bg-purple-50 hover:bg-purple-100 transition rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
          <CalendarDaysIcon className="w-12 h-12 text-purple-600 mb-4" />
          <span className="text-lg font-semibold text-purple-700">Descargar Citas</span>
        </div>

        {/* Citas Próximas */}
        <div className="cursor-pointer bg-yellow-50 hover:bg-yellow-100 transition rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
          <ClockIcon className="w-12 h-12 text-yellow-600 mb-4" />
          <span className="text-lg font-semibold text-yellow-700">Citas Próximas</span>
        </div>

        {/* Citas Completadas */}
        <div className="cursor-pointer bg-indigo-50 hover:bg-indigo-100 transition rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
          <ClipboardDocumentCheckIcon className="w-12 h-12 text-indigo-600 mb-4" />
          <span className="text-lg font-semibold text-indigo-700">Citas Completadas</span>
        </div>

        {/* Especialidades */}
        <div className="cursor-pointer bg-pink-50 hover:bg-pink-100 transition rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
          <BookmarkIcon className="w-12 h-12 text-pink-600 mb-4" />
          <span className="text-lg font-semibold text-pink-700">Reporte de Especialidades</span>
        </div>
      </div>
    </section>
  );
};
