import type { Gender } from "@/shared/types/Gender";
import type { Role } from "./role.types";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  profilePictureUrl: string | null;
  phone: string;
  bio: string | null;
  roles: Role[];
  gender: Gender;
  mustChangePassword: boolean;
}