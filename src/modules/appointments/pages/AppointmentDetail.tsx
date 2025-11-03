import type { FC } from 'react';
import { useFetchAppointmentById } from '../hooks/useFetchAppointmentById';
import { useFetchPatientById } from '@/modules/patient/hooks/useFetchPatientById';
import ErrorDisplay from '@/modules/errors/components/ErrorDisplay';
import PageHeader from '@/shared/components/Header/PageHeader';
import { PatientInfo } from '../components/AppointmentDetail/PatientInfo';
import { AppointmentInfo } from '../components/AppointmentDetail/AppointmentInfo';
import { Button } from '@/components/ui/button';
import { useModal } from '@/shared/hooks/useModal';
import { Modal } from '@/shared/components/modal';
import CreateMedicalRecordModal from '@/modules/medical-record/components/CreateMedicalRecordModal';
import MedicalRecordList from '../components/AppointmentDetail/MedicalRecordList';

const AppointmentDetail: FC = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const { appointment, isLoading: isLoadingAppointment, errors: appointmentErrors } = useFetchAppointmentById();
  const patientId = appointment?.patientId;
  const { patient, isLoading: isLoadingPatient, errors: patientErrors } = useFetchPatientById(patientId);

  if (isLoadingAppointment || isLoadingPatient) return <div>Cargando detalles...</div>;
  if (!appointment) return <div>No se encontró la cita.</div>;
  if (!patient) return <div>No se encontró la información del paciente.</div>;

  return (
    <div className="pb-6 space-y-6">
      <PageHeader title={`Detalle de la Cita #${appointment.id}`} />
      {appointmentErrors && <ErrorDisplay errors={appointmentErrors} />}
      {patientErrors && <ErrorDisplay errors={patientErrors} />}

      <div className="flex justify-end gap-4">
        <Button
          className='flex justify-center items-center bg-gradient-to-br from-primary to-secondary hover:to-secondary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 ease-in-out'
          onClick={openModal}
        >
          Crear Registro Médico
        </Button>
      </div>

      <AppointmentInfo appointment={appointment} />
      <PatientInfo patient={patient} />
      <MedicalRecordList patientId={patient.id} />

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <CreateMedicalRecordModal patient={patient} appointment={appointment} onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default AppointmentDetail;