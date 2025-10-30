import { useEffect, useState } from "react";
import { getAppointmentsFiltered } from "../api/appointment.api"
import { useAppointmentsBase } from "./useAppointmentsBase"
import { defaultDateRange } from "@/shared/utils/defaultDateRange";
import { useAuth } from "@/shared/context/auth/useAuth";
import { useAppointmentFilters } from "../context/AppointmentFiltersContext";
import type { DateRange } from "@/shared/types/DateRange";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import dayjs from "dayjs";

export const useFilteredAppointments = () => {
  const { user, isUserAdmin, isUserDoctor, isUserPatient } = useAuth();
  const { filters, updateFilters } = useAppointmentFilters();

  const [date, setDate] = useState<DateRange>(defaultDateRange);

  const adjustedFilters = { ...filters };
  if (!isUserAdmin) {
    if (isUserDoctor && user?.doctorId) {
      adjustedFilters.doctorId = user.doctorId;
    } else if (isUserPatient && user?.patientId) {
      adjustedFilters.patientId = user.patientId;
    }
  }

  useEffect(() => {
    if (!isUserAdmin) {
      if (isUserDoctor) {
        updateFilters({ doctorId: user?.doctorId });
      } else if (isUserPatient) {
        updateFilters({ patientId: user?.patientId });
      }
    }
  }, [isUserAdmin, isUserDoctor, isUserPatient, user?.doctorId, user?.patientId]);

  const query = useAppointmentsBase({
    queryKey: ['appointments', 'filter', JSON.stringify(adjustedFilters)],
    fetchFn: () => getAppointmentsFiltered(adjustedFilters),
  });

  const onDateChange = (selectedDate: DateRange) => {
    setDate(selectedDate);
    if (selectedDate.from && selectedDate.to) {
      updateFilters({
        startDate: dayjs(selectedDate.from).startOf("day").toDate(),
        endDate: dayjs(selectedDate.to).endOf("day").toDate(),
      });
    }
  };

  const onCurrentMonth = () => {
    setDate(defaultDateRange);
    updateFilters({
      startDate: dayjs(defaultDateRange.from).startOf("day").toDate(),
      endDate: dayjs(defaultDateRange.to).endOf("day").toDate(),
    });
  };

  return {
    data: query.data || [],
    error: query.error as ProcessedError | null,
    isLoading: query.isLoading,
    date,
    onDateChange,
    onCurrentMonth
  }
}