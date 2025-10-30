import Loader from "@/shared/components/Loader/Loader";
import { Routes as ROUTES } from "@/shared/constants/routes";
import { useAuth } from "@/shared/context/auth/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoute";
import authRoutes from "@/modules/auth/routes/auth.routes";
import protectedRoutes from "./protected.routes";
import publicRoutes from "@/router/public.routes.tsx";
import { Role } from "@/modules/auth/types/role.types.ts";
import adminRoutes from "@/modules/admin/routes/admin.routes.tsx";
import doctorRoutes from "@/modules/doctors/routes/doctor.routes";
import OAuthSuccess from "@/modules/auth/components/oauth/OAuthSuccess";

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/oauth-success" element={<OAuthSuccess />} />

      {/* Rutas públicas */}
      {publicRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {/* Rutas de autenticación (login, registro, etc.) */}
      {authRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}

      {/* Rutas protegidas para cualquier usuario autenticado */}
      <Route element={<ProtectedRoutes allowedRoles={[]} redirectPath={ROUTES.LOGIN} />}>
        {protectedRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Rutas protegidas por rol: ADMIN */}
      <Route
        element={<ProtectedRoutes allowedRoles={[Role.ADMIN]} redirectPath={ROUTES.LOGIN} />}
      >
        {adminRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Rutas protegidas por rol: DOCTOR */}
      <Route
        element={<ProtectedRoutes allowedRoles={[Role.DOCTOR]} redirectPath={ROUTES.LOGIN} />}
      >
        {doctorRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  );
};

export default AppRoutes;
