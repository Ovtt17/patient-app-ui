import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpecialty } from "../api/admin.api"; 

export const useDeleteSpecialty = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, number>({
    mutationFn: (id: number) => deleteSpecialty(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
    },
  });
};
