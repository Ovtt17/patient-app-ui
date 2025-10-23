import { useQuery } from "@tanstack/react-query"
import { getCurrentUserInfo } from "../api/auth.api"
import { useAuth } from "@/shared/context/auth/useAuth"

export const useFetchUserProfile = () => {
  const { isAuthenticated } = useAuth();

  const query = useQuery({
    queryKey: ['user'],
    queryFn: () => getCurrentUserInfo(),
    enabled: isAuthenticated,
  });

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
  }
}