export interface DoctorAvailabilityRes {
  doctorId: string;
  zoneId: string;
  availability: DayAvailability[];
}

export interface DayAvailability {
  date: string; 
  dayOfWeek: string;
  intervals: Interval[];
  unavailable: Interval[];
}

export interface Interval {
  start: string; 
  end: string;
}