import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType } from "./types";
import { useNavigate, useLocation } from "react-router-dom";
import type { User } from "@/modules/auth/types/user.types";
import { Routes } from "@/shared/constants/routes";
import { getCurrentUserInfo, logoutUser } from "@/modules/auth/api/auth.api";
import { Role } from "@/modules/auth/types/role.types";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const publicRoutes = [
    Routes.HOME,
    Routes.LOGIN,
    Routes.SPECIALTIES,
    Routes.DIAGNOSTIC_CENTERS,
    Routes.HOSPITAL_SERVICES,
  ];

  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);

    if (user.roles.includes(Role.ADMIN)) {
      navigate("/admin-dashboard");
    } else if (user.roles.includes(Role.DOCTOR)) {
      navigate("/doctor-dashboard");
    } else if (user.roles.includes(Role.PACIENTE)) {
      navigate("/paciente-dashboard");
    } else {
      navigate(Routes.HOME);
    }
  };


  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await logoutUser();
    navigate(Routes.HOME);
  };


  const isUserAdmin = (): boolean =>  user?  user.roles.includes(Role.ADMIN) : false;
  const isUserDoctor = (): boolean => user ? user.roles.includes(Role.DOCTOR) : false;
  const isUserPatient = (): boolean => user ? user.roles.includes(Role.PACIENTE) : false;


  const updateUser = (userUpdated: User) => {
    setUser(prevUser => prevUser && String(prevUser.id) === String(userUpdated.id)
        ? { ...prevUser, ...userUpdated }
        : prevUser
    );
  };

  
  useEffect(() => {
    const currentPath = location.pathname;

    const isPublic = publicRoutes.some(route =>
      currentPath.startsWith(route)
    );

    if (isPublic) {
      setLoading(false);
      return;
    }

    const getUserLoggedIn = async () => {
      try {
        setLoading(true);
        const currentUser = await getCurrentUserInfo();

        if (currentUser) {
          setUser(currentUser);
          setIsAuthenticated(true);

          // Redirección automática según el rol
          if (currentUser.roles.includes(Role.ADMIN)) {
            navigate("/admin-dashboard");
          } else if (currentUser.roles.includes(Role.DOCTOR)) {
            navigate("/doctor-dashboard");
          } else if (currentUser.roles.includes(Role.PACIENTE)) {
            navigate("/paciente-dashboard");
          } else {
            navigate(Routes.HOME);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    getUserLoggedIn();
  }, [navigate, location.pathname]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isUserAdmin,
        user,
        loading,
        login,
        logout,
        updateUser,
        isUserDoctor,
        isUserPatient,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
