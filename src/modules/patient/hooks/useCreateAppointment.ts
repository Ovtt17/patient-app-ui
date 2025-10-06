import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "../api/patient.api";
import type { AppointmentReq, AppointmentRes } from "@/shared/types/appointment.type";

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation<AppointmentRes, Error, AppointmentReq>({
    mutationFn: (request) => createAppointment(request),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
};
