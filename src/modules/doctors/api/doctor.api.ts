import axiosInstance from "@/config/axiosInstance";
import type { DoctorPagedResponse } from "@/modules/doctors/types/DoctorPagedResponse";
import { handleError } from "@/modules/errors/utils/handle-error";
import type { PaginationParams } from "@/shared/types/PaginationParams";
import type { DoctorResponse } from "../types/DoctorResponse";

export const getAllDoctors = async (): Promise<DoctorResponse[]> => {
  try {
    const response = await axiosInstance.get<DoctorResponse[]>(`/doctors/all`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

export const getPaginatedDoctors = async ({
  page = 0,
  size = 20,
  sortBy = "createdDate",
  sortOrder = "desc",
}: PaginationParams): Promise<DoctorPagedResponse> => {
  try {
    const response = await axiosInstance.get<DoctorPagedResponse>("/doctors/paged", {
      params: { page, size, sortBy, sortOrder },
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getDoctorByUserId = async (userId: string): Promise<DoctorResponse> => {
  try {
    const response = await axiosInstance.get<DoctorResponse>(`/doctors/user/${userId}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

export const updateMedicalInfo = async (userId: string, request: Partial<DoctorResponse>): Promise<DoctorResponse> => {
  try {
    const response = await axiosInstance.put<DoctorResponse>(`/doctors/${userId}/medical-info`, request);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}