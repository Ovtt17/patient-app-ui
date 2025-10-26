import InputField from '@/shared/components/Input/InputField'
import { cn } from '@/lib/utils'

const ReasonInput = () => {
  return (
    <div className="w-full mt-4">
      <InputField
        id="reason"
        label="Motivo de la Cita (Opcional)"
        type="text"
        placeholder="Describa brevemente el motivo de su cita"
        className={cn(
          'mt-2',
          'w-full',
          'px-4 py-3',
          'border border-gray-300 dark:border-gray-600',
          'rounded-xl',
          'bg-white dark:bg-gray-800',
          'text-gray-900 dark:text-gray-100',
          'placeholder-gray-400 dark:placeholder-gray-500',
          'shadow-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500',
          'transition-all duration-150'
        )}
      />
    </div>
  )
}

export default ReasonInput
