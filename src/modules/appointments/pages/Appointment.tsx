import type { FC } from "react";
import { useFilteredAppointments } from "../hooks/useFilteredAppointments";
import PageHeader from "@/shared/components/Header/PageHeader";
import { AppointmentTimeline } from "../components/Appointment/AppointmentTimeline";
import DateRangeToolbar from "@/shared/components/DatePickerWithRange/DateRangeToolbar";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import AppointmentStatusFilter from "../components/Appointment/AppointmentStatusFilter";

const Appointment: FC = () => {
  const {
    data: appointments,
    isLoading,
    error,
    date,
    onDateChange,
    onCurrentMonth
  } = useFilteredAppointments();

  return (
    <>
      <PageHeader title="Citas Médicas" />
      <ErrorDisplay errors={error} />
      {isLoading && <div>Cargando citas...</div>}
      <DateRangeToolbar
        date={date}
        onDateChange={onDateChange}
        onCurrentMonth={onCurrentMonth}
      />
      <AppointmentStatusFilter />
      <AppointmentTimeline appointments={appointments} />
    </>
  )
};

export default Appointment;