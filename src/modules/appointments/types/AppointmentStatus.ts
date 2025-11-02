export const AppointmentStatus = {
  PENDIENTE: "PENDIENTE",
  CONFIRMADA: "CONFIRMADA",
  CANCELADA: "CANCELADA",
  COMPLETADA: "COMPLETADA",
  AUSENTE: "AUSENTE",
} as const;

export type AppointmentStatus = typeof AppointmentStatus[keyof typeof AppointmentStatus];

export const APPOINTMENT_STATUSES: AppointmentStatus[] = [
  AppointmentStatus.PENDIENTE,
  AppointmentStatus.CONFIRMADA,
  AppointmentStatus.CANCELADA,
  AppointmentStatus.COMPLETADA,
  AppointmentStatus.AUSENTE,
];