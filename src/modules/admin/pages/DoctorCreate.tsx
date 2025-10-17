import type { FC } from "react";
import { FormProvider } from "react-hook-form";
import DoctorCreateForm from "../components/DoctorCreate/DoctorCreateForm";
import { useDoctorCreate } from "../hooks/useDoctorCreate";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import { cn } from "@/lib/utils";

const DoctorCreate: FC = () => {
  const { form, handleSubmit, error, isPending } = useDoctorCreate();

  return (
    <article className={cn("p-6 flex flex-col gap-3", isPending && "opacity-60 pointer-events-none")}> 
      <div className="flex flex-row md:justify-between items-center max-sm:flex-col max-sm:items-start max-sm:gap-2">
        <header className="flex items-center">
          <h2 className="text-title-md2 font-semibold text-black dark:text-white">
            Registrar Doctor
          </h2>
        </header>
      </div>

      {/* Error general */}
      {error && <ErrorDisplay errors={error} />}
      <FormProvider {...form}>
        <DoctorCreateForm handleSubmit={handleSubmit} />
      </FormProvider>
    </article>
  );
};

export default DoctorCreate;