import { handleError } from "@/modules/errors/utils/handle-error";
import axiosInstance from "@/config/axiosInstance";
import type { AppointmentReq, AppointmentRes } from "@/shared/types/appointment.type";
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
}: PaginationParams): Promise<PatientPagedResponse> => {
  try {
    const response = await axiosInstance.get<PatientPagedResponse>("/patients", {
      params: { page, size, sortBy, sortOrder },
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const createAppointment = async ( request : AppointmentReq) : Promise<AppointmentRes> => {
  try {
    const response = await axiosInstance.post<AppointmentRes>(`/appointments`, request);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getAppointmentById = async ( id : number) : Promise<AppointmentRes> => {
  try {
    const response = await axiosInstance.get<AppointmentRes>(`/appointments/${id}`);
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

export const getAppointmentsByPatient = async (patientId : string, fromDate? : string) : Promise<AppointmentRes[]> => {
  try {
    const { data } = await axiosInstance.get<AppointmentRes[]>(`/appointments/patient/${patientId}`,
      { params: fromDate ? { fromDate } : undefined }
    );
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

