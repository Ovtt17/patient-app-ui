import type { AppointmentSummary } from "./AppointmentSummary";
import type { DoctorSummary } from "./DoctorSummary";
import type { SpecialtyDistribution } from "./SpecialtyDistribution";

export interface AdminDashboardResponse {
  totalDoctors: number;
  totalPatients: number;
  totalAppointments: number;
  totalCompletedAppointments: number;
  totalCancelledAppointments: number;
  monthlyAppointments: number[];
  topActiveDoctors: DoctorSummary[];
  recentAppointments: AppointmentSummary[];
  specialtiesDistribution: SpecialtyDistribution[];
}