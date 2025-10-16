import { useQuery } from "@tanstack/react-query";
import { getPatientByUserId } from "../api/doct.api";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { Patient } from "@/modules/patient/types/patient.types";


export const usePatientByUserId = (userId: string) => {
  return useQuery<Patient, ProcessedError>({
    queryKey: ["patientByUser", userId],  
    queryFn: () => getPatientByUserId(userId),
    enabled: !!userId,                     
    staleTime: 1000 * 60,                
  });
};
