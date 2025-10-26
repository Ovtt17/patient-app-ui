import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import { getDoctorAvailabilityByDay, getDoctorAvailabilityByMonth } from '@/modules/doctors/api/availability.api'
import type { AppointmentRequest } from '../types/AppointmentRequest'
import { useFormContext } from 'react-hook-form'

dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)

export interface SelectedBlock {
  start: Date
  end: Date
}

export const useDoctorAvailability = (doctorId: string) => {
  const [visibleMonth, setVisibleMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedBlock, setSelectedBlock] = useState<SelectedBlock | null>(null);
  const { setValue } = useFormContext<AppointmentRequest>();

  const monthQuery = useQuery({
    queryKey: ['doctor-schedule-month', doctorId, visibleMonth.getFullYear(), visibleMonth.getMonth()],
    queryFn: () => getDoctorAvailabilityByMonth(doctorId, visibleMonth),
    enabled: !!doctorId,
  })

  const dayQuery = useQuery({
    queryKey: ['doctor-schedule-day', doctorId, dayjs(selectedDay).format('YYYY-MM-DD')],
    queryFn: () => getDoctorAvailabilityByDay(doctorId, selectedDay as Date),
    enabled: !!doctorId && !!selectedDay,
    staleTime: 0,
    refetchOnMount: true,
  })

  const fullyBookedDays: Date[] = useMemo(
    () =>
      monthQuery.data?.availability
        ?.filter(day => day.fullyBooked)
        ?.map(day => dayjs(day.date).toDate()) ?? [],
    [monthQuery.data]
  )

  const dailyBlocks: SelectedBlock[] = useMemo(() => {
    if (!dayQuery.data) return []
    const duration = dayQuery.data.appointmentDurationMinutes

    return dayQuery.data.intervals.flatMap(interval => {
      const start = dayjs(interval.start)
      const end = dayjs(interval.end)
      const blocks: SelectedBlock[] = []

      let current = start
      while (current.add(duration, 'minute').isSameOrBefore(end)) {
        blocks.push({
          start: current.toDate(),
          end: current.add(duration, 'minute').toDate(),
        })
        current = current.add(duration, 'minute')
      }
      return blocks
    })
  }, [dayQuery.data])

  const isDayDisabled = (date: Date) => {
    if (dayjs(date).isBefore(dayjs(), 'day')) return true
    return fullyBookedDays.some(d => dayjs(d).isSame(dayjs(date), 'day'))
  }

  const handleMonthChange = (month: Date) => {
    setVisibleMonth(month)
  }

  const handleDayClick = (date: Date) => {
    setSelectedDay(dayjs(date).startOf('day').toDate())
  }

  const handleBlockClick = (block: SelectedBlock) => {
    setSelectedBlock(block)
    setValue('appointmentStart', block.start)
  }

  return {
    visibleMonth,
    selectedDay,
    selectedBlock,
    fullyBookedDays,
    dailyBlocks,
    handleMonthChange,
    handleDayClick,
    handleBlockClick,
    isDayDisabled,
    monthQuery,
    dayQuery,
  }
}