import { useFormContext } from "react-hook-form";
import type { UserRequest } from "../../types/UserRequest";
import Label from "@/shared/components/Label/Label";
import InputField from "@/shared/components/Input/InputField";
import { PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import PhoneInputField from "@/shared/components/Input/PhoneInputField";
import GenderSelect from "@/shared/components/Select/GenderSelect";
import { Textarea } from "@/components/ui/textarea";
import ModalButtons from "@/shared/components/Button/ModalButtons";
import type { FC } from "react";

interface EditUserFormProps {
  onClose: () => void;
}

const EditUserForm: FC<EditUserFormProps> = ({ onClose }) => {
  const {
    register,
    formState: { errors, isSubmitting }
  } = useFormContext<UserRequest>();

  return (
    <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">

      <div className="mt-7">
        <div className="grid mb-2 grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
          {/* Nombre */}
          <InputField
            id="firstName"
            label="Nombres del doctor"
            placeholder="Miguel Ángel"
            type="text"
            icon={<UserIcon className="w-5 h-5 text-gray-400" />}
          />

          {/* Apellido */}
          <InputField
            id="lastName"
            label="Apellidos del doctor"
            placeholder="Hernández López"
            type="text"
            icon={<UserIcon className="w-5 h-5 text-gray-400" />}
          />

          {/* Teléfono */}
          <PhoneInputField
            id="phone"
            label="Teléfono"
            placeholder="86115066"
            icon={<PhoneIcon className="w-5 h-5 text-gray-400" />}
          />

          {/* Género */}
          <GenderSelect fieldName="gender" />
        </div>
        <div className="w-full">
          <Label htmlFor="bio" className="mb-2.5 block font-bold text-black dark:text-white">Descripción (opcional)</Label>
          <Textarea
            id="bio"
            {...register('bio')}
            placeholder="Biografía (opcional)"
            rows={3}
            className="text-black dark:text-white dark:bg-boxdark"
          />
          {errors.bio && <p className="text-red-500 text-sm pt-1">{String(errors.bio.message)}</p>}
        </div>
      </div>
      <ModalButtons
        isSubmitting={isSubmitting}
        handleModalClose={onClose}
        isUpdate={true}
      />
    </div>
  );
}

export default EditUserForm;