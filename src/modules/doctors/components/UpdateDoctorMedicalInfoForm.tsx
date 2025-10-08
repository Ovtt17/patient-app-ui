import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  IdentificationIcon,
  BuildingOffice2Icon,
  ListBulletIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { DoctorMedicalInfo } from "../types/doctor.medicalinfo";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";

type UpdateDoctorMedicalInfoFormProps = {
  isLoading: boolean;
  serverError?: ProcessedError | null;
  handleSubmit: (data: DoctorMedicalInfo) => void;
};

const UpdateDoctorMedicalInfoForm: FC<UpdateDoctorMedicalInfoFormProps> = ({isLoading, serverError, handleSubmit,}) => {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useFormContext<DoctorMedicalInfo>();

  return (
    <form
      onSubmit={rhfHandleSubmit(handleSubmit)}
      className="space-y-4 p-6 border rounded-lg shadow-sm bg-white"
    >
      {/* Licencia médica */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <IdentificationIcon className="h-5 w-5 text-gray-500" />
          Licencia médica
        </label>
        <input
          type="text"
          {...register("medicalLicense", {
            required: "La licencia médica es requerida",
          })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.medicalLicense && (
          <p className="text-red-500 text-sm">{errors.medicalLicense.message}</p>
        )}
      </div>

      {/* Número de consultorio */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <BuildingOffice2Icon className="h-5 w-5 text-gray-500" />
          Número de consultorio
        </label>
        <input
          type="text"
          {...register("officeNumber", {
            required: "El número de consultorio es requerido",
          })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.officeNumber && (
          <p className="text-red-500 text-sm">{errors.officeNumber.message}</p>
        )}
      </div>

      {/* Especialidades (array de strings) */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <ListBulletIcon className="h-5 w-5 text-gray-500" />
          Especialidades (separadas por coma)
        </label>
        <input
          type="text"
          {...register("specialties", {
            required: "Al menos una especialidad es requerida",
            setValueAs: (val: string) =>
              val.split(",").map((s) => s.trim()).filter(Boolean), // convierte string → array
          })}
          className="mt-1 block w-full rounded-md border p-2"
        />
        {errors.specialties && (
          <p className="text-red-500 text-sm">{errors.specialties.message as string}</p>
        )}
      </div>

      {/* Zona horaria */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <GlobeAltIcon className="h-5 w-5 text-gray-500" />
          Zona horaria
        </label>
        <input
          type="text"
          {...register("zoneId", { required: "La zona horaria es requerida" })}
          className="mt-1 block w-full rounded-md border p-2"
          placeholder="Ej: America/Managua"
        />
        {errors.zoneId && (
          <p className="text-red-500 text-sm">{errors.zoneId.message}</p>
        )}
      </div>

      {/* Errores de servidor */}
      {serverError && <ErrorDisplay errors={serverError} />}

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Actualizando..." : "Actualizar Información Médica"}
      </button>
    </form>
  );
};

export default UpdateDoctorMedicalInfoForm;
