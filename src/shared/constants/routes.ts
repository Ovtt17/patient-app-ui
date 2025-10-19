export const Routes = {
  HOME: "/",
  LOGIN: "/login",
  ACTIVATE_ACCOUNT: "/activar-cuenta",
  PROFILE: "/perfil",
  SPECIALTIES: "/especialidades",
  DIAGNOSTIC_CENTERS: "/centros-diagnosticos",
  HOSPITAL_SERVICES: "/servicios",

} as const;

export const RoutesDoctor = {
  
} as const;

export const RoutesPatient = {
  BOOK_APPOINTMENT: "/book-appointment",
  MY_APPOINTMENTS: "/my-appointments",
  APPOINTMENT_DETAILS: "/appointment-details/:id",
} as const;