import type { FC } from "react";
import { useState, useMemo } from "react";
import { mockAppointments } from "../mocks/appointments";
import { AppointmentCard } from "../components/AppointmentCard/AppointmentCard";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import PageHeader from "@/shared/components/Header/PageHeader";

const statuses = ["PENDIENTE", "CONFIRMADA", "COMPLETADA", "CANCELADA", "AUSENTE"];

export const AppointmentsPage: FC = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredAppointments = useMemo(() => {
    return mockAppointments.filter((appt) => {
      const matchesSearch = appt.patientName.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filterStatus ? appt.status === filterStatus : true;
      return matchesSearch && matchesStatus;
    });
  }, [search, filterStatus]);

  return (
    <div className="p-6 max-w-7xl space-y-6 mx-auto">
      {/* Título */}
      <PageHeader title="Citas Médicas" />
      
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar paciente..."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        <select
          className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={filterStatus ?? ""}
          onChange={(e) => setFilterStatus(e.target.value || null)}
        >
          <option value="">Todos los estados</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de citas */}
      {filteredAppointments.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              patientName={appointment.patientName}
              appointmentDate={appointment.appointmentDate}
              endTime={appointment.endTime}
              reason={appointment.reason}
              notes={appointment.notes}
              status={appointment.status}
              id={appointment.id}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic text-center">No se encontraron citas con los filtros aplicados.</p>
      )}
    </div>
  );
};
