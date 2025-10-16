import { RoutesAdmin, Routes } from "@/shared/constants/routes";
import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoutes from "@/router/ProtectedRoute"; 
import Loader from "@/shared/components/Loader/Loader";
import { Role } from "@/modules/auth/types/role.types";


const CreateDoctorPage = lazy(() => import("../pages/CreateDoctorPage"));
const DoctorsPage = lazy(() => import("../pages/DoctorsPage"));


const adminRoutes: RouteObject[] = [
  
  {
    path: RoutesAdmin.ADMIN_DOCTORES_CREATE,
    element: (
      <ProtectedRoutes allowedRoles={[Role.ADMIN]} redirectPath={Routes.HOME}>
        <Suspense fallback={<Loader />}>
          <CreateDoctorPage />
        </Suspense>
      </ProtectedRoutes>
    ),
  },

  {
    path: RoutesAdmin.ADMIN_DOCTORS,
    element: (
     <ProtectedRoutes allowedRoles={[Role.ADMIN]} redirectPath={Routes.HOME}>
        <Suspense fallback={<Loader />}>
          <DoctorsPage />
        </Suspense>
      </ProtectedRoutes>
    ),
  }
  
];

export default adminRoutes;
