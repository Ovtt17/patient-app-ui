import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/shared/components/Loader/Loader";
import { RoutesAdmin } from "@/modules/admin/routes/RoutesAdmin.ts";

const DoctorCreate = lazy(() => import("../pages/DoctorCreate"));
const DoctorListPage = lazy(() => import("../pages/DoctorListPage"));
const Patient = lazy(() => import("@/modules/patient/pages/Patient"));
const PatientCreate = lazy(() => import("@/modules/patient/pages/PatientCreate"));

const adminRoutes: RouteObject[] = [
  {
    path: RoutesAdmin.ADMIN_DOCTORS,
    element: (
      <Suspense fallback={<Loader />}>
        <DoctorListPage />
      </Suspense>
    ),
  },
  {
    path: RoutesAdmin.ADMIN_DOCTORS_CREATE,
    element: (
      <Suspense fallback={<Loader />}>
        <DoctorCreate />
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
  },
  {
    path: RoutesAdmin.ADMIN_PATIENTS_CREATE,
    element: (
      <Suspense fallback={<Loader />}>
        <PatientCreate />
      </Suspense>
    )
  }
];

export default adminRoutes;
