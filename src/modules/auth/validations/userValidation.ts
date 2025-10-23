import z from "zod";
import { GENDERS } from "@/shared/types/Gender";

export const userValidation = z.object({
  firstName: z
    .string()
    .min(3, { error: "El nombre debe tener entre 3 y 100 caracteres" })
    .max(100, { error: "El nombre debe tener entre 3 y 100 caracteres" })
    .nonempty({ error: "El nombre es obligatorio" }),
  lastName: z
    .string()
    .min(3, { error: "El apellido debe tener entre 3 y 100 caracteres" })
    .max(100, { error: "El apellido debe tener entre 3 y 100 caracteres" })
    .nonempty({ error: "El apellido es obligatorio" }),
  phone: z
    .string()
    .nonempty("El teléfono es obligatorio")
    .transform((val) => val.replace(/\D/g, ''))
    .refine((val) => val.length === 8, {
      error: "El número de teléfono debe tener exactamente 8 dígitos",
    }),
  gender: z.enum(GENDERS, {
    error: "El género es obligatorio y debe ser válido",
  }),
  bio: z
    .string()
    .max(255, { error: "La biografía no puede exceder los 255 caracteres" })
    .optional()
    .nullable(),
});