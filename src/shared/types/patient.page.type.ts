import type { Patient } from "@/modules/patient/types/patient.types";


export interface PatientPagedRes {
  patients: Patient [];
  page: number;
  totalPages: number;
  totalElements: number;
}