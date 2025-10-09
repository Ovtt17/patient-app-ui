import { useQuery } from "@tanstack/react-query";
import { getSchedulesByDoctor } from "../api/doct.api";
import type { DayOfWeek,ScheduleRes } from "../types/schedule.types";

export const useSchedulesByDoctor = (doctorId: string, dayOfWeek?: DayOfWeek) => {
  return useQuery<ScheduleRes[], Error>({
    queryKey: ["schedules", doctorId, dayOfWeek],
    queryFn: () => getSchedulesByDoctor(doctorId, dayOfWeek),
    enabled: !!doctorId, 
    staleTime: 1000 * 60, 
  });
};
