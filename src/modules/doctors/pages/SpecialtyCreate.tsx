import { cn } from "@/lib/utils";
import { useSpecialtyForm } from "../hooks/useSpecialtyForm";
import PageHeader from "@/shared/components/Header/PageHeader";
import { FormProvider } from "react-hook-form";
import SpecialtyForm from "../components/SpecialtyForm/SpecialtyForm";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";

const SpecialtyCreate = () => {
  const {
    form,
    isEdit,
    onSubmit,
    error,
    errorFetch,
  } = useSpecialtyForm();

  const { isSubmitting } = form.formState;
  return (
    <article className={cn("flex flex-col gap-3", isSubmitting && "opacity-60 pointer-events-none")}>
      <PageHeader title="Crear Especialidad" />
      {(error || errorFetch) ? <ErrorDisplay errors={error || errorFetch} /> : null}
      <FormProvider {...form}>
        <SpecialtyForm onSubmit={onSubmit} isEdit={isEdit} />
      </FormProvider>
    </article>
  );
}

export default SpecialtyCreate;