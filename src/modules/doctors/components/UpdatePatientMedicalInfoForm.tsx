import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  ScaleIcon,
  ArrowsUpDownIcon,
  CalendarIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { PatientMedicalInfo } from "../types/patient.medicalinfo";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";

type UpdatePatientMedicalInfoFormProps = {
  isLoading: boolean;
  serverError?: ProcessedError | null;
  handleSubmit: (data: PatientMedicalInfo) => void;
};

const UpdatePatientMedicalInfoForm: FC<UpdatePatientMedicalInfoFormProps> = ({isLoading, serverError, handleSubmit,}) => {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useFormContext<PatientMedicalInfo>();

  return (
    <form
      onSubmit={rhfHandleSubmit(handleSubmit)}
      className="space-y-4 p-6 border rounded-lg shadow-sm bg-white"
    >
      {/* Peso */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <ScaleIcon className="h-5 w-5 text-gray-500" />
          Peso (kg)
        </label>
        <input
          type="number"
          step="0.1"
          {...register("weight", { required: "El peso es requerido" })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.weight && (
          <p className="text-red-500 text-sm">{errors.weight.message}</p>
        )}
      </div>

      {/* Altura */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <ArrowsUpDownIcon className="h-5 w-5 text-gray-500" />
          Altura (cm)
        </label>
        <input
          type="number"
          step="0.1"
          {...register("height", { required: "La altura es requerida" })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.height && (
          <p className="text-red-500 text-sm">{errors.height.message}</p>
        )}
      </div>

      {/* Fecha de nacimiento */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          Fecha de nacimiento
        </label>
        <input
          type="date"
          {...register("birthDate", { required: "La fecha de nacimiento es requerida" })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.birthDate && (
          <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
        )}
      </div>

      {/* Notas */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <PencilSquareIcon className="h-5 w-5 text-gray-500" />
          Notas médicas
        </label>
        <textarea
          rows={3}
          {...register("notes", {
            required: "Las notas son requeridas",
            minLength: { value: 5, message: "Mínimo 5 caracteres" },
          })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.notes && (
          <p className="text-red-500 text-sm">{errors.notes.message}</p>
        )}
      </div>

      {/* Errores de servidor */}
      {serverError && <ErrorDisplay errors={serverError} />}

      {/* Botón submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50"
      >
        {isLoading ? "Actualizando..." : "Actualizar Información Médica"}
      </button>
    </form>
  );
};

export default UpdatePatientMedicalInfoForm;
