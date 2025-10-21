import type { ProcessedError } from '@/modules/errors/types/exception-response.types';
import { useQuery } from '@tanstack/react-query';

export const useAllEntities = <T>(key: string, fetchEntities: () => Promise<T[]>) => {
  const query = useQuery<T[], ProcessedError>({
    queryKey: [key],
    queryFn: fetchEntities,
    // staleTime: 5 * 60 * 1000, // opcional: cache 5 minutos
    retry: 1,                  // opcional: reintentar 1 vez
  });

  return {
    entities: query.data ?? [],
    loading: query.isLoading,
    errors: query.error ?? null,
    refetch: query.refetch,
  };
};