import Loader from "@/shared/components/Loader/Loader";
import { Routes } from "@/shared/constants/routes";
import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";
import AppointmentCreate from "../pages/AppointmentCreate";
import { Appointment } from "../pages/Appointment";

const appointmentRoutes: RouteObject[] = [
  {
    path: Routes.APPOINTMENTS,
    element: (
      <Suspense fallback={<Loader />}>
        <Appointment />
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
