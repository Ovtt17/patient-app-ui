import type { SidebarMenuItem } from "../types/sidebar-menu-item";
import { Routes } from "./routes";
import {
  CalendarDaysIcon,
  PlusIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";

const sharedMenuItems: SidebarMenuItem[] = [
  {
    title: "Citas Médicas",
    icon: <CalendarDaysIcon />,
    subItems: [
      {
        title: "Todas las citas",
        href: Routes.APPOINTMENTS,
        icon: <ClockIcon />,
      },
      {
        title: "Agendar cita",
        href: Routes.APPOINTMENTS_CREATE,
        icon: <PlusIcon />,
      },
    ],
  },
  {
    title: "Registros Médicos",
    icon: <CalendarDaysIcon />,
    href: Routes.MEDICAL_RECORDS,
  }
];

export default sharedMenuItems;
