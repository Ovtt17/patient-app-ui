import { z } from 'zod';

const doctorStepSchema = z.object({
  doctorId: z.string().min(1, 'Debe seleccionar un doctor')
});

const scheduleStepSchema = z.object({
  appointmentStart: z.date({ error: 'Seleccione la fecha y hora' }),
});

const reasonStepSchema = z.object({
  reason: z.string().max(250, 'Máximo 250 caracteres'),
});

// Schema completo
export const appointmentRequestSchema = z.object({
  doctorId: z.string().min(1, 'Debe seleccionar un doctor'),
  appointmentStart: z.date().nullable().refine(val => val !== null, {
    message: 'Seleccione la fecha y hora',
  }),
  reason: z.string().max(250, 'Máximo 250 caracteres').nullable(),
  userId: z.string(),
});

export const stepSchemas = {
  doctor: doctorStepSchema,
  schedule: scheduleStepSchema,
  reason: reasonStepSchema,
  complete: z.object({})
};
