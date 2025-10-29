import { getAppointmentsByPatient } from '../api/appointment.api';
import { useAppointmentsBase } from './useAppointmentsBase';

export const usePatientAppointments = (patientId: string, fromDate?: Date) => {
  return useAppointmentsBase({
    queryKey: ['appointments', 'patient', patientId, fromDate ? fromDate.toISOString() : ''],
    fetchFn: () => getAppointmentsByPatient(patientId, fromDate),
  });
};
