import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDoctorUnavailability } from "../api/doct.api";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useDeleteDoctorUnavailability = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ProcessedError, number>({
    mutationFn: (id: number) => deleteDoctorUnavailability(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctor-unavailabilities"] });
    },
  });
};
