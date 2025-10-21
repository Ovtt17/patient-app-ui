import { useAllEntities } from "@/shared/hooks/useAllEntities";
import { getAllSchedules } from "../api/schedule.api";
import type { ScheduleResponse } from "../types/ScheduleResponse";

export const useAllSchedules = (dayOfWeek?: string) => {
  return useAllEntities<ScheduleResponse>(
    dayOfWeek ? `schedules-${dayOfWeek}` : "schedules",
    () => getAllSchedules(dayOfWeek)
  );
};