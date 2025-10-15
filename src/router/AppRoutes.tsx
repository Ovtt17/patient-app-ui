import OAuthSuccess from "@/modules/auth/components/oauth/OAuthSuccess";
import Loader from "@/shared/components/Loader/Loader";
import { Routes as ROUTES } from "@/shared/constants/routes";
import { useAuth } from "@/shared/context/auth/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoute";
import { Role } from "@/modules/auth/types/role.types";
import authRoutes from "@/modules/auth/routes/auth.routes";
import protectedRoutes from "./protected.routes";
import DefaultLayout from "@/shared/layouts/DefaultLayout";

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>

      <Route path="/oauth-success" element={<OAuthSuccess />} />
 
      {!isAuthenticated &&
        authRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}

      {/* If user is authenticated */}
      {isAuthenticated && (
        <>
          <Route
            element={
              <ProtectedRoutes
                allowedRoles={[]} 
                redirectPath={ROUTES.LOGIN}
              />
            }
          >
            <Route element={<DefaultLayout> {/* envuelve layout aquí */}
              {protectedRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
            </DefaultLayout>} />
          </Route>

          {/*  If user is authenticated check roles if user is doctor*/}
          <Route
            element={
              <ProtectedRoutes
                allowedRoles={[Role.DOCTOR]}
                redirectPath={ROUTES.HOME}
              />
            }
          >
            {/* Posible routes for doctor  */}
          </Route>
        </>
      )} 

      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  );
};

export default AppRoutes;
