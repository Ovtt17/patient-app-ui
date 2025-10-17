import { type FC } from "react";
import { useFormContext, type SubmitHandler } from "react-hook-form";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import type { DoctorRequest } from "@/modules/admin/types/DoctorRequest";
import InputField from "@/shared/components/Input/InputField";
import PhoneInputField from "@/shared/components/Input/PhoneInputField";
import GenderSelect from "@/shared/components/Select/GenderSelect";
import { cn } from "@/lib/utils";
import Spinner from "@/shared/components/Loader/Spinner";

interface DoctorCreateFormProps {
  handleSubmit: SubmitHandler<DoctorRequest>
}

const DoctorCreateForm: FC<DoctorCreateFormProps> = ({ handleSubmit }) => {
  const {
    handleSubmit: rhfHandleSubmit,
    formState: { isSubmitting },
  } = useFormContext<DoctorRequest>();

  return (
    <form
      onSubmit={rhfHandleSubmit(handleSubmit)}
      className="w-full max-w-4xl mx-auto flex flex-col gap-6 px-4 sm:px-6 md:px-8"
    >
      {/* Nombre */}
      <InputField
        id="firstName"
        label="Nombres del doctor"
        placeholder="Miguel Ángel"
        type="text"
        icon={<UserIcon className="w-5 h-5 text-gray-400" />}
      />

      {/* Apellido */}
      <InputField
        id="lastName"
        label="Apellidos del doctor"
        placeholder="Hernández López"
        type="text"
        icon={<UserIcon className="w-5 h-5 text-gray-400" />}
      />

      {/* Correo */}
      <InputField
        id="email"
        label="Correo electrónico"
        placeholder="doctor@ejemplo.com"
        type="email"
        icon={<EnvelopeIcon className="w-5 h-5 text-gray-400" />}
      />

      {/* Teléfono */}
      <PhoneInputField
        id="phone"
        label="Teléfono"
        placeholder="86115066"
        icon={<PhoneIcon className="w-5 h-5 text-gray-400" />}
      />

      {/* Género */}
      <GenderSelect fieldName="gender" />

      {/* Submit */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "flex justify-center items-center bg-gradient-to-br from-primary to-secondary hover:to-secondary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 ease-in-out",
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
        >
          {isSubmitting ? <Spinner /> : "Crear Doctor"}
        </button>
      </div>
    </form>
  );
};

export default DoctorCreateForm;