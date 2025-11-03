import type { Role } from "@/modules/auth/types/role.types";
import type { Gender } from "@/shared/types/Gender";

export interface PatientResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  profilePictureUrl: string;
  userId: string;
  weight: number;
  height: number;
  birthDate: Date;
  notes: string;
  roles: Role[];
}