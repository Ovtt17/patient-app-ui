import {
  UserGroupIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon,
  BeakerIcon,
  DocumentPlusIcon,
} from "@heroicons/react/24/outline";
import type { SidebarMenuItem } from "@/shared/types/sidebar-menu-item.ts";
import { RoutesAdmin } from "@/modules/admin/routes/RoutesAdmin.ts";

const adminMenuItems: SidebarMenuItem[] = [
  {
    title: "Dashboard",
    icon: <ClipboardDocumentListIcon />,
    href: RoutesAdmin.ADMIN_DASHBOARD,
  },
  {
    title: "Gestión de Doctores",
    icon: <UserIcon />,
    subItems: [
      {
        title: "Listado de Doctores",
        href: RoutesAdmin.ADMIN_DOCTORS,
        icon: <ClipboardDocumentListIcon />,
      },
      {
        title: "Registrar Doctor",
        href: RoutesAdmin.ADMIN_DOCTORS_CREATE,
        icon: <UserPlusIcon />,
      },
    ],
  },
  {
    title: "Gestión de Pacientes",
    icon: <UserGroupIcon />,
    subItems: [
      {
        title: "Pacientes Activos",
        href: RoutesAdmin.ADMIN_PATIENTS,
        icon: <ClipboardDocumentListIcon />
      },
      {
        title: "Registrar Paciente",
        href: RoutesAdmin.ADMIN_PATIENTS_CREATE,
        icon: <UserPlusIcon />
      }
    ],
  },
  {
    title: "Especialidades Médicas",
    icon: <BeakerIcon />,
    subItems: [
      {
        title: "Listado de Especialidades",
        href: RoutesAdmin.ADMIN_SPECIALTIES,
        icon: <ClipboardDocumentListIcon />
      },

      {
        title: "Crear Especialidad",
        href: RoutesAdmin.ADMIN_SPECIALTIES_CREATE,
        icon: <DocumentPlusIcon />
      },
    ],
  },
  {
    title: "Reportes",
    icon: <ClipboardDocumentListIcon />,
    subItems: [
      {
        title: "Generar Reportes",
        href: RoutesAdmin.ADMIN_REPORTS,
        icon: <DocumentPlusIcon />
      }
    ],
  }
];

export default adminMenuItems;
