import type { User } from "@/modules/auth/types/user.types";

export interface AuthContextType {
  isAuthenticated: boolean;
  isUserSuperAdmin: boolean;
  isUserAdmin: boolean;
  isUserDoctor: boolean;
  isUserPatient: boolean;
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
  updateUser: (userUpdated: User) => void;
}