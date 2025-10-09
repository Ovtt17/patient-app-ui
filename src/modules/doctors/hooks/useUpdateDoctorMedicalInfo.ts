import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDoctorMedicalInfo } from "../api/doct.api";
import type { DoctorMedicalInfo } from "../types/doctor.medicalinfo";
import type { Doctor } from "@/shared/types/doctor.types";

export const useUpdateDoctorMedicalInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<Doctor, Error, { userId: string; request: DoctorMedicalInfo }>({
    mutationFn: ({ userId, request }) => updateDoctorMedicalInfo(userId, request),
    onSuccess: (updatedDoctor) => {

      queryClient.invalidateQueries({ queryKey: ["doctors"] });
      queryClient.invalidateQueries({ queryKey: ["doctor", updatedDoctor.id] });
    },
  });
};
