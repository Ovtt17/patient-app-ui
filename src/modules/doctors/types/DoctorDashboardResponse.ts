import type { AppointmentSummary } from "@/modules/admin/types/AppointmentSummary";

export interface DoctorDashboardResponse {
  totalPatients: number;
  totalAppointments: number;
  totalCompletedAppointments: number;
  totalCancelledAppointments: number;
  monthlyAppointments: number[];
  recentAppointments: AppointmentSummary[];
}