import { useEffect, type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import type { DoctorMedicalInfo } from '../../types/DoctorMedicalInfo';
import InputField from '@/shared/components/Input/InputField';
import { BuildingOfficeIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import ModalButtons from '@/shared/components/Button/ModalButtons';
import SpecialtyCheckboxGroup from '../SpecialtyCheckboxGroup/SpecialtyCheckboxGroup';
import { useAllSpecialties } from '../../hooks/useAllSpecialties';

interface EditDoctorFormProps {
  onClose: () => void
}

const EditDoctorForm: FC<EditDoctorFormProps> = ({ onClose }) => {
  const { entities: specialties, loading } = useAllSpecialties();
  const {
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useFormContext<DoctorMedicalInfo>();

  useEffect(() => {
    if (errors) {
      console.log('Form errors:', errors);
    }
  }, [errors]);

  return (
    <div className="flex flex-col h-[450px]">
      {/* Contenido scrollable */}
      <div className="custom-scrollbar overflow-y-auto px-2 pb-3 flex-1">
        <div className="mt-7 mb-2.5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <InputField
            id="medicalLicense"
            label="Licencia Médica"
            placeholder="ABC-12345"
            type="text"
            icon={<IdentificationIcon className="w-5 h-5 text-gray-400" />}
          />
          <InputField
            id="officeNumber"
            label="Oficina"
            placeholder="301"
            type="text"
            icon={<BuildingOfficeIcon className="w-5 h-5 text-gray-400" />}
          />
          <InputField
            id="appointmentDuration"
            label="Duración de citas (minutos)"
            placeholder="30"
            type="number"
            icon={<BuildingOfficeIcon className="w-5 h-5 text-gray-400" />}
          />
        </div>

        <SpecialtyCheckboxGroup
          specialties={specialties}
          selectedIds={watch("specialtyIds" ) || []}
          onChange={(ids) => setValue("specialtyIds", ids)}
          loading={loading}
        />
      </div>

      {/* Footer fijo al final */}
      <div className="mt-auto px-2 pt-3">
        <ModalButtons
          isSubmitting={isSubmitting}
          handleModalClose={onClose}
          isUpdate={true}
        />
      </div>
    </div>
  );
}

export default EditDoctorForm;