import { useQuery } from "@tanstack/react-query"
import { getAdminDashboard } from "@/modules/appointments/api/dashboard.api"
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { AdminDashboardResponse } from "../types/AdminDashboardResponse";

export const useFetchAdminDashboard = () => {
  const query = useQuery<AdminDashboardResponse>({
    queryKey: ["admin-dashboard"],
    queryFn: getAdminDashboard
  });

  return {
    ...query,
    dashboard: query.data,
    errors: query.error as ProcessedError | null,
    loading: query.isLoading,
  }
}