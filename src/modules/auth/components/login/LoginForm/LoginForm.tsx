import { useState, type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import type { ProcessedError } from '@/modules/errors/types/exception-response.types';
import type { LoginRequest } from '@/modules/auth/types/login-request.types';
import ErrorDisplay from '@/modules/errors/components/ErrorDisplay';
import { NavLink } from 'react-router-dom';

interface LoginFormProps {
  isLoading: boolean;
  serverError: ProcessedError | null;
  handleSubmit: (data: LoginRequest) => void;
}

const LoginForm: FC<LoginFormProps> = ({ isLoading, serverError, handleSubmit }) => {
  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors },
  } = useFormContext<LoginRequest>();

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={rhfHandleSubmit(handleSubmit)} className="flex flex-col gap-6">
      {/* Username */}
      <div className="flex flex-col gap-1">
        <label htmlFor="username" className="text-sm font-medium">
          Email / Usuario
        </label>
        <div className="relative">
          <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            id="username"
            type="text"
            placeholder="usuario@ejemplo.com"
            className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
            {...register('username', {
              required: 'El nombre de usuario o email es obligatorio.',
            })}
          />
        </div>
        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1">
        <label htmlFor="password" className="text-sm font-medium">
          Contraseña
        </label>
        <div className="relative">
          <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="********"
            className="w-full pl-12 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
            {...register('password', {
              required: 'La contraseña es obligatoria.',
              minLength: {
                value: 8,
                message: 'La contraseña debe tener al menos 8 caracteres.',
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
            aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? (
              <EyeSlashIcon className="w-6 h-6" />
            ) : (
              <EyeIcon className="w-6 h-6" />
            )}
          </button>
        </div>
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
        <ErrorDisplay errors={serverError ?? null} />
        <div className="flex justify-end mt-1">
          <NavLink
            to="/" // ToDo: Implement forgot password
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </NavLink>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full cursor-pointer rounded-lg bg-gray-900 dark:bg-black dark:hover:bg-gray-900 p-4 text-white transition hover:bg-opacity-80"
      >
        {isLoading ? 'Cargando...' : 'Iniciar Sesión'}
      </button>
    </form>
  );
};

export default LoginForm;