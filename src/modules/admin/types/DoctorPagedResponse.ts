import type { DoctorResponse } from "@/modules/doctors/types/DoctorResponse";

export interface DoctorPagedResponse {
  content: DoctorResponse[];
  page: number;
  totalPages: number;
  totalElements: number;
}