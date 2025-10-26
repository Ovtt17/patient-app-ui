import { useAllEntities } from "@/shared/hooks/useAllEntities";
import { getAllDoctors } from "../api/doctor.api";
import type { DoctorResponse } from "../types/DoctorResponse";

export const useAllDoctors = () => {
  return useAllEntities<DoctorResponse>('doctors', getAllDoctors);
}