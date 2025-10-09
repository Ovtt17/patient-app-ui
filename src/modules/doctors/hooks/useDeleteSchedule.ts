import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSchedule } from "../api/doct.api"; 

export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteSchedule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
    },
  });
};
