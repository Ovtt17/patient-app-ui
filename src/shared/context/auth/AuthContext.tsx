import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType } from "./types";
import { useNavigate } from 'react-router-dom';
import type { User } from "@/modules/auth/types/user.types";
import { Routes } from "@/shared/constants/routes";
import { getCurrentUserInfo, logoutUser } from "@/modules/auth/api/auth.api";
import { Role } from "@/modules/auth/types/role.types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (user: User, redirectTo?: string) => {
    setUser(user);
    setIsAuthenticated(true);
    navigate(redirectTo || Routes.HOME);
  };

  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await logoutUser();
    navigate(Routes.HOME);
  };

  const isUserSuperAdmin: boolean = user ? user.roles.includes(Role.SUPER_ADMIN) : false;
  const isUserAdmin: boolean = user ? user.roles.includes(Role.ADMIN) : false;
  const isUserDoctor: boolean = user ? user.roles.includes(Role.DOCTOR) : false;
  const isUserPatient: boolean = user ? user.roles.includes(Role.PATIENT) : true;

  const updateUser = (userUpdated: User) => {
    setUser(prevUser => prevUser && String(prevUser.id) === String(userUpdated.id)
      ? { ...prevUser, ...userUpdated }
      : prevUser
    );
  };

  useEffect(() => {
    const getUserLoggedIn = async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUserInfo();
        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch {
        await logout();
      } finally {
        setLoading(false);
      }
    };
    getUserLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      isUserSuperAdmin,
      isUserAdmin,
      isUserDoctor,
      isUserPatient,
      user,
      loading,
      login,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};