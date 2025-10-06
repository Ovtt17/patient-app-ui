import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDoctor } from "../api/admin.api";
import type { DoctorRequest } from "../types/doctor-request.types";

export const useCreateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, DoctorRequest>({
    mutationFn: (request: DoctorRequest) => createDoctor(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["doctores"] });
    },
  });
};
