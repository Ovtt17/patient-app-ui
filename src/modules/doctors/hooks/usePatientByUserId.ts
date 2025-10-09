import { useQuery } from "@tanstack/react-query";
import { getPatientByUserId } from "../api/doct.api";
import type { Patient } from "@/shared/types/patient.types";


export const usePatientByUserId = (userId: string) => {
  return useQuery<Patient, Error>({
    queryKey: ["patientByUser", userId],  
    queryFn: () => getPatientByUserId(userId),
    enabled: !!userId,                     
    staleTime: 1000 * 60,                
  });
};
