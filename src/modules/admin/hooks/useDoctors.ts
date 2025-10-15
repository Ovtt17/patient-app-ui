import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllDoctors } from "../api/admin.api";
import type { DoctorPagedRes } from "../types/doctor.page.type";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";


interface UseDoctoresParams {
  page?: number;
  size?: number;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export const useDoctores = ({
  page = 0,
  size = 20,
  sortBy = "createdDate",
  sortOrder = "DESC",
}: UseDoctoresParams = {}) => {
  return useQuery<DoctorPagedRes, ProcessedError>({
    queryKey: ["doctors", page, size, sortBy, sortOrder],
    queryFn: () => getAllDoctors(page, size, sortBy, sortOrder),
    staleTime: 1000 * 60, 
    placeholderData: keepPreviousData, 
    retry: 2,
  });
};

