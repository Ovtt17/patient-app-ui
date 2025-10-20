import type { FC } from 'react';
import { useFormContext, type SubmitHandler } from 'react-hook-form';
import type { SpecialtyRequest } from '../../types/SpecialtyRequest';
import InputField from '@/shared/components/Input/InputField';
import { cn } from '@/lib/utils';
import Spinner from '@/shared/components/Loader/Spinner';

interface SpecialtyFormProps {
  onSubmit: SubmitHandler<SpecialtyRequest>;
  isEdit: boolean;
}

const SpecialtyForm: FC<SpecialtyFormProps> = ({ onSubmit, isEdit }) => {
  const {
    handleSubmit,
    formState: { isSubmitting }
  } = useFormContext<SpecialtyRequest>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-4xl mx-auto flex flex-col gap-6 px-4 sm:px-6 md:px-8"
    >
      <InputField
        id='name'
        label='Nombre de la especialidad'
        placeholder='Cardiología'
        type='text'
      />

      <InputField
        id='description'
        label='Descripción'
        placeholder='Descripción de la especialidad'
        type='text'
      />

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            "flex justify-center items-center bg-gradient-to-br from-primary to-secondary hover:to-secondary-hover text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-200 ease-in-out",
            isSubmitting && "opacity-50 cursor-not-allowed"
          )}
        >
          {isSubmitting ? <Spinner /> : isEdit ? 'Actualizar Especialidad' : 'Crear Especialidad'}
        </button>
      </div>
    </form>
  );
}

export default SpecialtyForm;