import { useAllEntities } from "@/shared/hooks/useAllEntities";
import { getAllSpecialties } from "../api/specialty.api";
import type { SpecialtyResponse } from "../types/SpecialtyResponse";

export const useAllSpecialties = () => {
  return useAllEntities<SpecialtyResponse>('specialties', getAllSpecialties);
}