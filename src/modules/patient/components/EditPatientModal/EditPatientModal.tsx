import { type FC } from 'react';
import { FormProvider } from 'react-hook-form';
import type { PatientResponse } from '../../types/PatientResponse';
import ErrorDisplay from '@/modules/errors/components/ErrorDisplay';
import { usePatientForm } from '../../hooks/usePatientForm';
import EditPatientForm from './EditPatientForm';

interface EditPatientModalProps {
  patient: PatientResponse;
  onClose: () => void;
}

const EditPatientModal: FC<EditPatientModalProps> = ({ patient, onClose }) => {
  const { form, onSubmit, error, isLoading } = usePatientForm(patient, onClose);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando formulario...
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Editar Información Médica del Paciente
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Actualiza los datos médicos para mantener el perfil del paciente al día.
        </p>
      </div>

      {error && <ErrorDisplay errors={error} />}

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <EditPatientForm onClose={onClose} />
        </form>
      </FormProvider>
    </div>
  );
};

export default EditPatientModal;