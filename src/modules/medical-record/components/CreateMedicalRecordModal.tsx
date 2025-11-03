import type { AppointmentResponse } from '@/modules/appointments/types/AppointmentResponse';
import type { PatientResponse } from '@/modules/patient/types/PatientResponse';
import type { FC } from 'react';
import { useMedicalRecordForm } from '../hooks/useMedicalRecordForm';
import ErrorDisplay from '@/modules/errors/components/ErrorDisplay';
import { FormProvider } from 'react-hook-form';
import CreateMedicalRecordForm from './CreateMedicalRecordForm';

interface CreateMedicalRecordProps {
  patient: PatientResponse;
  appointment: AppointmentResponse;
  onClose: () => void;
}

const CreateMedicalRecordModal: FC<CreateMedicalRecordProps> = ({ patient, appointment, onClose }) => {
  const {
    form,
    onSubmit,
    errors,
  } = useMedicalRecordForm(patient, appointment, onClose);

  return (
    <div className="relative w-full max-w-[800px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
      <div className="px-2 pr-14">
        <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
          Crear Registro Médico
        </h4>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
          Aquí puedes crear un nuevo registro médico para el paciente {patient.firstName} {patient.lastName} relacionado con la cita #{appointment.id}.
        </p>
      </div>
      {errors && <ErrorDisplay errors={errors} />}

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col">
          <CreateMedicalRecordForm onClose={onClose} />
        </form>
      </FormProvider>
    </div>
  );
}

export default CreateMedicalRecordModal;