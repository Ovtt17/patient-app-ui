export interface DoctorDayAvailabilityResponse {
  doctorId: string;
  appointmentDurationMinutes: number;
  date: string;
  intervals: Interval[];
}

export interface Interval {
  start: string; // ISO string (Instant)
  end: string;   // ISO string (Instant)
}