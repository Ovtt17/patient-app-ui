import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoctorMedicalInfo } from "../api/doct.api";
import type { DoctorMedicalInfo } from "../types/doctor.medicalinfo";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { DoctorResponse } from "../types/DoctorResponse";

export const useUpdateDoctorMedicalInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<DoctorResponse, ProcessedError, { userId: string; request: DoctorMedicalInfo }>({
    mutationFn: ({ userId, request }) => updateDoctorMedicalInfo(userId, request),
    onSuccess: (updatedDoctor) => {

      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor", updatedDoctor.id] });
    },
  });
};
