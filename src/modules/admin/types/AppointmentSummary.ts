import type { AppointmentStatus } from "@/modules/appointments/types/AppointmentStatus";

export interface AppointmentSummary {
  id: number;
  patientName: string;
  doctorName: string;
  date: string;
  status: AppointmentStatus;
}