import { getAppointmentsByDoctor } from "../api/appointment.api";
import { useAppointmentsBase } from "./useAppointmentsBase";

export const useDoctorAppointments = (doctorId: string, fromDate?: Date) => {
  return useAppointmentsBase({
    queryKey: ['appointments', 'doctor', doctorId, fromDate ? fromDate.toISOString() : ''],
    fetchFn: () => getAppointmentsByDoctor(doctorId, fromDate),
  });
};
