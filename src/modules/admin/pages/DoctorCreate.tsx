import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import DoctorCreateForm from "../components/DoctorCreate/DoctorCreateForm";
import { useDoctorCreate } from "../hooks/useDoctorCreate";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import { cn } from "@/lib/utils";
import PageHeader from "@/shared/components/Header/PageHeader";

const DoctorCreate: FC = () => {
  const { form, handleSubmit, error, isPending } = useDoctorCreate();

  return (
    <article className={cn("p-6 flex flex-col gap-3", isPending && "opacity-60 pointer-events-none")}>
      <PageHeader title="Crear nuevo doctor" />

      {/* Error general */}
      {error && <ErrorDisplay errors={error} />}
      <FormProvider {...form}>
        <DoctorCreateForm handleSubmit={handleSubmit} />
      </FormProvider>
    </article>
  );
};

export default DoctorCreate;