import OAuthSuccess from "@/modules/auth/components/oauth/OAuthSuccess";
import Loader from "@/shared/components/Loader/Loader";
import { Routes as ROUTES } from "@/shared/constants/routes";
import { useAuth } from "@/shared/context/auth/useAuth";
import { useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoute";
import { Role } from "@/modules/auth/types/role.types";

const AppRoutes = () => {
  const { isAuthenticated, loading, isUserAdmin } = useAuth();

  const authenticatedRoutes = useMemo(() => [
    { path: "*", element: <Navigate to={ROUTES.HOME} /> },
    { path: ROUTES.LOGIN, element: <Navigate to={ROUTES.HOME} /> },
    { path: ROUTES.HOME, element: <Navigate to={ROUTES.HOME} /> },
    { path: ROUTES.ACTIVATE_ACCOUNT, element: <Navigate to={ROUTES.HOME} /> },
  ], [isAuthenticated, isUserAdmin]);

  const authenticatedRoutesComponents = useMemo(() => authenticatedRoutes.map((route, index) => (
    <Route key={index} element={route.element} path={route.path} />
  )), [authenticatedRoutes]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      {/* If user is not authenticated redirect to login */}
      {!isAuthenticated ? (
        <>
          {/* <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.HOME} element={<Login />} /> */}
        </>
      ) : (
        <>
          {/* If user is authenticated check roles if user is doctor*/}
          <Route element={<ProtectedRoutes allowedRoles={[Role.DOCTOR]} redirectPath={ROUTES.HOME} />}>
            {/* Posible routes for doctor */}
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={[]} redirectPath={ROUTES.LOGIN} />}>
            {authenticatedRoutesComponents}
          </Route>
        </>
      )}
    </Routes>
  )
}

export default AppRoutes;