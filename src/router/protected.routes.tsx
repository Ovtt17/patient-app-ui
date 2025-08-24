import { Routes as ROUTES } from "@/shared/constants/routes";
import Home from '@/modules/home/pages/Home';
import type { RouteObject } from "react-router-dom";

const protectedRoutes: RouteObject[] = [
  { path: ROUTES.HOME, element: <Home /> },
];

export default protectedRoutes;
