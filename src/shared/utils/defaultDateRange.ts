import { endOfMonth, startOfMonth } from "date-fns";
import type { DateRange } from "../types/DateRange";

export const defaultDateRange: DateRange = {
  from: startOfMonth(new Date()),
  to: endOfMonth(new Date()),
}