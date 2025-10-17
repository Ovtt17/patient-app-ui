export const Role = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  PATIENT: "PATIENT",
} as const;

// Export as type
export type Role = typeof Role[keyof typeof Role];