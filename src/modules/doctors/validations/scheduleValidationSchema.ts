import { z } from "zod";

export const scheduleValidationSchema = z.object({
  dayOfWeek: z
    .string()
    .nonempty("El día de la semana es obligatorio")
    .refine(
      (val) =>
        [
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ].includes(val),
      "Debe ser un día válido de la semana"
    ),
  startTime: z
    .string()
    .nonempty("La hora de inicio es obligatoria")
    .regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (HH:mm)"),
  endTime: z
    .string()
    .nonempty("La hora de fin es obligatoria")
    .regex(/^\d{2}:\d{2}$/, "Formato de hora inválido (HH:mm)"),
});