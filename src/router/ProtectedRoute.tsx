import type { FC } from "react";
import { useAuth } from "@/shared/context/auth/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Routes } from "@/shared/constants/routes";
import { Role } from '../modules/auth/types/role.types';

interface ProtectedRoutesProps {
  allowedRoles?: Role[];
  redirectPath: string;
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({ allowedRoles = [], redirectPath }) => {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={Routes.LOGIN} state={{ location }} />;
  }

  if (allowedRoles.length && !allowedRoles.some(role => user?.roles.includes(role))) {
    return <Navigate to={redirectPath} state={{ location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoutes;