import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePagination } from "@/shared/hooks/usePagination";
import { initializePaginationParams } from "@/shared/utils/urlParamsUtils";
import type { SortOrder } from "@/shared/types/SortOrder";
import type { PatientResponse } from "../types/PatientResponse";
import { getAllActivePatients } from "../api/patient.api";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import { useQuery } from "@tanstack/react-query";
import type { PaginatedResponse } from "@/shared/types/PaginatedResponse";

export const usePaginatedPatients = () => {
  const prefix = "patients";
  const defaultSize = 20;

  const { page, size, setPagination } = usePagination(prefix);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');


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

  const { data, isLoading, error, refetch } = useQuery<PaginatedResponse<PatientResponse>, ProcessedError>({
    queryKey: [prefix, page, size, sortBy, sortOrder, searchName, searchEmail, searchPhone],
    queryFn: () => getAllActivePatients({
      page: page > 0 ? page - 1 : 0,
      size,
      sortBy,
      sortOrder,
      name: searchName,
      email: searchEmail,
      phone: searchPhone
    })
  });

  const handlePageChange = (page: number) => {
    setPagination(page, size);
  }

  const handleSizeChange = (newSize: number) => {
    const firstPage = 1;
    setPagination(firstPage, newSize);
  }

  return {
    patients: data?.content || [],
    page,
    size,
    totalPages: data?.totalPages || 0,
    totalElements: data?.totalElements || 0,
    loading: isLoading,
    errors: error as ProcessedError | null,
    refetch,
    setPagination,
    handlePageChange,
    handleSizeChange,
    searchName,
    setSearchName,
    searchEmail,
    setSearchEmail,
    searchPhone,
    setSearchPhone
  };
};