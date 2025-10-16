import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/context/auth/useAuth";
import { Routes as ROUTES } from "@/shared/constants/routes";
import type {ReactNode} from "react";

interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to={ROUTES.HOME} /> : <>{children}</>;
};

export default PublicRoute;
