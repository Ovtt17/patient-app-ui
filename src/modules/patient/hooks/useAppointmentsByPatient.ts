import { useQuery } from "@tanstack/react-query";
import { getAppointmentsByPatient } from "../api/patient.api";
import type { AppointmentRes } from "@/shared/types/appointment.type";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useAppointmentsByPatient = (patientId: string, fromDate?: string) => {
  return useQuery<AppointmentRes[], ProcessedError>({
    queryKey: ["appointments", "patient", patientId, fromDate],
    queryFn: () => getAppointmentsByPatient(patientId, fromDate),
    enabled: Boolean(patientId),     
    staleTime: 1000 * 60,            
  });
};
