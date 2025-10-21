export const RoutesAdmin = {
  ADMIN_DOCTORS: "/admin/doctores",
  ADMIN_DOCTORS_CREATE: "/admin/doctores/crear",

  ADMIN_DASHBOARD: "/admin/dashboard",

  ADMIN_SPECIALTIES: "/admin/especialidades",
  ADMIN_SPECIALTIES_CREATE: "/admin/especialidades/crear",
  ADMIN_SPECIALTIES_EDIT: "/admin/especialidades/editar/:id",

  ADMIN_PATIENTS: "/admin/pacientes",
  ADMIN_PATIENTS_CREATE: "/admin/pacientes/crear",
  ADMIN_PATIENTS_EDIT: "/admin/pacientes/editar/:id",

  ADMIN_REPORTS: "/admin/reportes",
  ADMIN_REPORTS_CREATE: "/admin/reportes/crear",
  ADMIN_REPORTS_EDIT: "/admin/reportes/editar/:id"
} as const;
