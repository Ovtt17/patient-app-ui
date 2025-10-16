import type { Role } from "@/modules/admin/types/role.types";
import type { Gender } from "@/shared/types/gender.types";

export interface Patient {
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
  birthDate: string;
  notes: string;
  roles: Role[];
}
