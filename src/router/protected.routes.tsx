import appointmentRoutes from "@/modules/appointments/routes/appointment.routes";
import UserProfiles from "@/modules/auth/pages/UserProfiles";
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
        <UserProfiles />
      </Suspense>
    )
  }
];

export default protectedRoutes;
