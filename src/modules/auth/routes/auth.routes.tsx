import { Routes } from "@/shared/constants/routes";
import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import PublicRoute from "@/router/PublicRoute";
import Loader from "@/shared/components/Loader/Loader";

const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));

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
  {
    path: Routes.SIGNUP,
    element: (
      <PublicRoute>
        <Suspense fallback={<Loader />}>
          <SignUp />
        </Suspense>
      </PublicRoute>
    ),
  }
];

export default authRoutes;
