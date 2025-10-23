import PageHeader from "@/shared/components/Header/PageHeader";
import { useAllSpecialties } from "../hooks/useAllSpecialties";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import { SpecialtyGrid } from "../components/SpealtyGrid/SpecialtyGrid";

const Specialty = () => {
  const {
    entities: specialties,
    loading,
    errors,
  } = useAllSpecialties();

  if (loading)
    return (
      <div className="flex mx-auto max-w-7xl justify-center items-center h-72">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando especialidades...
        </p>
      </div>
    );

  return (
    <section className="flex flex-col gap-3">
      <PageHeader title="Especialidades" />
      {errors && <ErrorDisplay errors={errors} />}
      <SpecialtyGrid specialties={specialties || []} />
    </section>
  );
}

export default Specialty;