import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDoctorUnavailability } from "../api/doct.api"; 
import type { DoctorUnavailabilityReq, DoctorUnavailabilityRes } from "../types/doctorUnavailability.types";

export const useCreateDoctorUnavailability = () => {
  const queryClient = useQueryClient();

  return useMutation<DoctorUnavailabilityRes, Error, DoctorUnavailabilityReq>({
    mutationFn: (request) => createDoctorUnavailability(request),
    onSuccess: (_res, variables) => {
      // 🚀 Refresca la lista de ausencias del doctor
      if ((variables as any)?.doctorId) {
        const doctorId = (variables as any).doctorId as string;
        queryClient.invalidateQueries({ queryKey: ["doctor-unavailabilities", doctorId] });
        // Opcional: si tu UI muestra disponibilidad agregada
        queryClient.invalidateQueries({ queryKey: ["doctor-availability", doctorId] });
        // Opcional: si tu calendario depende de schedules
        queryClient.invalidateQueries({ queryKey: ["schedules", doctorId] });
      } else {
        // Si el request no trae doctorId, invalida el listado general
        queryClient.invalidateQueries({ queryKey: ["doctor-unavailabilities"] });
      }
    },
  });
};
