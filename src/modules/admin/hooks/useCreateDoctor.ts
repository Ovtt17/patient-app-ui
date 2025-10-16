import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDoctor } from "../api/admin.api";
import type { DoctorRequest } from "../types/doctor-request.types";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation<string, ProcessedError, DoctorRequest>({
    mutationFn: (request: DoctorRequest) => createDoctor(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctores"] });
    },
  });
};
