import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../api/patient.api";
import type { AppointmentReq, AppointmentRes } from "@/shared/types/appointment.type";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<AppointmentRes, ProcessedError, AppointmentReq>({
    mutationFn: (request) => createAppointment(request),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
