import { useQuery } from "@tanstack/react-query";
import { getAppointmentById } from "../api/doct.api"; 
import type { AppointmentRes } from "@/shared/types/appointment.type";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useAppointmentById = (id: number) => {
  return useQuery<AppointmentRes, ProcessedError>({
    queryKey: ["appointment", id],
    queryFn: () => getAppointmentById(id),
    enabled: Number.isFinite(id) && id > 0, 
    staleTime: 1000 * 60, 
  });
};
