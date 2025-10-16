import { useQuery } from "@tanstack/react-query";
import { getPatientById } from "../api/doct.api";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { Patient } from "@/modules/patient/types/patient.types";


export const usePatientById = (id: string) => {
  return useQuery<Patient, ProcessedError>({
    queryKey: ["patient", id], 
    queryFn: () => getPatientById(id),
    enabled: !!id,            
    staleTime: 1000 * 60,    
  });
};
