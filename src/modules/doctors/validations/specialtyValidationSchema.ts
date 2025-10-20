import z from "zod";

export const specialtyValidationSchema = z.object({
  id: z.number().optional(),
  name: z.string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(50, { message: "El nombre no debe exceder los 50 caracteres." }),
  description: z.string()
    .max(255, { message: "La descripción no debe exceder los 255 caracteres." })
});