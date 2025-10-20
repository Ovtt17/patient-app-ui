import type { ProcessedError } from '@/modules/errors/types/exception-response.types';
import { useQuery } from '@tanstack/react-query';

interface EntityWithId<T = number | string> {
  id: T;
}

interface UseFetchByIdOptions<Response extends EntityWithId<IdType>, IdType> {
  id: IdType | null;
  fetchById: (id: IdType) => Promise<Response>;
  queryKeyPrefix?: string; // opcional para personalizar queryKey
}

const useFetchById = <Response extends EntityWithId<IdType>, IdType = number | string>({
  id,
  fetchById,
  queryKeyPrefix = 'entity'
}: UseFetchByIdOptions<Response, IdType>) => {

  const query = useQuery<Response, ProcessedError>({
    queryKey: [queryKeyPrefix, id],
    queryFn: () => fetchById(id!),
    enabled: id !== null, // solo ejecuta si hay ID
    retry: 1 // opcional: reintenta 1 vez si falla
  });

  return {
    entity: query.data ?? null,
    loading: query.isLoading,
    error: query.error ?? null,
    refetch: query.refetch
  };
};

export default useFetchById;