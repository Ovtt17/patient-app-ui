export interface DoctorAvailabilityResponse {
  doctorId: string;
  zoneId: string;
  availability: DayAvailability[];
}

export interface DayAvailability {
  date: string; // Ej: "2025-10-20"
  dayOfWeek: string; // Ej: "MONDAY"
  intervals: TimeInterval[]; // horas disponibles
  unavailable: TimeInterval[]; // horas ocupadas
}

export interface TimeInterval {
  start: string; // ISO string (Instant)
  end: string;   // ISO string (Instant)
}