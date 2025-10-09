import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatientMedicalInfo } from "../api/doct.api";
import type { Patient } from "@/shared/types/patient.types";
import type { PatientMedicalInfo } from "../types/patient.medicalinfo";


export const useUpdatePatientMedicalInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<Patient, Error, { userId: string; request: PatientMedicalInfo }>({
    mutationFn: ({ userId, request }) => updatePatientMedicalInfo(userId, request),
    onSuccess: (updatedPatient) => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["patient", updatedPatient.id] });
      queryClient.invalidateQueries({ queryKey: ["patientByUser", updatedPatient.userId] });
    },
  });
};
