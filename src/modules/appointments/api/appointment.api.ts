import axiosInstance from "@/config/axiosInstance";
import type { AppointmentRequest } from "../types/AppointmentRequest";
import { handleError } from "@/modules/errors/utils/handle-error";
import type { AppointmentResponse } from "../types/AppointmentResponse";
import type { AppointmentFilter } from "../types/AppointmentFilter";
import type { AppointmentStatus } from "../types/AppointmentStatus";

export const createAppointment = async (request: AppointmentRequest): Promise<AppointmentResponse> => {
  try {
    const response = await axiosInstance.post<AppointmentResponse>(`/appointments`, request);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};


export const getAppointmentById = async (id: number): Promise<AppointmentResponse> => {
  try {
    const response = await axiosInstance.get<AppointmentResponse>(`/appointments/${id}`);
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

export const getAppointmentsByPatient = async (patientId: string, fromDate?: Date): Promise<AppointmentResponse[]> => {
  try {
    const { data } = await axiosInstance.get<AppointmentResponse[]>(`/appointments/patient/${patientId}`,
      { params: fromDate ? { fromDate } : undefined }
    );
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getAppointmentsByDoctor = async (doctorId: string, fromDate?: Date): Promise<AppointmentResponse[]> => {
  try {
    const { data } = await axiosInstance.get<AppointmentResponse[]>(`/appointments/doctor/${doctorId}`,
      { params: fromDate ? { fromDate } : undefined }
    );
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getAppointmentsFiltered = async (filter: AppointmentFilter): Promise<AppointmentResponse[]> => {
  try {
    const { data } = await axiosInstance.post<AppointmentResponse[]>(`/appointments/filter`, filter);
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export const updateAppointmentStatus = async (appointmentId: number, status: AppointmentStatus): Promise<number> => {
  try {
    const response = await axiosInstance.patch(`/appointments/${appointmentId}/status`, {}, {
      params: { status }
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};