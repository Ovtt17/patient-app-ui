import { useQuery } from "@tanstack/react-query";
import type { SpecialtyRes } from "../../doctors/types/specialty.type";
import { getAllSpecialties } from "../api/admin.api";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useSpecialties = () => {
  return useQuery<SpecialtyRes[], ProcessedError>({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
    staleTime: 1000 * 60,
  });
};
