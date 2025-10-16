import {
  UserGroupIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  UserPlusIcon,
  BeakerIcon,
  DocumentPlusIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import type { SidebarMenuItem } from "../../../../shared/types/sidebar-menu-item";
import { RoutesAdmin } from "@/shared/constants/routes";

const adminMenuItems: SidebarMenuItem[] = [
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
        href: RoutesAdmin.ADMIN_DOCTORES_CREATE,
        icon: <UserPlusIcon />,
      },
    ],
  },
  {
    title: "Gestión de Pacientes",
    icon: <UserGroupIcon />,
    subItems: [
      { title: "Pacientes Activos", 
        href: RoutesAdmin.ADMIN_PATIENTS,
        icon: <ClipboardDocumentListIcon />
      },

      { title: "Desactivar Paciente", 
        href: RoutesAdmin.ADMIN_DESACTIVATE_PATIENT,
        icon: <UserPlusIcon />},
    ],
  },
  {
    title: "Especialidades Médicas",
    icon: <BeakerIcon />,
    subItems: [
      { title: "Listado de Especialidades", 
        href: RoutesAdmin.ADMIN_SPECIALTIES,
        icon: <ClipboardDocumentListIcon />
      },

      { title: "Crear Especialidad", 
        href: RoutesAdmin.ADMIN_SPECIALTIES_CREATE,
        icon: <DocumentPlusIcon />},

      { title: "Actualizar Especialidad", 
        href: RoutesAdmin.ADMIN_SPECIALTIES_EDIT,
        icon: <PencilSquareIcon />},
    ],
  },
];

export default adminMenuItems;
