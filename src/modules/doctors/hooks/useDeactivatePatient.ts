import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivatePatient } from "../api/doct.api";

export const useDeactivatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: (id: string) => deactivatePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
