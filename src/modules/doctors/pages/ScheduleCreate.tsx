import { cn } from "@/lib/utils";
import { useScheduleForm } from "../hooks/useScheduleForm";
import PageHeader from "@/shared/components/Header/PageHeader";
import { FormProvider } from "react-hook-form";
import ScheduleForm from "../components/ScheduleForm/ScheduleForm";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";

const ScheduleCreate = () => {
  const { form, isEdit, onSubmit, error, errorFetch } = useScheduleForm();
  const { isSubmitting } = form.formState;

  return (
    <article
      className={cn(
        "flex flex-col gap-3",
        isSubmitting && "opacity-60 pointer-events-none"
      )}
    >
      <PageHeader title="Crear Horario" />
      {(error || errorFetch) ? (
        <ErrorDisplay errors={error || errorFetch} />
      ) : null}
      <FormProvider {...form}>
        <ScheduleForm onSubmit={onSubmit} isEdit={isEdit} />
      </FormProvider>
    </article>
  );
};

export default ScheduleCreate;