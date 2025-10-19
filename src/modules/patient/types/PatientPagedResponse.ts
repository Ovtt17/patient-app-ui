import type { PatientResponse } from "./PatientResponse";

export interface PatientPagedResponse {
  content: PatientResponse[];
  page: number;
  totalPages: number;
  totalElements: number;
}