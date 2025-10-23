import { Navigate, type RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/shared/components/Loader/Loader";
import { RoutesAdmin } from "@/modules/admin/routes/RoutesAdmin.ts";
import Specialty from "@/modules/doctors/pages/Specialty";
import SpecialtyCreate from "@/modules/doctors/pages/SpecialtyCreate";
import { ReportsAdmin } from "@/modules/reports/pages/ReportsAdmin";
import { AdminDashboard } from "../pages/Dashboard";

const Doctor = lazy(() => import("@/modules/doctors/pages/Doctor"));
const DoctorCreate = lazy(() => import("@/modules/doctors/pages/DoctorCreate"));
const Patient = lazy(() => import("@/modules/patient/pages/Patient"));
const PatientCreate = lazy(() => import("@/modules/patient/pages/PatientCreate"));

const adminRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to={RoutesAdmin.ADMIN_DASHBOARD} replace />,
  },
  {
    path: RoutesAdmin.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
  },
  {
    path: '/admin',
    element: <AdminDashboard />,
  },
  {
    path: RoutesAdmin.ADMIN_DOCTORS,
    element: (
      <Suspense fallback={<Loader />}>
        <Doctor />
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
  },
  {
    path: RoutesAdmin.ADMIN_REPORTS,
    element: (
      <ReportsAdmin />
    )
  }
];

export default adminRoutes;
