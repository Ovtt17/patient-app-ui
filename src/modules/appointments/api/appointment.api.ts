import axiosInstance from "@/config/axiosInstance";
import type { AppointmentRequest } from "../types/AppointmentRequest";
import { handleError } from "@/modules/errors/utils/handle-error";

export const createAppointment = async (request: AppointmentRequest): Promise<AppointmentRequest> => {
  try {
    const response = await axiosInstance.post<AppointmentRequest>(`/appointments`, request);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};


export const getAppointmentById = async (id: number): Promise<AppointmentRequest> => {
  try {
    const response = await axiosInstance.get<AppointmentRequest>(`/appointments/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const cancelAppointment = async (appointmentId: number): Promise<void> => {
  try {
    await axiosInstance.post(`/appointments/${appointmentId}/cancel`);
  } catch (error) {
    throw handleError(error);
  }
};

export const getAppointmentsByPatient = async (patientId: string, fromDate?: string): Promise<AppointmentRequest[]> => {
  try {
    const { data } = await axiosInstance.get<AppointmentRequest[]>(`/appointments/patient/${patientId}`,
      { params: fromDate ? { fromDate } : undefined }
    );
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

