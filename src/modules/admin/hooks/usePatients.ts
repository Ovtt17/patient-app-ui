import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAllActivePatients } from "../api/admin.api";
import type { PatientPagedRes } from "@/modules/patient/types/patient.page.type";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";


export const useActivePatients = (
  page: number = 0,
  size: number = 20,
  sortBy: string = "createdDate",
  sortOrder: "ASC" | "DESC" = "DESC"
) => {
  return useQuery<PatientPagedRes, ProcessedError>({
    queryKey: ["patients", { page, size, sortBy, sortOrder }],
    queryFn: () => getAllActivePatients(page, size, sortBy, sortOrder),
    placeholderData: keepPreviousData, 
    staleTime: 1000 * 60,  
     retry: 2,
  });
};
