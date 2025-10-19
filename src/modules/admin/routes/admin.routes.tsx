import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/shared/components/Loader/Loader";
import { RoutesAdmin } from "@/modules/admin/routes/RoutesAdmin.ts";
import Patient from "@/modules/patient/pages/Patient";

const DoctorCreate = lazy(() => import("../pages/DoctorCreate"));
const DoctorListPage = lazy(() => import("../pages/DoctorListPage"));

const adminRoutes: RouteObject[] = [
  {
    path: RoutesAdmin.ADMIN_DOCTORES_CREATE,
    element: (
      <Suspense fallback={<Loader />}>
        <DoctorCreate />
      </Suspense>
    ),
  },
  {
    path: RoutesAdmin.ADMIN_DOCTORS,
    element: (
      <Suspense fallback={<Loader />}>
        <DoctorListPage />
      </Suspense>
    ),
  },
  {
    path: RoutesAdmin.ADMIN_PATIENTS,
    element: (
      <Suspense fallback={<Loader />}>
        <Patient />
      </Suspense>
    )
  }
];

export default adminRoutes;
