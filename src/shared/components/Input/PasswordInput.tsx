import { useState, type FC } from 'react';

import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { useFormContext } from 'react-hook-form';
import type { ChangePasswordRequest } from '@/modules/auth/types/ChangePasswordRequest';

interface PasswordInputProps {
  id: keyof ChangePasswordRequest;
  label: string;
  placeholder: string;
}

const PasswordInput: FC<PasswordInputProps> = ({ id, label, placeholder }) => {
  const { register, formState: { errors } } = useFormContext<ChangePasswordRequest>();
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <div className="relative">
        <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        <input
          id={id}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-800 dark:text-white"
          {...register(id, {
            required: `${label} es obligatorio`,
            minLength: { value: 8, message: 'Debe tener al menos 8 caracteres' }
          })}
        />
        <button
          type="button"
          onClick={() => setShow(prev => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-white"
          aria-label={show ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {show ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
        </button>
      </div>
      {errors[id] && <p className="text-sm text-red-500">{errors[id]?.message}</p>}
    </div>
  );
};

export default PasswordInput;