import { Routes } from "@/shared/constants/routes";
import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import PublicRoute from "@/router/PublicRoute";
import Loader from "@/shared/components/Loader/Loader";

const Login = lazy(() => import("../pages/Login"));

const authRoutes: RouteObject[] = [
  {
    path: Routes.LOGIN,
    element: (
      <PublicRoute>
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      </PublicRoute>
    ),
  },
];

export default authRoutes;