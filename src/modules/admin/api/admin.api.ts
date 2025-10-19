import { handleError } from "@/modules/errors/utils/handle-error";
import axiosInstance from "@/config/axiosInstance";
import type { DoctorRequest } from "../types/DoctorRequest";
import type { SpecialtyReq, SpecialtyRes } from "@/modules/doctors/types/specialty.type";
import type { DoctorPagedResponse } from "../types/DoctorPagedResponse";
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

export const createDoctor = async (request: DoctorRequest): Promise<string> => {
  try {
    const response = await axiosInstance.post(`/auth/register-doctor`, request);
    const message: string = response.data;
    return message;
  } catch (error) {
    throw handleError(error);
  }
}

export const deactivatePatient = async (id: string): Promise<string> => {
  try {
    const response = await axiosInstance.delete(`/patients/${id}`);
    const message: string = response.data;
    return message;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteAllSchedulesByDoctorId = async (doctorId: string): Promise<void> => {
  try {
    await axiosInstance.delete(`/doctor/${doctorId}`);
  } catch (error) {
    throw handleError(error);
  }
};

export const getAllSpecialties = async (): Promise<SpecialtyRes[]> => {
  try {
    const response = await axiosInstance.get<SpecialtyRes[]>("/specialty");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const createSpecialty = async (request: SpecialtyReq): Promise<SpecialtyRes> => {
  try {
    const response = await axiosInstance.post<SpecialtyRes>(
      "/specialty",
      request
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateSpecialty = async (id: number, request: SpecialtyReq): Promise<SpecialtyRes> => {
  try {
    const response = await axiosInstance.put<SpecialtyRes>(
      `/specialty/${id}`,
      request
    );
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};


export const deleteSpecialty = async (id: number): Promise<string> => {
  try {
    const response = await axiosInstance.delete(`/specialty/${id}`);
    const message: string = response.data;
    return message;
  } catch (error) {
    throw handleError(error);
  }
};
