import type {RouteObject} from "react-router-dom";
import {lazy, Suspense} from "react";
import PublicRoute from "@/router/PublicRoute.tsx";
import Loader from "@/shared/components/Loader/Loader.tsx";
import {Routes} from "@/shared/constants/routes.ts";

const Home = lazy(() => import('@/modules/home/pages/Home'));
const Specialties = lazy(() => import('@/modules/home/pages/Specialties'));
const DiagnosticCenters = lazy(() => import('@/modules/home/pages/Diagnosticcenters'));
const HospitalServices = lazy(() => import('@/modules/home/pages/HospitalServices'));

const publicRoutes: RouteObject[] = [
  {
    path: Routes.HOME,
    element: (
        <PublicRoute>
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        </PublicRoute>
    ),
  },
  {
    path: Routes.SPECIALTIES,
    element: (
        <PublicRoute>
          <Suspense fallback={<Loader />}>
            <Specialties />
          </Suspense>
        </PublicRoute>
    ),
  },
  {
    path: Routes.DIAGNOSTIC_CENTERS,
    element: (
        <PublicRoute>
          <Suspense fallback={<Loader />}>
            <DiagnosticCenters />
          </Suspense>
        </PublicRoute>
    ),
  },
  {
    path: Routes.HOSPITAL_SERVICES,
    element: (
        <PublicRoute>
          <Suspense fallback={<Loader />}>
            <HospitalServices />
          </Suspense>
        </PublicRoute>
    ),
  },
];

export default publicRoutes;