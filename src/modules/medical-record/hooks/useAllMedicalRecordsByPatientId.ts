import type { ProcessedError } from "@/modules/errors/types/exception-response.types"
import { useQuery } from "@tanstack/react-query"
import { getAllMedicalRecordsByPatientId } from "../api/medical-record.api"

export const useAllMedicalRecordsByPatientId = (patientId: string) => {
  const query = useQuery({
    queryKey: ['medical-records-by-patient-id', patientId],
    queryFn: getAllMedicalRecordsByPatientId(patientId),
    enabled: !!patientId
  })

  return {
    medicalRecords: query.data,
    isLoading: query.isLoading,
    error: query.error as ProcessedError | null
  }
}