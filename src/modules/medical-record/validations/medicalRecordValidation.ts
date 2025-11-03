import z from "zod";


export const medicalRecordValidation = z.object({
  patientId: z.string().nonempty("El paciente es obligatorio"),
  doctorId: z.string().nonempty("El doctor es obligatorio"),
  appointmentId: z.number().min(1, "La cita es obligatoria"),

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

  bloodType: z
    .string()
    .max(3, "El tipo de sangre no puede superar los 3 caracteres")
    .nullable(),

  allergies: z
    .string()
    .max(1000, "Las alergias no pueden superar los 1000 caracteres")
    .nullable(),

  chronicDiseases: z
    .string()
    .max(1000, "Las enfermedades crónicas no pueden superar los 1000 caracteres")
    .nullable(),

  medications: z
    .string()
    .max(1000, "Los medicamentos no pueden superar los 1000 caracteres")
    .nullable(),

  diagnostic: z
    .string()
    .max(2000, "El diagnóstico no puede superar los 2000 caracteres")
    .nullable(),
});
