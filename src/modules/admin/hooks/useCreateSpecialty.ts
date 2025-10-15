import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSpecialty } from "../api/admin.api";
import type { SpecialtyReq, SpecialtyRes } from "../../doctors/types/specialty.type";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useCreateSpecialty = () => {
  const queryClient = useQueryClient();

  return useMutation<SpecialtyRes, ProcessedError, SpecialtyReq>({
    mutationFn: (request: SpecialtyReq) => createSpecialty(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["specialties"] });
    },
  });
};
