import { Routes } from "@/shared/constants/routes";
import type { RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/shared/components/Loader/Loader";
import ChangePassword from "../pages/ChangePassword";

const Login = lazy(() => import("../pages/Login"));

const authRoutes: RouteObject[] = [
  {
    path: Routes.LOGIN,
    element: (
      <Suspense fallback={<Loader />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: Routes.CHANGE_PASSWORD,
    element: (
      <Suspense fallback={<Loader />}>
        <ChangePassword />
      </Suspense>
    )
  }
];

export default authRoutes;