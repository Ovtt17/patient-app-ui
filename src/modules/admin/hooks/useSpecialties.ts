import { useQuery } from "@tanstack/react-query";
import type { SpecialtyRes } from "../../doctors/types/specialty.type";
import { getAllSpecialties } from "../api/admin.api";

export const useSpecialties = () => {
  return useQuery<SpecialtyRes[], Error>({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
    staleTime: 1000 * 60,
  });
};
