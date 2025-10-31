import PageHeader from "@/shared/components/Header/PageHeader";
import { useAllSpecialties } from "../hooks/useAllSpecialties";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import { SpecialtyGrid } from "../components/SpealtyGrid/SpecialtyGrid";
import { NavLink } from "react-router-dom";
import { RoutesAdmin } from "@/modules/admin/routes/RoutesAdmin";

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
      <div className="flex justify-end my-3">
        <NavLink
          to={RoutesAdmin.ADMIN_SPECIALTIES_CREATE}
          className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
        >
          Crear especialidad
        </NavLink>
      </div>
      <SpecialtyGrid specialties={specialties || []} />
    </section>
  );
}

export default Specialty;