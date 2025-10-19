import { GENDERS } from '@/shared/types/Gender';
import { z } from 'zod';
import { Role } from '../types/role.types';

export const signUpValidationSchema = z.object({
  firstName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre debe tener como máximo 100 caracteres")
    .nonempty("El nombre es obligatorio"),

  lastName: z
    .string()
    .min(2, "El apellido debe tener al menos 2 caracteres")
    .max(100, "El apellido debe tener como máximo 100 caracteres")
    .nonempty("El apellido es obligatorio"),

  email: z
    .email("El correo electrónico no es válido"),

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
  role: z.enum(Role, {
    error: "El rol es obligatorio y debe ser válido",
  })
});
