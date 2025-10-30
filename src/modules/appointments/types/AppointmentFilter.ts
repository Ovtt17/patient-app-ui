import type { AppointmentStatus } from "./AppointmentStatus";

export interface AppointmentFilter {
  doctorId: string | undefined;
  patientId: string | undefined;
  status: AppointmentStatus | undefined;
  startDate: Date | undefined;
  endDate: Date | undefined;
}