import axiosInstance from "@/config/axiosInstance";
import type { DoctorPagedResponse } from "@/modules/doctors/types/DoctorPagedResponse";
import { handleError } from "@/modules/errors/utils/handle-error";
import type { PaginationParams } from "@/shared/types/PaginationParams";

export const getAllDoctors = async ({
  page = 0,
  size = 20,
  sortBy = "createdDate",
  sortOrder = "desc",
}: PaginationParams): Promise<DoctorPagedResponse> => {
  try {
    const response = await axiosInstance.get<DoctorPagedResponse>("/doctors", {
      params: { page, size, sortBy, sortOrder },
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};