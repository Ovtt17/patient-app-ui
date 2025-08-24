import { Routes } from "@/shared/constants/routes";
import type { RouteObject } from "react-router-dom";
import { Suspense } from "react";
import Login from "../pages/Login";
import PublicRoute from "@/router/PublicRoute";
import Loader from "@/shared/components/Loader/Loader";

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
