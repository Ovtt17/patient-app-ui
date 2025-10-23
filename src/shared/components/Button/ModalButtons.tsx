import React from 'react';
import Spinner from '../Loader/Spinner';
import { cn } from '@/lib/utils';

interface ModalButtonsProps {
  isSubmitting: boolean;
  handleModalClose: () => void;
  isUpdate: boolean;
  submitText?: string;
}

const ModalButtons: React.FC<ModalButtonsProps> = ({ isSubmitting, handleModalClose, isUpdate, submitText }) => {
  return (
    <div className="flex justify-end p-4 gap-4">
      <button
        type="button"
        onClick={handleModalClose}
        disabled={isSubmitting}
        className={cn(
          "px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300",
          isSubmitting && "opacity-50 cursor-not-allowed"
        )}
      >
        Cancelar
      </button>
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "flex items-center bg-gradient-to-br from-primary to-secondary hover:to-secondary-hover text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary-dark transition-colors",
          isSubmitting && "opacity-50 cursor-not-allowed"
        )}
      >
        {isSubmitting ? <Spinner /> : submitText || (isUpdate ? 'Actualizar' : 'Crear')}
      </button>
    </div>
  );
};

export default ModalButtons;