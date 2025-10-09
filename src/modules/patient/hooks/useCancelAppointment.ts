import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment } from "../api/patient.api";

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (appointmentId: number) => cancelAppointment(appointmentId),

    onSuccess: (_, appointmentId) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointment", appointmentId] });
    },
  });
};
