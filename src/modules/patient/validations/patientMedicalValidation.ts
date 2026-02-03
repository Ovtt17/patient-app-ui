import z from "zod";

export const patientMedicalValidation = z.object({
  weight: z
    .number({ error: "El peso debe ser un número" })
    .positive("El peso debe ser un valor positivo")
    .max(500, "El peso no puede superar los 500 kg")
    .nullable(),

  height: z
    .number({ error: "La altura debe ser un número" })
    .positive("La altura debe ser un valor positivo")
    .max(3, "La altura no puede superar los 3 m")
    .nullable(),

  birthDate: z
    .date({ error: "La fecha de nacimiento debe ser una fecha válida" })
    .max(new Date(), "La fecha de nacimiento no puede ser en el futuro")
    .nullable(),

  notes: z
    .string()
    .max(1000, "Las notas no pueden superar los 1000 caracteres")
    .nullable(),
});
