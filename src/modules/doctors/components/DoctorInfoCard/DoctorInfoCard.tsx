import type { FC } from 'react';
import { Button } from "@/components/ui/button";
import { Modal } from "@/shared/components/modal";
import { useModal } from "@/shared/hooks/useModal";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useFetchDoctorByUserId } from '../../hooks/useFetchDoctorByUserId';
import ErrorDisplay from '@/modules/errors/components/ErrorDisplay';
import InfoItem from '@/shared/components/Item/InfoItem';
import EditDoctorModal from '../EditDoctorModal/EditDoctorModal';

interface DoctorInfoCardProps {
  userId: string;
}

const DoctorInfoCard: FC<DoctorInfoCardProps> = ({ userId }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const {
    doctor,
    isLoading,
    error,
  } = useFetchDoctorByUserId(userId);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando información médica...
        </p>
      </div>
    );

  if (!doctor) {
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
    <article className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Información Médica
          </h4>
          {error && <ErrorDisplay errors={error} />}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <InfoItem label="Licencia Médica" value={doctor?.medicalLicense} />
            <InfoItem label="Oficina" value={doctor?.officeNumber} />
            <InfoItem label="Especialidades" value={doctor?.specialties?.map(spec => spec.name).join(", ")} />
          </div>
        </div>
        <Button
          onClick={openModal}
          size="sm"
          variant="outline"
          className="dark:bg-boxdark lg:w-auto w-full rounded-3xl px-8 py-6 flex items-center justify-center gap-2 border-gray-300"
        >
          <PencilIcon className="w-4 h-4" />
          Editar
        </Button>
      </div>
      {error && <ErrorDisplay errors={error} />}

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <EditDoctorModal doctor={doctor} onClose={closeModal} />
      </Modal>
    </article>
  );
}

export default DoctorInfoCard;