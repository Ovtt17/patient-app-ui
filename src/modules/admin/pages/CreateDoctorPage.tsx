import { useState, type FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import DarkModeSwitcher from "@/shared/components/Header/DarkModeSwitcher";
import { cn } from "@/lib/utils";
import type { DoctorRequest } from "@/modules/admin/types/doctor-request.types";
import CreateDoctorForm from "../components/CreateDoctorForm";
import { useCreateDoctor } from "../hooks/useCreateDoctor";

const CreateDoctorPage: FC = () => {
  const form = useForm<DoctorRequest>({ mode: "onChange" });
  const [serverError, setServerError] = useState<any>(null);
  const { mutate, isPending, error } = useCreateDoctor();

  const handleSubmit = (data: DoctorRequest) => {
    setServerError(null);
    mutate(data, {
      onSuccess: (message) => {
        alert(message || "Doctor creado correctamente");
        form.reset();
      },
      onError: (err) => {
        setServerError(err);
      },
    });
  };

  return (
    <article className={cn(
      "min-h-screen bg-white/40 dark:bg-gray-900 text-black dark:text-white shadow-2xl"
    )}>
      <div className="flex flex-col justify-center items-center px-6 sm:px-8">
        <div className={cn(
          "bg-white/40 dark:bg-gray-800 w-full flex justify-center",
          "max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8",
          "rounded-md shadow-md transition-opacity duration-300",
          isPending && "opacity-10"
        )}>
          <section className="flex flex-col gap-4 w-full max-w-lg">
            <h2 className="text-2xl font-semibold text-center">Crear Doctor</h2>
            <FormProvider {...form}>
              <CreateDoctorForm
                isLoading={isPending}
                serverError={serverError || error}
                handleSubmit={handleSubmit}
              />
            </FormProvider>
            <div className="flex justify-center mt-1">
              <NavLink
                to="RoutesAdmin.ADMIN_DOCTORS"
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Lista de doctores
              </NavLink>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
};

export default CreateDoctorPage;