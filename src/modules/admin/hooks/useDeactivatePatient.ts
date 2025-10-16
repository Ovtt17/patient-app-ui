import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deactivatePatient } from "../api/admin.api"; 
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useDesactivatePatient = () => {
  const queryClient = useQueryClient();

  return useMutation<string, ProcessedError, string>({
    mutationFn: (id: string) => deactivatePatient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
    },
  });
};
