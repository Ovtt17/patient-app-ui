import { useMemo, useState, type FC } from "react";
import { useFilteredAppointments } from "../hooks/useFilteredAppointments";
import PageHeader from "@/shared/components/Header/PageHeader";
import { AppointmentTimeline } from "../components/Appointment/AppointmentTimeline";
import DateRangeToolbar from "@/shared/components/DatePickerWithRange/DateRangeToolbar";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import AppointmentFilters from "../components/Appointment/AppointmentFilters";
import { NavLink } from "react-router-dom";
import { Routes } from "@/shared/constants/routes";

const Appointment: FC = () => {
  const {
    data: appointments,
    isLoading,
    error,
    date,
    onDateChange,
    onCurrentMonth
  } = useFilteredAppointments();

  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);

  const filteredAppointments = useMemo(() => {
    if (!appointments) return [];
    return appointments.filter(a => {
      if (selectedDoctor && a.doctorId !== selectedDoctor) return false;
      if (selectedPatient && a.patientId !== selectedPatient) return false;
      return true;
    });
  }, [appointments, selectedDoctor, selectedPatient]);

  return (
    <>
      <PageHeader title="Citas Médicas" />
      <ErrorDisplay errors={error} />
      {isLoading && <div>Cargando citas...</div>}
      <div className="flex justify-end my-3">
        <NavLink
          to={Routes.APPOINTMENTS_CREATE}
          className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
        >
          Agendar cita
        </NavLink>
      </div>
      <DateRangeToolbar
        date={date}
        onDateChange={onDateChange}
        onCurrentMonth={onCurrentMonth}
      />
      <AppointmentFilters
        appointments={appointments}
        selectedDoctor={selectedDoctor}
        onSelectDoctor={setSelectedDoctor}
        selectedPatient={selectedPatient}
        onSelectPatient={setSelectedPatient}
      />

      <AppointmentTimeline appointments={filteredAppointments} />
    </>
  )
};

export default Appointment;