import { useQuery } from "@tanstack/react-query";
import { getDoctorAvailabilityByDoctorId } from "../api/doct.api"; 
import type { DoctorAvailabilityRes } from "../types/doctorAvailability.type";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useDoctorAvailabilityByDoctorId = (doctorId: string) => {
  return useQuery<DoctorAvailabilityRes, ProcessedError>({
    queryKey: ["doctor-availability", doctorId],
    queryFn: () => getDoctorAvailabilityByDoctorId(doctorId),
    enabled: !!doctorId,       
    staleTime: 1000 * 60,      
  });
};
