import { useQuery } from "@tanstack/react-query";
import { getScheduleById } from "../api/doct.api"; 
import type { ScheduleRes } from "../types/schedule.types";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useScheduleById = (id: number) => {
  return useQuery<ScheduleRes, ProcessedError>({
    queryKey: ["schedule", id],
    queryFn: () => getScheduleById(id),
    enabled: Number.isFinite(id) && id > 0, 
    staleTime: 1000 * 60, 
  });
};
