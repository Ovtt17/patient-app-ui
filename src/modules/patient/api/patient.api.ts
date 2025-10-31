import { handleError } from "@/modules/errors/utils/handle-error";
import axiosInstance from "@/config/axiosInstance";
import type { PatientPagedResponse } from "../types/PatientPagedResponse";
import type { PaginationParams } from "@/shared/types/PaginationParams";
import type { PatientResponse } from "../types/PatientResponse";

export const getPatientById = async (id: string): Promise<PatientResponse> => {
  try {
    const response = await axiosInstance.get(`/patients/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getAllActivePatients = async ({
  page = 0,
  size = 20,
  sortBy = "createdDate",
  sortOrder = "desc",
  name,
  email,
  phone
}: PaginationParams
  & { name?: string; email?: string; phone?: string }
): Promise<PatientPagedResponse> => {
  try {
    const response = await axiosInstance.get<PatientPagedResponse>("/patients", {
      params: { page, size, sortBy, sortOrder, name, email, phone },
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};