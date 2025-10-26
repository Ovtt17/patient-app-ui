import Loader from "@/shared/components/Loader/Loader";
import { Routes } from "@/shared/constants/routes";
import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import { AppointmentsPage } from "../pages/AppointmentsPage";
import AppointmentCreate from "../pages/AppointmentCreate";

const appointmentRoutes: RouteObject[] = [
  {
    path: Routes.APPOINTMENTS,
    element: (
      <Suspense fallback={<Loader />}>
        <AppointmentsPage />
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
