import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  UserCircleIcon,
  CalendarDaysIcon,
  ClockIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import type { ScheduleReq } from "../types/schedule.types";

type CreateScheduleFormProps = {
  isLoading: boolean;
  serverError?: ProcessedError | null;
  handleSubmit: (data: ScheduleReq) => void;
};

const CreateScheduleForm: FC<CreateScheduleFormProps> = ({isLoading,serverError, handleSubmit,}) => {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useFormContext<ScheduleReq>();

  return (
    <form
      onSubmit={rhfHandleSubmit(handleSubmit)}
      className="space-y-4 p-6 border rounded-lg shadow-sm bg-white"
    >
      {/* Doctor ID */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <UserCircleIcon className="h-5 w-5 text-gray-500" />
          Doctor ID
        </label>
        <input
          type="text"
          {...register("doctorId", { required: "Doctor ID is required" })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.doctorId && (
          <p className="text-red-500 text-sm">{errors.doctorId.message}</p>
        )}
      </div>

      {/* Día de la semana */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <CalendarDaysIcon className="h-5 w-5 text-gray-500" />
          Día de la semana
        </label>
        <select
          {...register("dayOfWeek", { required: "El día es requerido" })}
          className="mt-1 block w-full rounded-md border p-2"
        >
          <option value="">Selecciona un día</option>
          <option value="MONDAY">Lunes</option>
          <option value="TUESDAY">Martes</option>
          <option value="WEDNESDAY">Miércoles</option>
          <option value="THURSDAY">Jueves</option>
          <option value="FRIDAY">Viernes</option>
          <option value="SATURDAY">Sábado</option>
          <option value="SUNDAY">Domingo</option>
        </select>
        {errors.dayOfWeek && (
          <p className="text-red-500 text-sm">{errors.dayOfWeek.message}</p>
        )}
      </div>

      {/* Hora de inicio */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <ClockIcon className="h-5 w-5 text-gray-500" />
          Hora de inicio
        </label>
        <input
          type="time"
          {...register("startTime", { required: "Hora de inicio requerida" })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.startTime && (
          <p className="text-red-500 text-sm">{errors.startTime.message}</p>
        )}
      </div>

      {/* Hora de fin */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <ClipboardDocumentListIcon className="h-5 w-5 text-gray-500" />
          Hora de fin
        </label>
        <input
          type="time"
          {...register("endTime", { required: "Hora de fin requerida" })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.endTime && (
          <p className="text-red-500 text-sm">{errors.endTime.message}</p>
        )}
      </div>

      {/* Error del servidor */}
      {serverError && <ErrorDisplay errors={serverError} />}

      {/* Botón submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Creando..." : "Crear Horario"}
      </button>
    </form>
  );
};

export default CreateScheduleForm;
