import type { Role } from "./role.types";

export interface User {
  id: string;
  username: string;
  email: string;
  profilePictureUrl: string | null;
  phone: string;
  roles: Role[];
}