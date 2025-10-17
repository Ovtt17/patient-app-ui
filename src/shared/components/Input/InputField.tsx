import { cn } from "@/lib/utils";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import { get } from "lodash";
import type { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  icon?: React.ReactNode;
  serverError?: ProcessedError | null;
}

const InputField: FC<InputFieldProps> = ({
  id,
  label,
  type,
  placeholder,
  icon,
  serverError,
  inputMode,
  pattern,
  ...rest
}) => {
  const { register, formState: { errors } } = useFormContext();
  const error = get(errors, id);

  // Si el tipo es number, forzar inputMode y pattern para teclado numérico
  const numberProps =
    type === 'number'
      ? {
        inputMode: inputMode || 'decimal',
        step: 'any' // permite decimales
      }
      : {};

  return (
    <div className={`mb-2 ${serverError ? 'border-red-500' : ''}`}>
      <label className="mb-2.5 block font-bold">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={type}
          onWheel={(e) => e.currentTarget.blur()}
          {...register(id, { valueAsNumber: type === 'number' ? true : undefined })}
          placeholder={type !== 'color' ? placeholder : undefined}
          className={cn(
            "w-full rounded-lg shadow-md border border-stroke bg-white py-4 pl-6 pr-10 outline-none dark:placeholder-gray-400 focus-visible:shadow-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-black-hover",
            type === 'color' && "h-15 p-1 w-20 cursor-pointer",
            rest.disabled && "cursor-not-allowed opacity-50 bg-gray-100 dark:bg-gray-700"
          )}
          {...numberProps}
          {...rest}
        />
        {icon && <span className="absolute right-4 top-4">{icon}</span>}
      </div>
      {error && <p className="text-red-500 text-sm pt-1">{String(error.message)}</p>}
      <ErrorDisplay errors={serverError ?? null} />
    </div>
  );
}

export default InputField;