import { useDoctorAppointments } from "./useDoctorAppointments";
import { usePatientAppointments } from "./usePatientAppointments";
import { useFilteredAppointments } from "./useFilteredAppointments";
import { useAuth } from "@/shared/context/auth/useAuth";
import type { AppointmentFilter } from "../types/AppointmentFilter";

const EMPTY_FILTER: AppointmentFilter = {
  doctorId: undefined,
  patientId: undefined,
  status: undefined,
  startDate: undefined,
  endDate: undefined,
};

export const useAppointmentsByRole = (adminFilter?: AppointmentFilter) => {
  const { user, isUserAdmin, isUserDoctor, isUserPatient } = useAuth();

  if (isUserDoctor && user?.doctorId) {
    return useDoctorAppointments(user.doctorId);
  }

  if (isUserPatient && user?.patientId) {
    return usePatientAppointments(user.patientId);
  }

  if (isUserAdmin) {
    return useFilteredAppointments(adminFilter ?? EMPTY_FILTER);
  }

  // fallback: sin rol o sin IDs válidos
  return { data: [], isLoading: false, isError: false };
};
