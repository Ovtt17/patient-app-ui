import { useQuery } from "@tanstack/react-query";
import { getSpecialtyById } from "../api/doct.api"; 
import type { SpecialtyRes } from "../types/specialty.type";

export const useSpecialtyById = (id: number) => {
  return useQuery<SpecialtyRes, Error>({
    queryKey: ["specialty", id],
    queryFn: () => getSpecialtyById(id),
    enabled: !!id,               
    staleTime: 1000 * 60,        
  });
};
