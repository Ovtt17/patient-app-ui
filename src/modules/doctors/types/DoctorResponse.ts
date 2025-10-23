import type { Gender } from "@/shared/types/Gender";
import type { SpecialtyResponse } from "./SpecialtyResponse";

export interface DoctorResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  profilePictureUrl: string;
  medicalLicense: string;
  officeNumber: string;
  userId: string;
  zoneId: string;
  specialties: SpecialtyResponse[];
}

