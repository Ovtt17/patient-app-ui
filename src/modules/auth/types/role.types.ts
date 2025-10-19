export const Role = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  PATIENT: "PACIENTE",
} as const;

// Export as type
export type Role = typeof Role[keyof typeof Role];