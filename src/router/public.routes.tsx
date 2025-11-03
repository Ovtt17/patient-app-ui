import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/shared/components/Loader/Loader.tsx";
import { Routes } from "@/shared/constants/routes.ts";

const Home = lazy(() => import('@/modules/home/pages/Home'));
const Specialties = lazy(() => import('@/modules/home/pages/Specialties'));
const DiagnosticCenters = lazy(() => import('@/modules/home/pages/Diagnosticcenters'));
const HospitalServices = lazy(() => import('@/modules/home/pages/HospitalServices'));

const publicRoutes: RouteObject[] = [
  {
    path: Routes.HOME,
    element: (
      <Suspense fallback={<Loader />}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: Routes.SPECIALTIES,
    element: (
      <Suspense fallback={<Loader />}>
        <Specialties />
      </Suspense>
    ),
  },
  {
    path: Routes.DIAGNOSTIC_CENTERS,
    element: (
      <Suspense fallback={<Loader />}>
        <DiagnosticCenters />
      </Suspense>
    ),
  },
  {
    path: Routes.HOSPITAL_SERVICES,
    element: (
      <Suspense fallback={<Loader />}>
        <HospitalServices />
      </Suspense>
    ),
  },
];

export default publicRoutes;