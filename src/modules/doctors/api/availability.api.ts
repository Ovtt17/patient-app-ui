import axiosInstance from "@/config/axiosInstance"
import type { DoctorAvailabilityResponse } from "../types/DoctorAvailabilityResponse";
import { handleError } from "@/modules/errors/utils/handle-error";

export const getAllDoctorAvailability = async (): Promise<DoctorAvailabilityResponse> => {
  try {
    const response = await axiosInstance.get<DoctorAvailabilityResponse>("/doctor-availability/me");
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}