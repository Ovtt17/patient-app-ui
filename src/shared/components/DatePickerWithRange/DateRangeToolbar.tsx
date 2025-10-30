import type { DateRange } from "@/shared/types/DateRange";
import type { FC } from "react";
import DatePickerWithRange from "./DatePickerWithRange";

interface DateRangeToolbarProps {
  date: DateRange;
  onDateChange: (date: DateRange) => void;
  onCurrentMonth: () => void;
}

const DateRangeToolbar: FC<DateRangeToolbarProps> = ({ date, onDateChange, onCurrentMonth }) => (
  <div className="flex flex-col md:flex-row md:items-center items-end justify-end gap-2 md:gap-4">
    <div>
      <DatePickerWithRange
        className="w-full md:w-auto"
        currentDate={date}
        onDateChange={onDateChange}
      />
    </div>
    <div className="flex gap-2">
      <button
        onClick={onCurrentMonth}
        className="px-4 py-2 rounded bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors"
      >
        Mes Actual
      </button>
    </div>
  </div>
);

export default DateRangeToolbar;
