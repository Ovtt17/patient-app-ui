import type { SelectedBlock } from '@/modules/appointments/hooks/useDoctorAvailability'
import dayjs from 'dayjs'
import type { FC } from 'react'
import { cn } from '@/lib/utils'

interface DayAvailabilityProps {
  selectedDay: Date
  dailyBlocks: SelectedBlock[]
  selectedBlock: SelectedBlock | null
  onBlockClick: (block: SelectedBlock) => void
}

const DayAvailability: FC<DayAvailabilityProps> = ({
  selectedDay,
  dailyBlocks,
  selectedBlock,
  onBlockClick,
}) => {
  if (dailyBlocks.length === 0)
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center py-6">
        No hay bloques disponibles para este día.
      </p>
    )

  return (
    <div className="w-full md:w-1/2">
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center sm:text-left">
        Disponibilidad del día: {dayjs(selectedDay).format('DD/MM/YYYY')}
      </h3>

      <ul
        className={cn(
          'grid gap-2 sm:gap-3 md:gap-4 px-2 sm:px-0',
          'grid-cols-4 md:grid-cols-5'
        )}
      >
        {dailyBlocks.map(block => {
          const isSelected =
            selectedBlock && dayjs(selectedBlock.start).isSame(dayjs(block.start))

          return (
            <li
              key={block.start.toISOString()}
              onClick={() => onBlockClick(block)}
              className={cn(
                'flex items-center justify-center aspect-square rounded-xl sm:rounded-2xl',
                'text-center font-medium text-sm sm:text-base',
                'cursor-pointer select-none transition-all duration-150 ease-in-out shadow-sm active:scale-95',
                isSelected
                  ? 'bg-blue-500 text-white shadow-md scale-[1.05]'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-400 hover:text-white'
              )}
            >
              {dayjs(block.start).format('hh:mm A')}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DayAvailability;
