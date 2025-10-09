import { handleError } from "@/modules/errors/utils/handle-error";
import axiosInstance from "@/config/axiosInstance";
import type { AppointmentReq, AppointmentRes } from "@/shared/types/appointment.type";



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

