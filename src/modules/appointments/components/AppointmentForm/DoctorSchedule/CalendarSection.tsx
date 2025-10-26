import type { FC } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { es } from 'date-fns/locale'

interface CalendarSectionProps {
  visibleMonth: Date
  onMonthChange: (month: Date) => void
  onDayClick: (day: Date) => void
  isDayDisabled: (date: Date) => boolean
}

const CalendarSection: FC<CalendarSectionProps> = ({
  visibleMonth,
  onMonthChange,
  onDayClick,
  isDayDisabled,
}) => {
  return (
    <div className={cn('w-full md:w-1/2 mx-auto sm:mx-0')}>
      <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3 text-center sm:text-left">
        Seleccionar día
      </h3>
      <Calendar
        mode="single"
        className={cn(
          'w-full',
          'bg-gray-50 dark:bg-boxdark',
          'rounded-xl shadow-sm p-4',
          'transition-all duration-200'
        )}
        lang="es"
        locale={es}
        onDayClick={onDayClick}
        onMonthChange={onMonthChange}
        selected={visibleMonth}
        disabled={isDayDisabled}
      />
    </div>
  )
}

export default CalendarSection
