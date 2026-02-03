import { cn } from "@/lib/utils";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import { get } from "lodash";
import type { FC, TextareaHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface TextareaFieldProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'name'> {
  id: string;
  label: string;
  placeholder: string;
  icon?: React.ReactNode;
  serverError?: ProcessedError | null;
}

const TextareaField: FC<TextareaFieldProps> = ({
  id,
  label,
  placeholder,
  icon,
  serverError,
  ...rest
}) => {
  const { register, formState: { errors } } = useFormContext();
  const error = get(errors, id);

  return (
    <div className={`mb-2 ${serverError ? 'border-red-500' : ''}`}>
      <label className="mb-2.5 block font-bold">{label}</label>
      <div className="relative">
        <textarea
          id={id}
          {...register(id)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-lg shadow-md border border-stroke bg-white py-4 px-6 outline-none dark:placeholder-gray-400 focus-visible:shadow-none dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-black-hover",
            rest.disabled && "cursor-not-allowed opacity-50 bg-gray-100 dark:bg-gray-700"
          )}
          {...rest}
        />
        {icon && <span className="absolute right-4 top-4">{icon}</span>}
      </div>
      {error && <p className="text-red-500 text-sm pt-1">{String(error.message)}</p>}
      <ErrorDisplay errors={serverError ?? null} />
    </div>
  );
}

export default TextareaField;
