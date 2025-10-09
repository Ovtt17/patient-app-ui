import { useQuery } from "@tanstack/react-query";
import { getDoctorAvailabilityByDoctorId } from "../api/doct.api"; 
import type { DoctorAvailabilityRes } from "../types/doctorAvailability.type";

export const useDoctorAvailabilityByDoctorId = (doctorId: string) => {
  return useQuery<DoctorAvailabilityRes, Error>({
    queryKey: ["doctor-availability", doctorId],
    queryFn: () => getDoctorAvailabilityByDoctorId(doctorId),
    enabled: !!doctorId,       
    staleTime: 1000 * 60,      
  });
};
