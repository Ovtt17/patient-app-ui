import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format, isSameDay, isBefore, isAfter } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import type { DateRange } from "@/shared/types/DateRange"

interface Props {
  className?: string;
  currentDate: DateRange;
  onDateChange: (date: DateRange) => void;
}

const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()

const generateDays = (year: number, month: number) => {
  const date = new Date(year, month)
  const startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  const days = Array(startDay).fill(null)
  const totalDays = daysInMonth(year, month)

  for (let i = 1; i <= totalDays; i++) {
    days.push(new Date(year, month, i))
  }

  return days
}

const isInRange = (date: Date, from: Date | undefined, to: Date | undefined) => {
  if (!from || !to) return false
  return isAfter(date, from) && isBefore(date, to)
}

const DatePickerWithRange: React.FC<Props> = ({ className, currentDate, onDateChange }) => {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const handleSelect = (selectedDate: Date) => {
    let date: DateRange | null = null;

    // If there is no start date selected or if a complete range is already selected,
    // set the start date to the selected date and reset the end date.
    if (!currentDate.from || (currentDate.from && currentDate.to)) {
      date = { from: selectedDate, to: undefined }
      onDateChange(date)
    }
    // If the selected date is earlier than the current start date,
    // set the selected date as the new start date and the current start date as the end date.
    else if (selectedDate < currentDate.from) {
      date = { from: selectedDate, to: currentDate.from }
      onDateChange(date)
    }
    // In any other case, set the selected date as the new end date of the range.
    else {
      date = { ...currentDate, to: selectedDate }
      onDateChange(date)
    }
  }

  const days = generateDays(currentYear, currentMonth)

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-medium rounded-lg",
              "bg-white dark:bg-boxdark text-gray-800 dark:text-gray-100",
              !currentDate.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-300" />
            {currentDate.from ? (
              currentDate.to ? (
                <>
                  {format(currentDate.from, "LLL dd, y", { locale: es })} - {format(currentDate.to, "LLL dd, y", { locale: es })}
                </>
              ) : (
                format(currentDate.from, "LLL dd, y", { locale: es })
              )
            ) : (
              <span>Selecciona un rango</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-auto p-5 rounded-lg shadow-lg bg-white dark:bg-boxdark-2 border border-gray-200 dark:border-gray-700"
          align="start"
        >
          <div className="flex justify-between items-center mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (currentMonth === 0) {
                  setCurrentMonth(11)
                  setCurrentYear(currentYear - 1)
                } else {
                  setCurrentMonth(currentMonth - 1)
                }
              }}
              className="text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md transition"
            >
              {"<"}
            </Button>

            <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
              {format(new Date(currentYear, currentMonth), "LLLL yyyy", { locale: es })}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (currentMonth === 11) {
                  setCurrentMonth(0)
                  setCurrentYear(currentYear + 1)
                } else {
                  setCurrentMonth(currentMonth + 1)
                }
              }}
              className="text-gray-600 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md transition"
            >
              {">"}
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 select-none">
            {["D", "L", "M", "Mi", "J", "V", "S"].map((d, index) => (
              <div key={`${d}-${index}`}>{d}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, i) => {
              if (!day) return <div key={`empty-${i}`} />

              const selected =
                (currentDate.from && isSameDay(day, currentDate.from)) ||
                (currentDate.to && isSameDay(day, currentDate.to))
              const inRange = isInRange(day, currentDate.from, currentDate.to)
              const isToday = isSameDay(day, today)

              return (
                <button
                  key={`day-${day.getTime()}-${i}`}
                  onClick={() => handleSelect(day)}
                  className={cn(
                    "text-sm rounded-lg p-2 flex items-center justify-center transition-colors",
                    "hover:bg-blue-100 dark:hover:bg-blue-900",
                    selected
                      ? "bg-blue-300 text-blue-900 dark:bg-blue-600 dark:text-white shadow-sm dark:hover:bg-blue-700"
                      : inRange
                        ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-blue-400"
                        : "text-gray-800 dark:text-gray-200",
                    isToday && !selected ? "border border-blue-600 dark:border-blue-400" : "",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500"
                  )}
                  aria-label={`Seleccionar día ${format(day, "d 'de' MMMM 'de' yyyy", { locale: es })}`}
                >
                  {day.getDate()}
                </button>
              )
            })}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DatePickerWithRange