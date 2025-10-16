import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDoctorUnavailability } from "../api/doct.api"; 
import type { DoctorUnavailabilityReq, DoctorUnavailabilityRes } from "../types/doctorUnavailability.types";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useCreateDoctorUnavailability = () => {
  const queryClient = useQueryClient();

  return useMutation<DoctorUnavailabilityRes, ProcessedError, DoctorUnavailabilityReq>({
    mutationFn: (request) => createDoctorUnavailability(request),
    onSuccess: (_res, variables) => {
      // Refresca la lista de ausencias del doctor
      if ((variables as any)?.doctorId) {
        const doctorId = (variables as any).doctorId as string;
        queryClient.invalidateQueries({ queryKey: ["doctor-unavailabilities", doctorId] });
        // si UI muestra disponibilidad agregada
        queryClient.invalidateQueries({ queryKey: ["doctor-availability", doctorId] });
        //  si el calendario depende de schedules
        queryClient.invalidateQueries({ queryKey: ["schedules", doctorId] });
      } else {
        // si el request no trae doctorId, invalida el listado general
        queryClient.invalidateQueries({ queryKey: ["doctor-unavailabilities"] });
      }
    },
  });
};
