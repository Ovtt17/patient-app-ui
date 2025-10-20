import type { Gender } from "@/shared/types/Gender";
import type { Role } from "./role.types";

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
  role: Role;
};