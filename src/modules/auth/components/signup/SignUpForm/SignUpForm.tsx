import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { RegisterRequest } from "@/modules/auth/types/register-request.types";

interface SignUpFormProps {
  onSubmit: (data: RegisterRequest) => void;
  isSubmitting: boolean;
  serverError: ProcessedError | null;
  showPassword: boolean;
  setShowPassword: (v: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (v: boolean) => void;
}

const SignUpForm: FC<SignUpFormProps> = ({
  onSubmit,
  isSubmitting,
  serverError,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<RegisterRequest>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {/* First Name */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="firstName">Nombre</Label>
        <Input
          id="firstName"
          placeholder="Juan"
          {...register("firstName")}
        />
        {errors.firstName && <p className="text-sm text-red-500">{errors.firstName.message}</p>}
      </div>

      {/* Last Name */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="lastName">Apellido</Label>
        <Input
          id="lastName"
          placeholder="Pérez"
          {...register("lastName")}
        />
        {errors.lastName && <p className="text-sm text-red-500">{errors.lastName.message}</p>}
      </div>

      {/* Username */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="username">Usuario</Label>
        <Input
          id="username"
          placeholder="usuario123"
          {...register("username")}
        />
        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="correo@ejemplo.com"
          {...register("email")}
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="1234-5678"
          {...register("phone")}
          maxLength={8}
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
      </div>


      {/* Password */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="password">Contraseña</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-1">
        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="********"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
        <ErrorDisplay errors={serverError} />
      </div>

      {/* Submit */}
      <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
        {isSubmitting ? "Registrando..." : "Crear cuenta"}
      </Button>
    </form>
  );
};

export default SignUpForm;
