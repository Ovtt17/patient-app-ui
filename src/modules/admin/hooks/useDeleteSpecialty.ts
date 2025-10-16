import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpecialty } from "../api/admin.api"; 
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useDeleteSpecialty = () => {
  const queryClient = useQueryClient();

  return useMutation<string, ProcessedError, number>({
    mutationFn: (id: number) => deleteSpecialty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
    },
  });
};
