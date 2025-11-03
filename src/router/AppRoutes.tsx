import Loader from "@/shared/components/Loader/Loader";
import { Routes as ROUTES } from "@/shared/constants/routes";
import { useAuth } from "@/shared/context/auth/useAuth";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoute";
import authRoutes from "@/modules/auth/routes/auth.routes";
import protectedRoutes from "./protected.routes";
import publicRoutes from "@/router/public.routes.tsx";
import { Role } from "@/modules/auth/types/role.types";
import adminRoutes from "@/modules/admin/routes/admin.routes.tsx";
import doctorRoutes from "@/modules/doctors/routes/doctor.routes";
import OAuthSuccess from "@/modules/auth/components/oauth/OAuthSuccess";
import { RoutesAdmin } from "@/modules/admin/routes/RoutesAdmin";
import RedirectToDashboard from "./RedirectToDashboard";
import { AdminDashboard } from "@/modules/admin/pages/AdminDashboard";

const AppRoutes = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader />;

  return (
    <Routes>
      {/* OAuth callback */}
      <Route path="/oauth-success" element={<OAuthSuccess />} />
      {!isAuthenticated && (
        <>
          {/* Rutas públicas */}
          {publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {/* Rutas de autenticación */}
          {authRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </>
      )}

      {/* Rutas protegidas para cualquier usuario autenticado */}
      <Route element={<ProtectedRoutes allowedRoles={[]} redirectPath={ROUTES.LOGIN} />}>
        {protectedRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Route>

      {/* Rutas protegidas para ADMIN */}
      <Route element={<ProtectedRoutes allowedRoles={[Role.ADMIN]} redirectPath={ROUTES.LOGIN} />}>
        <>
          <Route path={RoutesAdmin.ADMIN_DASHBOARD} element={<AdminDashboard />} />
          {adminRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </>
      </Route>

      {/* Rutas protegidas para DOCTOR */}
      <Route element={<ProtectedRoutes allowedRoles={[Role.DOCTOR]} redirectPath={ROUTES.LOGIN} />}>
        <>
          {doctorRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </>
      </Route>

      {/* Ruta raíz: redirige según rol */}
      <Route path="/" element={<RedirectToDashboard />} />

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;