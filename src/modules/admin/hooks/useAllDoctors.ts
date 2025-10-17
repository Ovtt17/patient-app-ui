import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { usePagination } from "@/shared/hooks/usePagination";
import { initializePaginationParams } from "@/shared/utils/urlParamsUtils";
import { usePaginatedEntities } from "@/shared/hooks/usePaginatedEntities";
import { getAllDoctors } from "../api/admin.api";
import type { DoctorResponse } from "@/modules/doctors/types/DoctorResponse";
import type { SortOrder } from "@/shared/types/SortOrder";


export const useAllDoctors = () => {
  const prefix = "doctors";
  const defaultSize = 20;

  const { page, size, setPagination } = usePagination(prefix);
  const [searchParams, setSearchParams] = useSearchParams();

  // Inicializa los parámetros de paginación al cargar el componente
  useEffect(() => {
    const params = initializePaginationParams(
      new URLSearchParams(searchParams),
      prefix,
      defaultSize
    );
    setSearchParams(params);
  }, [searchParams, setSearchParams]);

  const sortBy = searchParams.get("sortBy") || "createdDate";
  const sortOrder: SortOrder = (searchParams.get('sortOrder') as SortOrder) || 'asc';


  const {
    entities: doctors,
    totalPages,
    totalElements,
    loading,
    error,
    refetch,
  } = usePaginatedEntities<DoctorResponse>({
    key: prefix,
    page,
    size,
    sortBy,
    sortOrder,
    fetcher: getAllDoctors
  });

  const handlePageChange = (page: number) => {
    setPagination(page, size);
  }

  const handleSizeChange = (newSize: number) => {
    const firstPage = 1;
    setPagination(firstPage, newSize);
  }

  return {
    doctors,
    page,
    size,
    totalPages,
    totalElements,
    loading,
    error,
    refetch,
    setPagination,
    handlePageChange,
    handleSizeChange
  };
};
