import { useState, type FC } from 'react';
import type { PatientResponse } from '../../types/PatientResponse';
import { cn } from '@/lib/utils';
import PatientCard from '../PatientCard/PatientCard';
import { PatientEmptyState } from './PatientEmptyState';
import SearchBar from '@/shared/components/SearchBar/SearchBar';

interface PatientGridProps {
  patients: PatientResponse[];
}

const PatientGrid: FC<PatientGridProps> = ({ patients }) => {
  const [filtering, setFiltering] = useState("");
  const hasPatients = patients.length > 0;

  const filteredPatients = hasPatients
    ? patients.filter((patient) =>
      `${patient.firstName} ${patient.lastName}`
        .toLowerCase()
        .includes(filtering.toLowerCase())
    )
    : [];

  return (
    <>
      <SearchBar filtering={filtering} setFiltering={setFiltering} placeholder="Buscar paciente..." />

      <div
        className={cn(
          "grid gap-6",
          hasPatients ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}
      >
        {hasPatients ? (
          filteredPatients.map((patient) => <PatientCard key={patient.id} patient={patient} />)
        ) : (
          <PatientEmptyState />
        )}
      </div>
    </>
  );
}

export default PatientGrid;