import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  UserCircleIcon,
  IdentificationIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { AppointmentReq } from "@/shared/types/appointment.type";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";

interface CreateAppointmentFormProps {
  isLoading: boolean;
  serverError: ProcessedError | null;
  handleSubmit: (data: AppointmentReq) => void;
}

const CreateAppointmentForm: FC<CreateAppointmentFormProps> = ({ isLoading, serverError, handleSubmit }) => {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useFormContext<AppointmentReq>();

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)} className="flex flex-col gap-6">
      {/* Doctor ID */}
      <div className="flex flex-col gap-1">
        <label htmlFor="doctorId" className="text-sm font-medium">Doctor ID</label>
        <div className="relative">
          <UserCircleIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            id="doctorId"
            type="text"
            placeholder="550e8400-e29b-41d4-a716-446655440000"
            className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
            {...register("doctorId", {
              required: "El ID del doctor es obligatorio.",
              minLength: { value: 10, message: "ID inválido." },
            })}
          />
        </div>
        {errors.doctorId && <p className="text-sm text-red-500">{errors.doctorId.message}</p>}
      </div>

      {/* Patient ID */}
      <div className="flex flex-col gap-1">
        <label htmlFor="patientId" className="text-sm font-medium">Paciente ID</label>
        <div className="relative">
          <IdentificationIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            id="patientId"
            type="text"
            placeholder="550e8400-e29b-41d4-a716-446655440000"
            className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
            {...register("patientId", {
              required: "El ID del paciente es obligatorio.",
              minLength: { value: 10, message: "ID inválido." },
            })}
          />
        </div>
        {errors.patientId && <p className="text-sm text-red-500">{errors.patientId.message}</p>}
      </div>

      {/* Fecha y hora */}
      <div className="flex flex-col gap-1">
        <label htmlFor="appointmentDate" className="text-sm font-medium">Fecha y hora</label>
        <div className="relative">
          <CalendarDaysIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            id="appointmentDate"
            type="datetime-local"
            className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
            {...register("appointmentDate", {
              required: "La fecha y hora son obligatorias.",
            })}
          />
        </div>
        {errors.appointmentDate && <p className="text-sm text-red-500">{errors.appointmentDate.message}</p>}
        {/* Nota: si tu backend espera ISO (Instant), transforma este valor a ISO en el handler que recibirá los datos. */}
      </div>

      {/* Motivo */}
      <div className="flex flex-col gap-1">
        <label htmlFor="reason" className="text-sm font-medium">Motivo</label>
        <div className="relative">
          <ClipboardDocumentListIcon className="absolute left-3 top-2 w-6 h-6 text-gray-400" />
          <input
            id="reason"
            type="text"
            placeholder="Consulta general"
            className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
            {...register("reason", {
              required: "El motivo es obligatorio.",
              minLength: { value: 3, message: "Debe tener al menos 3 caracteres." },
              maxLength: { value: 200, message: "No debe exceder 200 caracteres." },
            })}
          />
        </div>
        {errors.reason && <p className="text-sm text-red-500">{errors.reason.message}</p>}
      </div>

      {/* Errores del servidor */}
      <ErrorDisplay errors={serverError ?? null} />

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer rounded-lg bg-gray-900 dark:bg-black dark:hover:bg-gray-900 p-4 text-white transition hover:bg-opacity-80"
      >
        {isLoading ? "Creando..." : "Crear Cita"}
      </button>
    </form>
  );
};

export default CreateAppointmentForm;
