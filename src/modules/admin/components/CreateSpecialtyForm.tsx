import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { SpecialtyReq } from "@/modules/doctors/types/specialty.type";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";

interface CreateSpecialtyFormProps {
  isLoading: boolean;
  serverError: ProcessedError | null;
  handleSubmit: (data: SpecialtyReq) => void;
}

const CreateSpecialtyForm: FC<CreateSpecialtyFormProps> = ({ isLoading, serverError, handleSubmit }) => {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useFormContext<SpecialtyReq>();

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)} className="flex flex-col gap-6">
      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm font-medium">Nombre</label>
        <input
          id="name"
          type="text"
          placeholder="Cardiología"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
          {...register("name", {
            required: "El nombre es obligatorio.",
            minLength: { value: 3, message: "Debe tener al menos 3 caracteres." },
            maxLength: { value: 100, message: "No debe exceder 100 caracteres." },
          })}
        />
        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {/* Descripción */}
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium">Descripción</label>
        <textarea
          id="description"
          placeholder="Especialidad enfocada en el sistema cardiovascular"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
          {...register("description", {
            maxLength: { value: 255, message: "No debe exceder 255 caracteres." },
          })}
        />
        {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
      </div>

      {/* Errores del servidor */}
      <ErrorDisplay errors={serverError ?? null} />

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer rounded-lg bg-gray-900 dark:bg-black dark:hover:bg-gray-900 p-4 text-white transition hover:bg-opacity-80"
      >
        {isLoading ? "Creando..." : "Crear Especialidad"}
      </button>
    </form>
  );
};

export default CreateSpecialtyForm;
