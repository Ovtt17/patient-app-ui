import { useQuery } from "@tanstack/react-query";
import { getSpecialtyById } from "../api/doct.api"; 
import type { SpecialtyRes } from "../types/specialty.type";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useSpecialtyById = (id: number) => {
  return useQuery<SpecialtyRes, ProcessedError>({
    queryKey: ["specialty", id],
    queryFn: () => getSpecialtyById(id),
    enabled: !!id,               
    staleTime: 1000 * 60,        
  });
};
