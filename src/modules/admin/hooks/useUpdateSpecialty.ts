import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSpecialty } from "../api/admin.api"; 
import type { SpecialtyReq, SpecialtyRes } from "../../doctors/types/specialty.type";

export const useUpdateSpecialty = () => {
  const queryClient = useQueryClient();

  return useMutation<SpecialtyRes, Error, { id: number; request: SpecialtyReq }>({
    mutationFn: ({ id, request }) => updateSpecialty(id, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
    },
  });
};
