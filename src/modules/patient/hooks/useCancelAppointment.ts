import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment } from "../api/patient.api";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ProcessedError, number>({
    mutationFn: (appointmentId: number) => cancelAppointment(appointmentId),

    onSuccess: (_, appointmentId) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointment", appointmentId] });
    },
  });
};
