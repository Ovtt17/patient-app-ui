import { useQuery } from "@tanstack/react-query";
import { getScheduleById } from "../api/doct.api"; 
import type { ScheduleRes } from "../types/schedule.types";

export const useScheduleById = (id: number) => {
  return useQuery<ScheduleRes, Error>({
    queryKey: ["schedule", id],
    queryFn: () => getScheduleById(id),
    enabled: Number.isFinite(id) && id > 0, 
    staleTime: 1000 * 60, 
  });
};
