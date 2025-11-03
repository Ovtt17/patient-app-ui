import type { FC } from 'react';
import { useAuth } from '@/shared/context/auth/useAuth';
import { useAllMedicalRecordsByPatientId } from '../hooks/useAllMedicalRecordsByPatientId';
import ErrorDisplay from '@/modules/errors/components/ErrorDisplay';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { ClipboardDocumentListIcon, CalendarDaysIcon, HeartIcon } from '@heroicons/react/24/outline';

const MedicalRecord: FC = () => {
  const { user } = useAuth();
  const { medicalRecords, isLoading, error } = useAllMedicalRecordsByPatientId(user?.patientId!);

  const formatDate = (date: string) => dayjs(date).format('DD/MM/YYYY');

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

  return (
    <section className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Expedientes médicos de {user?.firstName} {user?.lastName}
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {medicalRecords.map((record) => (
          <motion.article
            key={record.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <ClipboardDocumentListIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Expediente #{record.id}
              </h3>
            </div>

            {/* Info */}
            <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <CalendarDaysIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span>
                  <span className="font-medium">Creado el:</span> {formatDate(record.createdDate)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <HeartIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span>
                  {record.weight ? `${record.weight} kg` : 'Peso N/A'} •{' '}
                  {record.height ? `${record.height} m` : 'Altura N/A'}
                </span>
              </div>

              <p><span className="font-medium">Tipo de sangre:</span> {record.bloodType || 'N/A'}</p>
              <p><span className="font-medium">Alergias:</span> {record.allergies || 'N/A'}</p>
              <p><span className="font-medium">Enfermedades crónicas:</span> {record.chronicDiseases || 'N/A'}</p>
              <p><span className="font-medium">Medicamentos:</span> {record.medications || 'N/A'}</p>
              <p><span className="font-medium">Diagnóstico:</span> {record.diagnostic || 'N/A'}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default MedicalRecord;