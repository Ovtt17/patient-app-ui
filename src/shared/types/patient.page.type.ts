import type { Patient } from "./patient.types";

export interface PatientPagedRes {
  patients: Patient [];
  page: number;
  totalPages: number;
  totalElements: number;
}