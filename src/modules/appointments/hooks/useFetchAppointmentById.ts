import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAppointmentById } from "../api/appointment.api";
import type { AppointmentResponse } from "../types/AppointmentResponse";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useFetchAppointmentById = () => {
  const { id: appointmentId } = useParams<{ id: string }>();

  const query = useQuery<AppointmentResponse>({
    queryKey: ["appointment", appointmentId],
    queryFn: () => getAppointmentById(Number(appointmentId)),
    enabled: !!appointmentId,
  });

  return {
    ...query,
    appointment: query.data,
    errors: query.error as ProcessedError | null,
    isLoading: query.isLoading,
  };
}