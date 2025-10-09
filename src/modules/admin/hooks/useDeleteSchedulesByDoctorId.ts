import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllSchedulesByDoctorId } from "../api/admin.api";

export const useDeleteAllSchedulesByDoctorId = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (doctorId: string) => deleteAllSchedulesByDoctorId(doctorId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] });
      queryClient.invalidateQueries({ queryKey: ["doctors"] });
    },
  });
};
