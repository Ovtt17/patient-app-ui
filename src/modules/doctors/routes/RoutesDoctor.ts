export const RoutesDoctor = {
  DOCTOR_DASHBOARD: "/doctor/dashboard",

  DOCTOR_SPECIALTIES: "/doctor/especialidades",

  DOCTOR_PATIENTS: "/doctor/pacientes",
  DOCTOR_PATIENTS_CREATE: "/doctor/pacientes/crear",
  DOCTOR_PATIENTS_EDIT: "/doctor/pacientes/editar/:id",

  DOCTOR_SCHEDULES: "/doctor/horarios",
  DOCTOR_SCHEDULES_CREATE: "/doctor/horarios/crear",

  DOCTOR_AVAILABILITY: "/doctor/horarios-disponibilidad",
  DOCTOR_EXCEPTIONS: "/doctor/horarios-excepciones",
} as const;
