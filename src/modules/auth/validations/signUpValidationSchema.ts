import { z } from 'zod';

export const signUpValidationSchema = z.object({
  firstName: z.string().min(3, 'El nombre es obligatorio'),
  lastName: z.string().min(3, 'El apellido es obligatorio'),
  username: z.string().min(1, 'El nombre de usuario es obligatorio'),
  email: z.email('El email no es válido').min(1, 'El email es obligatorio'),
  phone: z.string()
    .refine(
      val => {
        const digitsOnly = val.replace(/\D/g, '');
        return digitsOnly.length === 8;
      },
      { message: 'El teléfono debe contener 8 números' }
    ),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  confirmPassword: z.string()
    .min(8, 'La confirmación de la contraseña debe tener al menos 8 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
});
