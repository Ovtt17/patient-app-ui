import { useQuery } from "@tanstack/react-query";
import { getAllSpecialties } from "../api/doct.api"; 
import type { SpecialtyRes } from "../types/specialty.type";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useSpecialties = () => {
  return useQuery<SpecialtyRes[], ProcessedError>({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
    staleTime: 1000 * 60, 
  });
};
