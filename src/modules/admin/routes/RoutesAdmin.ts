export const RoutesAdmin = {
  ADMIN_DOCTORS: "/admin/doctores",
  ADMIN_DOCTORES_CREATE: "/admin/doctores/crear",
  ADMIN_DOCTOR_SCHEDULES: "/admin/doctores/horarios",
  ADMIN_SPECIALTIES: "/admin/especialidades",
  ADMIN_PATIENTS: "/admin/pacientes",
  ADMIN_SPECIALTIES_CREATE: "/admin/especialidades/crear",
  ADMIN_SPECIALTIES_EDIT: "/admin/especialidades/editar/:id",
  ADMIN_DESACTIVATE_PATIENT: "/admin/pacientes/desactivar/:id",
} as const;
