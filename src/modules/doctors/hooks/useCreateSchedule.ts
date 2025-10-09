import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSchedule } from "../api/doct.api";
import type { ScheduleReq, ScheduleRes } from "../types/schedule.types";

export const useCreateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation<ScheduleRes, Error, ScheduleReq>({
    mutationFn: (request: ScheduleReq) => createSchedule(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};
