import axiosInstance from "@/config/axiosInstance";
import type { SpecialtyResponse } from "../types/SpecialtyResponse";
import { handleError } from "@/modules/errors/utils/handle-error";
import type { SpecialtyRequest } from "../types/SpecialtyRequest";

export const createSpecialty = async (request: SpecialtyRequest): Promise<SpecialtyResponse> => {
  try {
    const response = await axiosInstance.post<SpecialtyResponse>("/specialties", request);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

export const getSpecialtyById = async (id: number): Promise<SpecialtyResponse> => {
  try {
    const response = await axiosInstance.get<SpecialtyResponse>(`/specialties/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

export const getAllSpecialties = async (): Promise<SpecialtyResponse[]> => {
  try {
    const response = await axiosInstance.get<SpecialtyResponse[]>("/specialties");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

export const updateSpecialty = async (id: number, request: SpecialtyRequest): Promise<SpecialtyResponse> => {
  try {
    const response = await axiosInstance.put<SpecialtyResponse>(`/specialties/${id}`, request);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}
