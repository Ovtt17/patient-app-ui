import type { Role } from "../../modules/admin/types/role.types";
import type { Gender } from "@/shared/types/gender.types";


export interface Doctor {
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
  roles: Role[];
}

