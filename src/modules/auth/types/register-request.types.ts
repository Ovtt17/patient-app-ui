import type { Role } from "./role.types";

export type RegisterRequest = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: Role;
};