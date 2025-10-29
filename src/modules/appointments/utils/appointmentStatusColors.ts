import type { AppointmentStatus } from "../types/AppointmentStatus";

export const appointmentStatusColors: Record<AppointmentStatus, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-700 border-yellow-200",
  CONFIRMADA: "bg-green-100 text-green-700 border-green-200",
  CANCELADA: "bg-red-100 text-red-700 border-red-200",
  COMPLETADA: "bg-gray-100 text-gray-700 border-gray-200",
  AUSENTE: "bg-orange-100 text-orange-700 border-orange-200",
};