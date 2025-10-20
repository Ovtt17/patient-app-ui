import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/shared/components/Loader/Loader";
import { RoutesAdmin } from "@/modules/admin/routes/RoutesAdmin.ts";
import Specialty from "@/modules/doctors/pages/Specialty";
import SpecialtyCreate from "@/modules/doctors/pages/SpecialtyCreate";

const DoctorCreate = lazy(() => import("@/modules/doctors/pages/DoctorCreate"));
const DoctorListPage = lazy(() => import("@/modules/doctors/pages/DoctorListPage"));
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
  },
  {
    path: RoutesAdmin.ADMIN_SPECIALTIES,
    element: (
      <Suspense fallback={<Loader />}>
        <Specialty />
      </Suspense>
    )
  },
  {
    path: RoutesAdmin.ADMIN_SPECIALTIES_CREATE,
    element: (
      <Suspense fallback={<Loader />}>
        <SpecialtyCreate />
      </Suspense>
    )
  }
];

export default adminRoutes;
