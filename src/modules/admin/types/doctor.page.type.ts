import type { Doctor } from "@/modules/doctors/types/doctor.types";


export interface DoctorPagedRes {
  doctors: Doctor [];
  page: number;
  totalPages: number;
  totalElements: number;
}