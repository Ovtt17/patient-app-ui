import type { FC } from 'react'
import CalendarSection from './CalendarSection'
import DayAvailability from './DayAvailability'
import { useDoctorAvailability } from '@/modules/appointments/hooks/useDoctorAvailability'

interface DoctorScheduleProps {
  doctorId: string
}

const DoctorSchedule: FC<DoctorScheduleProps> = ({ doctorId }) => {
  const {
    visibleMonth,
    selectedDay,
    selectedBlock,
    dailyBlocks,
    isDayDisabled,
    handleMonthChange,
    handleDayClick,
    handleBlockClick,
  } = useDoctorAvailability(doctorId);

  return (
    <div className="w-full border-b-2 border-gray-200 dark:border-gray-700 pb-6 mb-6">

      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
        <CalendarSection
          visibleMonth={visibleMonth}
          onMonthChange={handleMonthChange}
          onDayClick={handleDayClick}
          isDayDisabled={isDayDisabled}
        />
        {selectedDay && (
          <DayAvailability
            selectedDay={selectedDay}
            dailyBlocks={dailyBlocks}
            selectedBlock={selectedBlock}
            onBlockClick={handleBlockClick}
          />
        )}
      </div>
    </div>
  )
}

export default DoctorSchedule
