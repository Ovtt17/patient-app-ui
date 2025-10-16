import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { DoctorRequest } from "@/modules/admin/types/doctor-request.types";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";

interface CreateDoctorFormProps {
  isLoading: boolean;
  serverError: ProcessedError | null;
  handleSubmit: (data: DoctorRequest) => void;
}

const CreateDoctorForm: FC<CreateDoctorFormProps> = ({ isLoading, serverError, handleSubmit }) => {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useFormContext<DoctorRequest>();
  
  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)} className="flex flex-col gap-6">
      {/* Nombre */}
      <div className="flex flex-col gap-1">
        <label htmlFor="firstName" className="text-sm font-medium">Nombre</label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            id="firstName"
            type="text"
            placeholder="Juan"
            className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
            {...register("firstName", { required: "El nombre es obligatorio." })}
          />
        </div>
        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
      </div>

      {/* Apellido */}
      <div className="flex flex-col gap-1">
        <label htmlFor="lastName" className="text-sm font-medium">Apellido</label>
        <div className="relative">
          <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            id="lastName"
            type="text"
            placeholder="Pérez"
            className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
            {...register("lastName", { required: "El apellido es obligatorio." })}
          />
        </div>
        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
      </div>

      {/* Correo */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">Correo electrónico</label>
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            id="email"
            type="email"
            placeholder="doctor@ejemplo.com"
            className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
            {...register("email", {
              required: "El correo es obligatorio.",
              pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido." },
            })}
          />
        </div>
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Teléfono */}
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-sm font-medium">Teléfono</label>
        <div className="relative">
          <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            id="phone"
            type="tel"
            placeholder="+505 8888 8888"
            className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
            {...register("phone", {
              required: "El teléfono es obligatorio.",
              minLength: { value: 7, message: "Teléfono inválido." },
            })}
          />
        </div>
        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
      </div>

      {/* Género */}
      <div className="flex flex-col gap-1">
        <label htmlFor="gender" className="text-sm font-medium">Género</label>
        <select
          id="gender"
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
          {...register("gender", { required: "El género es obligatorio." })}
        >
          <option value="">Selecciona género</option>
          <option value="MASCULINO">Masculino</option>
          <option value="FEMENINO">Femenino</option>
        </select>
        {errors.gender && <p className="text-sm text-red-500">{errors.gender.message}</p>}
      </div>

      {/* Errores del servidor */}
      <ErrorDisplay errors={serverError ?? null} />

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer rounded-lg bg-gray-900 dark:bg-black dark:hover:bg-gray-900 p-4 text-white transition hover:bg-opacity-80"
      >
        {isLoading ? "Creando..." : "Crear Doctor"}
      </button>
    </form>
  );
};

export default CreateDoctorForm;
