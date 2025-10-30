import { defaultDateRange } from "@/shared/utils/defaultDateRange";
import type { AppointmentFilter } from "../types/AppointmentFilter";

export const defaultAppointmentFilters: AppointmentFilter = {
  doctorId: undefined,
  patientId: undefined,
  status: undefined,
  startDate: defaultDateRange.from,
  endDate: defaultDateRange.to,
}