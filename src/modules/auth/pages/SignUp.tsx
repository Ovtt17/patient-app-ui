import { useState, type FC } from "react";
import { FormProvider } from "react-hook-form";
import { NavLink } from "react-router-dom";
import DarkModeSwitcher from "@/shared/components/Header/DarkModeSwitcher";
import SocialLoginButtons from "../components/oauth/SocialLoginButtons";
import { cn } from "@/lib/utils";
import { Routes } from "@/shared/constants/routes";
import { useSignUpForm } from "../hooks/useSignUpForm";
import SignUpForm from "../components/signup/SignUpForm/SignUpForm";

const SignUp: FC = () => {
  const { form, onSubmit, error } = useSignUpForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <article className={cn(
      "min-h-screen bg-white/40 dark:bg-gray-900 text-black dark:text-white shadow-2xl"
    )}>
      <ul className="flex justify-end pr-10 py-2">
        <DarkModeSwitcher />
      </ul>

      <div className="flex flex-col justify-center items-center px-6 sm:px-8">
        <div className={cn(
          "bg-white/40 dark:bg-gray-800 w-full flex justify-center",
          "max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8",
          "rounded-md shadow-md transition-opacity duration-300",
          form.formState.isSubmitting && "opacity-10"
        )}>
          <section className="flex flex-col gap-4 w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-center">Crear cuenta</h2>

            {/* Formulario */}
            <FormProvider {...form}>
              <SignUpForm
                onSubmit={onSubmit}
                isSubmitting={form.formState.isSubmitting}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
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

            {/* Botón de redirección a login */}
            <div className="flex justify-center mt-1">
              <NavLink
                to={Routes.LOGIN}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                ¿Ya tienes una cuenta? <span className="font-semibold">Iniciar sesión</span>
              </NavLink>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default SignUp;