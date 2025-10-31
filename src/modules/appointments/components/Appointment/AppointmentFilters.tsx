import { useState, useRef, useEffect, type FC } from "react";
import { Filter } from "lucide-react";
import AppointmentSelectFilter from "./AppointmentSelectFilter";
import { useAuth } from "@/shared/context/auth/useAuth";
import type { AppointmentResponse } from "../../types/AppointmentResponse";
import AppointmentStatusFilter from "./AppointmentStatusFilter";

interface Props {
  appointments?: AppointmentResponse[];
  selectedDoctor: string | null;
  selectedPatient: string | null;
  onSelectDoctor: (id: string | null) => void;
  onSelectPatient: (id: string | null) => void;
}

const AppointmentFilters: FC<Props> = ({
  appointments = [],
  selectedDoctor,
  selectedPatient,
  onSelectDoctor,
  onSelectPatient,
}) => {
  const { isUserDoctor, isUserPatient, isUserAdmin } = useAuth();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // cerrar si se clickea afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // datos únicos
  const doctors = Array.from(
    new Map(
      appointments.map((a) => [a.doctorId, { id: a.doctorId, name: a.doctorName }])
    ).values()
  );

  const patients = Array.from(
    new Map(
      appointments.map((a) => [a.patientId, { id: a.patientId, name: a.patientName }])
    ).values()
  );

  return (
    <div className="relative flex justify-end w-full my-3">
      {/* Botón principal */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-white dark:bg-boxdark border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        <Filter className="w-4 h-4" />
        Filtros
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-12 w-72 bg-white dark:bg-boxdark border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 z-50 animate-in fade-in slide-in-from-top-2"
        >
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
            Filtrar por
          </h3>

          <div className="flex flex-col gap-3">
            <AppointmentStatusFilter />
            {isUserAdmin && (
              <>
                <AppointmentSelectFilter
                  label="Doctor"
                  options={doctors}
                  selected={selectedDoctor}
                  onSelect={(v) => onSelectDoctor(v ?? null)}
                />
                <AppointmentSelectFilter
                  label="Paciente"
                  options={patients}
                  selected={selectedPatient}
                  onSelect={(v) => onSelectPatient(v ?? null)}
                />
              </>
            )}

            {isUserDoctor && (
              <AppointmentSelectFilter
                label="Paciente"
                options={patients}
                selected={selectedPatient}
                onSelect={(v) => onSelectPatient(v ?? null)}
              />
            )}

            {isUserPatient && (
              <AppointmentSelectFilter
                label="Doctor"
                options={doctors}
                selected={selectedDoctor}
                onSelect={(v) => onSelectDoctor(v ?? null)}
              />
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={() => setOpen(false)}
              className="text-sm text-primary hover:underline"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentFilters;