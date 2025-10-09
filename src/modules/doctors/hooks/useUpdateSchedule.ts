import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSchedule } from "../api/doct.api"; 
import type { ScheduleReq, ScheduleRes } from "../types/schedule.types";

export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation<ScheduleRes, Error, { id: number; data: ScheduleReq }>({
    mutationFn: ({ id, data }) => updateSchedule(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};
