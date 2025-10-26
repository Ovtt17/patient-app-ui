export const Role = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  PATIENT: "PACIENTE",
} as const;

// Export as type
export type Role = typeof Role[keyof typeof Role];