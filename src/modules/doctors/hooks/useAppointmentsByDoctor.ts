import { useQuery } from "@tanstack/react-query";
import { getAppointmentsByDoctor } from "../api/doct.api"; 
import type { AppointmentRes } from "@/shared/types/appointment.type";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useAppointmentsByDoctor = (doctorId: string, fromDate?: string) => {
  return useQuery<AppointmentRes[], ProcessedError>({
    queryKey: ["appointments", "doctor", doctorId, fromDate],
    queryFn: () => getAppointmentsByDoctor(doctorId, fromDate),
    enabled: Boolean(doctorId), 
    staleTime: 1000 * 60, 
  });
};
