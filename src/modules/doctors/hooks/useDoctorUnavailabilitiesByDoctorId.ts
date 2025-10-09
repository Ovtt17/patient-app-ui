import { useQuery } from "@tanstack/react-query";
import { getDoctorUnavailabilitiesByDoctorId } from "../api/doct.api"; 
import type { DoctorUnavailabilityRes } from "../types/doctorUnavailability.types";

export const useDoctorUnavailabilitiesByDoctorId = (doctorId: string) => {
  return useQuery<DoctorUnavailabilityRes[], Error>({
    queryKey: ["doctor-unavailabilities", doctorId],
    queryFn: () => getDoctorUnavailabilitiesByDoctorId(doctorId),
    enabled: !!doctorId,
    staleTime: 1000 * 60,
  });
};
