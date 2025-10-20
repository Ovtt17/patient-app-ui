import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import type { RegisterRequest } from "@/modules/auth/types/register-request.types";
import GenderSelect from "@/shared/components/Select/GenderSelect";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import Spinner from "@/shared/components/Loader/Spinner";
import PhoneInputField from "@/shared/components/Input/PhoneInputField";
import InputField from "@/shared/components/Input/InputField";
interface SignUpFormProps {
  onSubmit: (data: RegisterRequest) => void;
}

const SignUpForm: FC<SignUpFormProps> = ({
  onSubmit,
}) => {
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useFormContext<RegisterRequest>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto flex flex-col gap-6 px-4 sm:px-6 md:px-8"
    >
      {/* Nombre */}
      <InputField
        id="firstName"
        label="Nombres"
        placeholder="Miguel Ángel"
        type="text"
        icon={<UserIcon className="w-5 h-5 text-gray-400" />}
      />

      {/* Apellido */}
      <InputField
        id="lastName"
        label="Apellidos"
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
          {isSubmitting ? <Spinner /> : "Crear cuenta"}
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
