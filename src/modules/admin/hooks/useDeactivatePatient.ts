import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivatePatient } from "../api/admin.api"; 

export const useDesactivatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, string>({
    mutationFn: (id: string) => deactivatePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
