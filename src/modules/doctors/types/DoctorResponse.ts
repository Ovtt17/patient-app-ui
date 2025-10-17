import type { Gender } from "@/shared/types/gender.types";

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
  specialties: string[];
}

