import { useQuery } from "@tanstack/react-query"
import { getDoctorByUserId } from "../api/doctor.api"
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useFetchDoctorByUserId = (userId: string) => {
  const query = useQuery({
    queryKey: ["doctor-by-user-id", userId],
    queryFn: () => getDoctorByUserId(userId),
    enabled: !!userId,
  });

  return {
    doctor: query.data,
    isLoading: query.isLoading,
    error: query.error as ProcessedError | null,
  }
}