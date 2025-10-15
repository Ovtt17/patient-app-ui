import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllSchedulesByDoctorId } from "../api/admin.api";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useDeleteAllSchedulesByDoctorId = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ProcessedError, string>({
    mutationFn: (doctorId: string) => deleteAllSchedulesByDoctorId(doctorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};
