import { type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import InputField from '@/shared/components/Input/InputField';
import ModalButtons from '@/shared/components/Button/ModalButtons';
import { ScaleIcon, ClipboardDocumentCheckIcon, BeakerIcon } from '@heroicons/react/24/outline';
import type { MedicalRecordRequest } from '../types/MedicalRecordRequest';
import { DropletIcon, NotepadTextIcon, RulerIcon } from 'lucide-react';
import TextareaField from '@/shared/components/Input/TextareaField';

interface CreateMedicalRecordFormProps {
  onClose: () => void;
}

const CreateMedicalRecordForm: FC<CreateMedicalRecordFormProps> = ({ onClose }) => {
  const {
    formState: { isSubmitting }
  } = useFormContext<MedicalRecordRequest>();

  return (
    <div className="flex flex-col h-[600px]">
      {/* Contenido scrollable */}
      <div className="custom-scrollbar overflow-y-auto px-2 pb-3 flex-1">
        <div className="mt-7 mb-2.5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <InputField
            id="weight"
            label="Peso (kilos)"
            placeholder="70"
            type="number"
            icon={<ScaleIcon className="w-5 h-5 text-gray-400" />}
          />
          <InputField
            id="height"
            label="Altura (metros)"
            placeholder="1.75"
            type="number"
            icon={<RulerIcon className="w-5 h-5 text-gray-400" />}
          />
          <InputField
            id="bloodType"
            label="Tipo de Sangre"
            placeholder="O+"
            type="text"
            icon={<DropletIcon className="w-5 h-5 text-gray-400" />}
          />
          <InputField
            id="allergies"
            label="Alergias"
            placeholder="Ej. Penicilina"
            type="text"
            icon={<ClipboardDocumentCheckIcon className="w-5 h-5 text-gray-400" />}
          />
          <InputField
            id="chronicDiseases"
            label="Enfermedades Crónicas"
            placeholder="Ej. Diabetes"
            type="text"
            icon={<BeakerIcon className="w-5 h-5 text-gray-400" />}
          />
          <InputField
            id="medications"
            label="Tratamientos/Medicamentos"
            placeholder="Ej. Metformina"
            type="text"
            icon={<NotepadTextIcon className="w-5 h-5 text-gray-400" />}
          />
        </div>
        <TextareaField
          id="diagnostic"
          label="Diagnóstico"
          placeholder="Describa el diagnóstico médico aquí..."
        />
      </div>

      {/* Footer fijo al final */}
      <div className="mt-auto px-2 pt-3">
        <ModalButtons
          isSubmitting={isSubmitting}
          handleModalClose={onClose}
          isUpdate={false} // aquí sería creación, no edición
        />
      </div>
    </div>
  );
}

export default CreateMedicalRecordForm;