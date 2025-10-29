import { useAuth } from "@/shared/context/auth/useAuth";
import type { FC } from "react";
import DoctorAppointmentsPage from "../components/DoctorAppointmentPage";
import PatientAppointmentsPage from "../components/PatientAppointmentsPage";

export const Appointment: FC = () => {
  const { isUserDoctor, isUserPatient } = useAuth();

  if (isUserDoctor) return <DoctorAppointmentsPage />;
  if (isUserPatient) return <PatientAppointmentsPage />;

  return <div>No tienes permiso para ver esta página.</div>;
};
