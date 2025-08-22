import type { Role } from "./role.types";

export type RegisterRequest = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  role: Role;
};