import { useAllDoctors } from '@/modules/doctors/hooks/useAllDoctors';
import SelectableDoctorCard from './SelectableDoctorCard';
import type { FC } from 'react';
import ErrorDisplay from '@/modules/errors/components/ErrorDisplay';

const DoctorSelector: FC = () => {
  const { entities: doctors, loading, errors } = useAllDoctors();

  if (loading) return <div>Cargando doctores...</div>;
  if (!doctors || doctors.length === 0) return <div>No hay doctores disponibles.</div>;

  return (
    <div className="w-full">
      {/* Título mejorado */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
        Seleccionar Doctor
      </h2>
      {errors && <ErrorDisplay errors={errors} />}

      {/* Grid de doctores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
        {doctors.map((doctor) => (
          <SelectableDoctorCard
            key={doctor.id}
            doctor={doctor}
          />
        ))}
      </div>
    </div>
  );
};

export default DoctorSelector;