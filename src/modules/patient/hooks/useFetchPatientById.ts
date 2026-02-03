import { useQuery } from "@tanstack/react-query";
import { getPatientById } from "../api/patient.api";
import type { PatientResponse } from "../types/PatientResponse";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useFetchPatientById = (patientId?: string) => {
  const query = useQuery<PatientResponse>({
    queryKey: ["patient", patientId],
    queryFn: () => getPatientById(patientId!),
    enabled: !!patientId,
  });

  return {
    ...query,
    patient: query.data,
    errors: query.error as ProcessedError | null,
    isLoading: query.isLoading,
  };
};
