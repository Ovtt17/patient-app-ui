import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import type { PatientMedicalInfo } from '../../types/PatientMedicalInfo';
import InputField from '@/shared/components/Input/InputField';
import ModalButtons from '@/shared/components/Button/ModalButtons';
import { CakeIcon, ClipboardDocumentCheckIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { RulerIcon } from 'lucide-react';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
dayjs.locale('es');

interface EditPatientFormProps {
  onClose: () => void;
}

const EditPatientForm: FC<EditPatientFormProps> = ({ onClose }) => {
  const { register, formState: { isSubmitting } } = useFormContext<PatientMedicalInfo>();

  return (
    <div className="flex flex-col h-[400px]">
      <div className="custom-scrollbar overflow-y-auto px-2 pb-3 flex-1">
        <div className="mt-7 mb-2.5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <InputField
            id="weight"
            label="Peso (kg)"
            placeholder="70"
            type="number"
            icon={<ScaleIcon className="w-5 h-5 text-gray-400" />}
          />
          <InputField
            id="height"
            label="Altura (m)"
            placeholder="1.75"
            type="number"
            icon={<RulerIcon className="w-5 h-5 text-gray-400" />}
          />
          <InputField
            id="birthDate"
            label="Fecha de nacimiento"
            placeholder="DD/MM/YYYY"
            type="date"
            {...register("birthDate", { valueAsDate: true })}
            icon={<CakeIcon className="w-5 h-5 text-gray-400" />}
          />
          <InputField
            id="notes"
            label="Notas"
            placeholder="Información adicional"
            type="text"
            icon={<ClipboardDocumentCheckIcon className="w-5 h-5 text-gray-400" />}
          />
        </div>
      </div>

      <div className="mt-auto px-2 pt-3">
        <ModalButtons isSubmitting={isSubmitting} handleModalClose={onClose} isUpdate={true} />
      </div>
    </div>
  );
};

export default EditPatientForm;
