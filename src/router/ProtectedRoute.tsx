import type {FC, ReactNode} from "react";
import {useAuth} from "@/shared/context/auth/useAuth";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import {Routes} from "@/shared/constants/routes";
import {Role} from '../modules/auth/types/role.types';


interface ProtectedRoutesProps {
  allowedRoles?: Role[];
  redirectPath?: string;
  children?: ReactNode;
}

const ProtectedRoutes: FC<ProtectedRoutesProps> = ({
  allowedRoles = [],
  redirectPath = Routes.LOGIN
}) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to={Routes.LOGIN} state={{from: location}} replace />;
  }

  const hasRoleAccess =
      allowedRoles.length === 0 ||
      allowedRoles.some((role) => user?.roles.includes(role));

  if (!hasRoleAccess) {
    return <Navigate to={redirectPath} state={{from: location}} replace />;
  }

  return <Outlet/>;
}

export default ProtectedRoutes;