import type { FC } from 'react';
import type { PatientResponse } from '../../types/PatientResponse';
import { cn } from '@/lib/utils';
import PatientCard from '../PatientCard/PatientCard';
import { PatientEmptyState } from './PatientEmptyState';

interface PatientGridProps {
  patients: PatientResponse[];
}

const PatientGrid: FC<PatientGridProps> = ({ patients }) => {
  const hasPatients = patients.length > 0;

  return (
    <div
      className={cn(
        "grid gap-6",
        hasPatients ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}
    >
      {hasPatients ? (
        patients.map((patient) => <PatientCard key={patient.id} patient={patient} />)
      ) : (
        <PatientEmptyState />
      )}
    </div>
  );
}

export default PatientGrid;