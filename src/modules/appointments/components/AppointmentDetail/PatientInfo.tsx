import type { FC } from 'react';
import type { PatientResponse } from '@/modules/patient/types/PatientResponse';
import { PatientAvatar } from './PatientAvatar';
import dayjs from 'dayjs';
import { Button } from '@/components/ui/button';
import { useModal } from '@/shared/hooks/useModal';
import { Modal } from '@/shared/components/modal';
import EditPatientModal from '@/modules/patient/components/EditPatientModal/EditPatientModal';
import { PencilIcon } from "@heroicons/react/24/outline";

interface PatientInfoProps {
  patient?: PatientResponse;
}

export const PatientInfo: FC<PatientInfoProps> = ({ patient }) => {
  const { isOpen, openModal, closeModal } = useModal();

  const formatDate = (date?: string | Date) => (date ? dayjs(date).format('DD/MM/YYYY') : 'N/A');

  if (!patient) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            No hay información médica disponible
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Por favor, contacta al administrador para actualizar tu información médica.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-whiter dark:bg-gray-800 rounded-xl shadow-lg flex flex-col md:flex-row gap-6">
      <PatientAvatar src={patient?.profilePictureUrl} alt={`${patient?.firstName} ${patient?.lastName}`} />
      <div className="flex-1 space-y-2 text-sm text-gray-800 dark:text-gray-200">
        <p><span className="font-medium">Nombre:</span> {`${patient?.firstName || 'N/A'} ${patient?.lastName || 'N/A'}`}</p>
        <p><span className="font-medium">Correo:</span> {patient?.email || 'N/A'}</p>
        <p><span className="font-medium">Teléfono:</span> {patient?.phone || 'N/A'}</p>
        <p><span className="font-medium">Género:</span> {patient?.gender || 'N/A'}</p>
        <p><span className="font-medium">Fecha de nacimiento:</span> {formatDate(patient?.birthDate)}</p>
        <p><span className="font-medium">Peso:</span> {patient?.weight ? `${patient.weight} kg` : 'N/A'}</p>
        <p><span className="font-medium">Altura:</span> {patient?.height ? `${patient.height} m` : 'N/A'}</p>
        <p><span className="font-medium">Notas:</span> {patient?.notes || 'N/A'}</p>
        <Button
          onClick={openModal}
          size="sm"
          variant="outline"
          className="dark:bg-gray-700 lg:w-auto w-full rounded-3xl px-8 py-6 flex items-center justify-center gap-2 border-gray-300"
        >
          <PencilIcon className="w-4 h-4" />
          Editar
        </Button>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <EditPatientModal patient={patient} onClose={closeModal} />
      </Modal>
    </div>
  );
};
