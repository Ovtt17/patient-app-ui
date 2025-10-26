export interface AppointmentRequest {
  doctorId: string;
  userId: string;
  appointmentStart: Date | null;
  reason: string | null;
}

export type AppointmentStatus =
  | "PENDIENTE"
  | "CONFIRMADA"
  | "CANCELADA"
  | "COMPLETADA"
  | "AUSENTE";