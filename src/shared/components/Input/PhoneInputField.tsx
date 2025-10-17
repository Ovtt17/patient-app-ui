import React, { type FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { get } from 'lodash';
import type { ProcessedError } from '@/modules/errors/types/exception-response.types';
import ErrorDisplay from '@/modules/errors/components/ErrorDisplay';

interface PhoneInputFieldProps {
  id: string;
  label: string;
  placeholder?: string;
  serverError?: ProcessedError | null;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const formatPhone = (value: string) => {
  // Quitar todo excepto números
  const digits = value.replace(/\D/g, '');
  // Solo los primeros 8 dígitos
  const local = digits.slice(0, 8);
  // Formatear como '8989 8989'
  const part1 = local.slice(0, 4);
  const part2 = local.slice(4);
  return `${part1}${part2 ? ' ' + part2 : ''}`;
};

const PhoneInputField: FC<PhoneInputFieldProps> = ({
  id,
  label,
  placeholder = '+505 1234 5678',
  serverError,
  icon,
  disabled = false,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);
  const value = watch(id) || '';

  // Formatear el valor para mostrar en el input
  const formattedValue = formatPhone(value);

  // Manejar cambio de input: solo guardar los 8 dígitos
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    // Extraer solo los dígitos y limitar a 8
    const digits = inputVal.replace(/\D/g, '').slice(0, 8);
    setValue(id, digits);
  };

  return (
    <div className={`mb-2 ${serverError ? 'border-red-500' : ''}`}>
      <label className="mb-2.5 block font-bold">{label}</label>
      <div className="relative">
        <input
          id={id}
          type="tel"
          placeholder={placeholder}
          className={cn(
            'w-full rounded-lg shadow-md border border-stroke bg-white py-4 pl-6 pr-10 outline-none dark:placeholder-gray-400 focus-visible:shadow-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-black-hover',
            disabled && 'cursor-not-allowed opacity-50 bg-gray-100 dark:bg-gray-700'
          )}
          disabled={disabled}
          {...register(id)}
          onChange={handleChange}
          value={formattedValue}
          maxLength={9} // 8 dígitos + posible espacio
        />
        {icon && <span className="absolute right-4 top-4">{icon}</span>}
      </div>
      {error && <p className="text-red-500 text-sm pt-1">{String(error.message)}</p>}
      <ErrorDisplay errors={serverError ?? null} />
    </div>
  );
};

export default PhoneInputField;