import type { AppointmentStatus } from "./AppointmentStatus";

export interface AppointmentResponse {
  id: number;
  doctorId: string;
  doctorName: string;
  patientId: string;
  patientName: string;
  appointmentStart: string;
  appointmentEnd: string;
  plannedDurationMinutes: number;
  reason: string;
  notes: string;
  status: AppointmentStatus;
  createdDate: string;
  lastModifiedDate: string;
}
