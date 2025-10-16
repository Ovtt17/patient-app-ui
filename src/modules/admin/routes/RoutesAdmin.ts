export const RoutesAdmin = {
  ADMIN_DOCTORS: "/admin/doctors",
  ADMIN_DOCTORES_CREATE : "/admin/doctors/create",
  ADMIN_DOCTOR_SCHEDULES : "/admin/doctors/schedules",
  ADMIN_SPECIALTIES : "/admin/specialties",
  ADMIN_PATIENTS : "/admin/patients",
  ADMIN_SPECIALTIES_CREATE : "/admin/specialties/create",
  ADMIN_SPECIALTIES_EDIT : "/admin/specialties/edit/:id",
  ADMIN_DESACTIVATE_PATIENT : "/admin/patients/deactivate/:id",
} as const;