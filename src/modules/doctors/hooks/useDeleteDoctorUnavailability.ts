import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoctorUnavailability } from "../api/doct.api";

export const useDeleteDoctorUnavailability = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteDoctorUnavailability(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-unavailabilities"] });
    },
  });
};
