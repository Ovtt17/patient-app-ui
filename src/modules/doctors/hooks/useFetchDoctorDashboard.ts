import { useQuery } from "@tanstack/react-query"
import type { DoctorDashboardResponse } from "../types/DoctorDashboardResponse";
import { useAuth } from "@/shared/context/auth/useAuth";
import { getDoctorDashboard } from "@/modules/appointments/api/dashboard.api";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useFetchDoctorDashboard = () => {
  const { user } = useAuth();

  const query = useQuery<DoctorDashboardResponse>({
    queryKey: ["doctor-dashboard"],
    queryFn: () => getDoctorDashboard(user?.doctorId!),
    enabled: !!user?.doctorId,
  });

  return {
    ...query,
    dashboard: query.data,
    errors: query.error as ProcessedError | null,
    loading: query.isLoading,
  }
}