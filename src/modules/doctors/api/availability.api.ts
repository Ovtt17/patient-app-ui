import axiosInstance from "@/config/axiosInstance"
import { handleError } from "@/modules/errors/utils/handle-error";
import type { DoctorMonthAvailabilityResponse } from "../types/DoctorMonthAvailabilityResponse";
import type { DoctorDayAvailabilityResponse } from "../types/DoctorDayAvailabilityResponse";

export const getDoctorAvailabilityByMonth = async (doctorId: string, month: Date): Promise<DoctorMonthAvailabilityResponse> => {
  try {
    const response = await axiosInstance.get<DoctorMonthAvailabilityResponse>(`/doctor-availability/${doctorId}/month-availability`, {
      params: {
        month: month.getUTCMonth() + 1, // Los meses en JavaScript son base 0
      }
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}

export const getDoctorAvailabilityByDay = async (doctorId: string, date: Date): Promise<DoctorDayAvailabilityResponse> => {
  try {
    const response = await axiosInstance.get<DoctorDayAvailabilityResponse>(`/doctor-availability/${doctorId}/day-availability`, {
      params: {
        date: date.toISOString().split('T')[0], // Formato "YYYY-MM-DD"
      }
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}
