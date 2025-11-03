import type { FC } from 'react';
import { useAllMedicalRecordsByPatientId } from '@/modules/medical-record/hooks/useAllMedicalRecordsByPatientId';
import dayjs from 'dayjs';
import ErrorDisplay from '@/modules/errors/components/ErrorDisplay';

interface MedicalRecordListProps {
  patientId: string;
}

const MedicalRecordList: FC<MedicalRecordListProps> = ({ patientId }) => {
  const { medicalRecords, isLoading, error } = useAllMedicalRecordsByPatientId(patientId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando expedientes médicos...
        </p>
      </div>
    );
  }

  if (error) {
    return <ErrorDisplay errors={error} />;
  }

  if (!medicalRecords || medicalRecords.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-10">
        No se encontraron expedientes médicos para este paciente.
      </div>
    );
  }

  const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {medicalRecords.map((record) => (
        <div
          key={record.id}
          className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.1)] space-y-2 text-sm text-gray-700 dark:text-gray-200"
        >
          <h3 className="text-lg font-semibold">Expediente Médico #{record.id}</h3>
          <p><span className="font-medium">Fecha creación:</span> {formatDate(record.createdDate)}</p>
          <p><span className="font-medium">Peso:</span> {record.weight ? `${record.weight} kg` : 'N/A'}</p>
          <p><span className="font-medium">Altura:</span> {record.height ? `${record.height} m` : 'N/A'}</p>
          <p><span className="font-medium">Tipo de sangre:</span> {record.bloodType || 'N/A'}</p>
          <p><span className="font-medium">Alergias:</span> {record.allergies || 'N/A'}</p>
          <p><span className="font-medium">Enfermedades crónicas:</span> {record.chronicDiseases || 'N/A'}</p>
          <p><span className="font-medium">Medicamentos:</span> {record.medications || 'N/A'}</p>
          <p><span className="font-medium">Diagnóstico:</span> {record.diagnostic || 'N/A'}</p>
        </div>
      ))}
    </div>
  );
};

export default MedicalRecordList;