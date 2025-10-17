import { useQuery, keepPreviousData } from '@tanstack/react-query';
import type { ProcessedError } from '@/modules/errors/types/exception-response.types';
import type { PaginatedResponse } from '../types/PaginatedResponse';
import type { PaginationParams } from '../types/PaginationParams';

interface UsePaginatedEntitiesOptions<T> extends PaginationParams {
  key: string;
  fetcher: (params: PaginationParams) => Promise<PaginatedResponse<T>>;
  enabled?: boolean;
}

export const usePaginatedEntities = <T>({
  key,
  page = 0,
  size = 20,
  sortBy = "createdDate",
  sortOrder = "desc",
  fetcher,
  enabled = true,
}: UsePaginatedEntitiesOptions<T>) => {
  const currentPage = page > 0 ? page - 1 : 0;

  const query = useQuery<PaginatedResponse<T>, ProcessedError>({
    queryKey: [key, currentPage, size, sortBy, sortOrder],
    queryFn: () => fetcher({ page: currentPage, size, sortBy, sortOrder }),
    staleTime: 5 * 60 * 1000,
    retry: 1,
    placeholderData: keepPreviousData,
    enabled,
  });

  return {
    entities: query.data?.content ?? [],
    totalPages: query.data?.totalPages ?? 0,
    totalElements: query.data?.totalElements ?? 0,
    page: query.data?.page ?? currentPage,
    loading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
