import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePatientMedicalInfo } from "../api/doct.api";
import type { PatientMedicalInfo } from "../types/patient.medicalinfo";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { Patient } from "@/modules/patient/types/patient.types";


export const useUpdatePatientMedicalInfo = () => {
  const queryClient = useQueryClient();

  return useMutation<Patient, ProcessedError, { userId: string; request: PatientMedicalInfo }>({
    mutationFn: ({ userId, request }) => updatePatientMedicalInfo(userId, request),
    onSuccess: (updatedPatient) => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      queryClient.invalidateQueries({ queryKey: ["patient", updatedPatient.id] });
      queryClient.invalidateQueries({ queryKey: ["patientByUser", updatedPatient.userId] });
    },
  });
};
