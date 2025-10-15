import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAppointmentStatus } from "../api/doct.api";
import type { AppointmentStatus } from "@/shared/types/appointment.type";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<void, ProcessedError, { appointmentId: number; status: AppointmentStatus }>({
    mutationFn: ({ appointmentId, status }) =>
      updateAppointmentStatus(appointmentId, status),

    onSuccess: (_, { appointmentId }) => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      queryClient.invalidateQueries({ queryKey: ["appointment", appointmentId] });
    },
  });
};
