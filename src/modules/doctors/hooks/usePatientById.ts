import { useQuery } from "@tanstack/react-query";
import { getPatientById } from "../api/doct.api";
import type { Patient } from "@/shared/types/patient.types";


export const usePatientById = (id: string) => {
  return useQuery<Patient, Error>({
    queryKey: ["patient", id], 
    queryFn: () => getPatientById(id),
    enabled: !!id,            
    staleTime: 1000 * 60,    
  });
};
