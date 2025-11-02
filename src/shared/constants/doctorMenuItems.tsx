import { RoutesDoctor } from "@/modules/doctors/routes/RoutesDoctor";
import type { SidebarMenuItem } from "@/shared/types/sidebar-menu-item";
import {
  UserGroupIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const doctorMenuItems: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    icon: <ClipboardDocumentListIcon />,
    href: RoutesDoctor.DOCTOR_DASHBOARD,
  },
  {
    title: "Gestión de Pacientes",
    icon: <UserGroupIcon />,
    subItems: [
      {
        title: "Pacientes Activos",
        href: RoutesDoctor.DOCTOR_PATIENTS,
        icon: <ClipboardDocumentListIcon />
      },
      {
        title: "Registrar Paciente",
        href: RoutesDoctor.DOCTOR_PATIENTS_CREATE,
        icon: <UserPlusIcon />
      }
    ],
  },
  {
    title: "Horarios",
    icon: <ClipboardDocumentListIcon />,
    subItems: [
      {
        title: "Horario Base",
        href: RoutesDoctor.DOCTOR_SCHEDULES,
        icon: <ClipboardDocumentListIcon />,
      },
      {
        title: "Registrar Horario",
        href: RoutesDoctor.DOCTOR_SCHEDULES_CREATE,
        icon: <PlusIcon />
      }
    ],
  },
];
export default doctorMenuItems;