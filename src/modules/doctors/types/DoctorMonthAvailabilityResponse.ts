
export interface DoctorMonthAvailabilityResponse {
  doctorId: string;
  year: number;
  month: number;
  availability: DayAvailability[];
}

export interface DayAvailability {
  date: string; // ISO 8601 format (e.g., '2025-10-25')
  fullyBooked: boolean;
}
