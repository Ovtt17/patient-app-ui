import { type FC } from "react";
import { useAuth } from "@/shared/context/auth/useAuth";
import type { AppointmentResponse } from "../../types/AppointmentResponse";
import AppointmentStatusDropdown from "./AppointmentStatusDropdown";
import AppointmentSearchableDropdown from "./AppointmentSearchableDropdown";

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
    <div className="w-full p-6 rounded-xl">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Filtros de citas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Estado de la cita */}
        <AppointmentStatusDropdown />

        {/* Admin: doctor y paciente */}
        {isUserAdmin && (
          <>
            <AppointmentSearchableDropdown
              label="Doctor"
              options={doctors}
              selected={selectedDoctor}
              onSelect={onSelectDoctor}
              placeholder="Seleccione doctor"
            />
            <AppointmentSearchableDropdown
              label="Paciente"
              options={patients}
              selected={selectedPatient}
              onSelect={onSelectPatient}
              placeholder="Seleccione paciente"
            />
          </>
        )}

        {/* Doctor: solo pacientes */}
        {isUserDoctor && (
          <AppointmentSearchableDropdown
            label="Paciente"
            options={patients}
            selected={selectedPatient}
            onSelect={onSelectPatient}
            placeholder="Seleccione paciente"
          />
        )}

        {/* Paciente: solo doctor */}
        {isUserPatient && (
          <AppointmentSearchableDropdown
            label="Doctor"
            options={doctors}
            selected={selectedDoctor}
            onSelect={onSelectDoctor}
            placeholder="Seleccione doctor"
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentFilters;