import { type FC } from "react";
import { FormProvider } from "react-hook-form";
import { useSignUpForm } from "../hooks/useSignUpForm";
import SignUpForm from "../components/signup/SignUpForm/SignUpForm";
import type { Role } from "../types/role.types";
import PageHeader from "@/shared/components/Header/PageHeader";
import { cn } from "@/lib/utils";
import { capitalize } from "lodash";

interface SignUpProps {
  role: Role;
}

const SignUp: FC<SignUpProps> = ({ role }) => {
  const { form, onSubmit } = useSignUpForm(role);
  const { isSubmitting } = form.formState;

  return (
    <article className={cn("p-6 flex flex-col gap-3", isSubmitting && "opacity-60 pointer-events-none")}>
      <PageHeader title={`Crear cuenta de ${capitalize(role)}`} />

      {/* Formulario */}
      <FormProvider {...form}>
        <SignUpForm onSubmit={onSubmit} />
      </FormProvider>
    </article>
  );
};

export default SignUp;