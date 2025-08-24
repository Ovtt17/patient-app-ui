import type { FC } from 'react';
import { useLogin } from '../hooks/useLogin';
import { FormProvider, useForm } from "react-hook-form";
import type { LoginRequest } from '../types/login-request.types';
import DarkModeSwitcher from '@/shared/components/Header/DarkModeSwitcher';
import LoginHeader from '../components/login/LoginHeader/LoginHeader';
import LoginForm from '../components/login/LoginForm/LoginForm';
import SocialLoginButtons from '../components/oauth/SocialLoginButtons';
import { cn } from '@/lib/utils';
import { NavLink } from 'react-router-dom';
import { Routes } from '@/shared/constants/routes';

const Login: FC = () => {
  const { handleLogin, error } = useLogin();

  const methods = useForm<LoginRequest>({
    defaultValues: {
      username: '',
      password: ''
    }
  });

  return (
    <article
      className={cn(
        "min-h-screen bg-white/40 dark:bg-gray-900 text-black dark:text-white shadow-2xl"
      )}
    >
      <ul className={cn("flex justify-end pr-10 py-2")}>
        <DarkModeSwitcher />
      </ul>

      <div className={cn("flex flex-col justify-center items-center px-6 sm:px-8")}>
        <div
          className={cn(
            "bg-white/40 dark:bg-gray-800 w-full flex justify-center",
            "max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8",
            "rounded-md shadow-md transition-opacity duration-300",
            methods.formState.isSubmitting && "opacity-10"
          )}
        >
          <section className={cn("flex flex-col gap-4 w-full max-w-lg")}>
            {/* Encabezado */}
            <LoginHeader />


            {/* Formulario */}
            <FormProvider {...methods}>
              <LoginForm
                handleSubmit={handleLogin}
                isLoading={methods.formState.isSubmitting}
                serverError={error}
              />
            </FormProvider>

            {/* Separador */}
            <div className="flex items-center my-2">
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
              <span className="mx-4 text-xs text-gray-500 dark:text-gray-400">o</span>
              <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
            </div>

            {/* Botones sociales */}
            <SocialLoginButtons />

            {/* Botón de crear nueva cuenta */}
            <div className="flex justify-center mt-1">
              <NavLink
                to={Routes.SIGNUP}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                ¿No tienes una cuenta? <span className="font-semibold">Crear nueva</span>              </NavLink>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default Login;
