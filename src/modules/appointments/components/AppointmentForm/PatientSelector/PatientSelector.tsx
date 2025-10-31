import ErrorDisplay from '@/modules/errors/components/ErrorDisplay';
import { usePaginatedPatients } from '@/modules/patient/hooks/usePaginatedPatients';
import SearchBar from '@/shared/components/SearchBar/SearchBar';
import { type FC } from 'react';
import SelectablePatientCard from './SelectablePatientCard';

const PatientSelector: FC = () => {
  const {
    patients,
    loading,
    errors,
    searchName,
    setSearchName,
    searchPhone,
    setSearchPhone,
    searchEmail,
    setSearchEmail
  } = usePaginatedPatients();

  return (
    <div className="w-full">
      {errors && <ErrorDisplay errors={errors} />}
      {/* Search inputs */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
        <SearchBar
          filtering={searchName}
          setFiltering={setSearchName}
          placeholder="Buscar por Nombre..."
        />
        <SearchBar
          filtering={searchPhone}
          setFiltering={setSearchPhone}
          placeholder="Buscar por Teléfono..."
        />
        <SearchBar
          filtering={searchEmail}
          setFiltering={setSearchEmail}
          placeholder="Buscar por Correo Electrónico..."
        />
      </div>

      {loading && <div>Cargando pacientes...</div>}
      {!loading && (!patients || patients.length === 0) && (
        <div>No hay pacientes disponibles.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-2">
        {patients?.map(patient => (
          <SelectablePatientCard
            key={patient.id}
            patient={patient}
          />
        ))}
      </div>
    </div>
  );
}

export default PatientSelector;