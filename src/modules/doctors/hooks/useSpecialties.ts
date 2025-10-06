import { useQuery } from "@tanstack/react-query";
import { getAllSpecialties } from "../api/doct.api"; 
import type { SpecialtyRes } from "../types/specialty.type";

export const useSpecialties = () => {
  return useQuery<SpecialtyRes[], Error>({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
    staleTime: 1000 * 60, 
  });
};
