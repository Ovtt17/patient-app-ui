import axiosInstance from "@/config/axiosInstance";
import type { SpecialtyResponse } from "../types/SpecialtyResponse";
import { handleError } from "@/modules/errors/utils/handle-error";

export const getAllSpecialties = async (): Promise<SpecialtyResponse[]> => {
  try {
    const response = await axiosInstance.get<SpecialtyResponse[]>("/specialties");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}