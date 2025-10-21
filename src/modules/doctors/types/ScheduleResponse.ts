export interface ScheduleResponse {
  id: number;
  doctorId: string;
  dayOfWeek: string; // Ej: "MONDAY", "TUESDAY", etc.
  startTime: string; // Ej: "08:00"
  endTime: string;   // Ej: "16:00"
  zoneId: string;    // Ej: "America/Managua"
}