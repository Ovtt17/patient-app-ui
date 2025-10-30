import Loader from "@/shared/components/Loader/Loader";
import { Routes } from "@/shared/constants/routes";
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { AppointmentFiltersProvider } from "../context/AppointmentFiltersContext";

const Appointment = lazy(() => import("../pages/Appointment"));
const AppointmentCreate = lazy(() => import("../pages/AppointmentCreate"));

const appointmentRoutes: RouteObject[] = [
  {
    path: Routes.APPOINTMENTS,
    element: (
      <Suspense fallback={<Loader />}>
        <AppointmentFiltersProvider>
          <Appointment />
        </AppointmentFiltersProvider>
      </Suspense>
    ),
  },
  {
    path: Routes.APPOINTMENTS_CREATE,
    element: (
      <Suspense fallback={<Loader />}>
        <AppointmentCreate />
      </Suspense>
    ),
  }
];

export default appointmentRoutes;
