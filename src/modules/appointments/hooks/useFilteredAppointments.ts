import { getAppointmentsFiltered } from "../api/appointment.api"
import type { AppointmentFilter } from "../types/AppointmentFilter"
import { useAppointmentsBase } from "./useAppointmentsBase"

export const useFilteredAppointments = (filter: AppointmentFilter) => {
  return useAppointmentsBase({
    queryKey: ['appointments', 'filter', JSON.stringify(filter)],
    fetchFn: () => getAppointmentsFiltered(filter),
  })
}