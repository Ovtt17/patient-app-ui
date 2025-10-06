import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSpecialty } from "../api/admin.api";
import type { SpecialtyReq, SpecialtyRes } from "../../doctors/types/specialty.type";

export const useCreateSpecialty = () => {
  const queryClient = useQueryClient();

  return useMutation<SpecialtyRes, Error, SpecialtyReq>({
    mutationFn: (request: SpecialtyReq) => createSpecialty(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
    },
  });
};
