import type { FC } from "react";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import type { ScheduleRequest } from "../../types/ScheduleRequest";
import { cn } from "@/lib/utils";
import Spinner from "@/shared/components/Loader/Spinner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ScheduleFormProps {
  onSubmit: SubmitHandler<ScheduleRequest>;
  isEdit: boolean;
}

const daysOfWeek = [
  { value: "MONDAY", label: "Lunes" },
  { value: "TUESDAY", label: "Martes" },
  { value: "WEDNESDAY", label: "Miércoles" },
  { value: "THURSDAY", label: "Jueves" },
  { value: "FRIDAY", label: "Viernes" },
  { value: "SATURDAY", label: "Sábado" },
  { value: "SUNDAY", label: "Domingo" },
];

const ScheduleForm: FC<ScheduleFormProps> = ({ onSubmit, isEdit }) => {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useFormContext<ScheduleRequest>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto flex flex-col gap-6 px-4 sm:px-6 md:px-8"
    >
      {/* Día de la semana */}
      <div className="flex flex-col gap-2">
        <label htmlFor="dayOfWeek" className="font-medium text-gray-700">
          Día de la semana
        </label>
        <select
          id="dayOfWeek"
          {...register("dayOfWeek")}
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Seleccione un día</option>
          {daysOfWeek.map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {/* Hora de inicio */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="start-time-picker" className="px-1">
          Hora de inicio
        </Label>
        <Input
          type="time"
          id="start-time-picker"
          step="60"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          {...register("startTime")}
        />
      </div>

      {/* Hora de fin */}
      <div className="flex flex-col gap-3">
        <Label htmlFor="end-time-picker" className="px-1">
          Hora de fin
        </Label>
        <Input
          type="time"
          id="end-time-picker"
          step="60"
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          {...register("endTime")}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "flex justify-center items-center bg-gradient-to-br from-primary to-secondary hover:to-secondary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 ease-in-out",
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
        >
          {isSubmitting ? (
            <Spinner />
          ) : isEdit ? (
            "Actualizar Horario"
          ) : (
            "Crear Horario"
          )}
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;