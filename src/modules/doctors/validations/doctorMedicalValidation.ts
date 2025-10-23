import z from "zod";

export const doctorMedicalValidation = z.object({
  medicalLicense: z
    .string()
    .min(3, "La licencia médica debe tener al menos 3 caracteres")
    .max(100, "La licencia médica debe tener como máximo 100 caracteres")
    .nonempty("La licencia médica es obligatoria"),

  officeNumber: z
    .string()
    .min(2, "El número de consultorio debe tener al menos 2 caracteres")
    .max(100, "El número de consultorio debe tener como máximo 100 caracteres")
    .nonempty("El número de consultorio es obligatorio"),

  specialtyIds: z.array(z.number()).optional().nullable(),

  appointmentDuration: z
    .number()
    .min(1, "La duración de la cita debe ser al menos 1 minuto")
    .max(120, "La duración de la cita debe ser como máximo 120 minutos")
    .nonnegative("La duración de la cita debe ser un número positivo"),
});
