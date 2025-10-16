import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSchedule } from "../api/doct.api"; 
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ProcessedError, number>({
    mutationFn: (id: number) => deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};
