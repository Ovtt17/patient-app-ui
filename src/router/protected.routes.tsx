import appointmentRoutes from "@/modules/appointments/routes/appointment.routes";
import Profile from "@/modules/auth/components/profile/Profile";
import Loader from "@/shared/components/Loader/Loader";
import { Routes } from "@/shared/constants/routes";
import { Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const protectedRoutes: RouteObject[] = [
  ...appointmentRoutes,
  {
    path: Routes.PROFILE,
    element: (
      <Suspense fallback={<Loader />}>
        <Profile />
      </Suspense>
    )
  }
];

export default protectedRoutes;
