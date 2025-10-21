import appointmentRoutes from "@/modules/appointments/routes/appointment.routes";
import type { RouteObject } from "react-router-dom";

const protectedRoutes: RouteObject[] = [
  ...appointmentRoutes
];

export default protectedRoutes;
