import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/shared/components/Loader/Loader";
import { RoutesAdmin } from "@/modules/admin/routes/RoutesAdmin.ts";

const CreateDoctorPage = lazy(() => import("../pages/CreateDoctorPage"));
const DoctorsPage = lazy(() => import("../pages/DoctorsPage"));

const adminRoutes: RouteObject[] = [
  {
    path: RoutesAdmin.ADMIN_DOCTORES_CREATE,
    element: (
        <Suspense fallback={<Loader />}>
          <CreateDoctorPage />
        </Suspense>
    ),
  },
  {
    path: RoutesAdmin.ADMIN_DOCTORS,
    element: (
        <Suspense fallback={<Loader />}>
          <DoctorsPage />
        </Suspense>
    ),
  }
];

export default adminRoutes;
