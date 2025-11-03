import { handleError } from "@/modules/errors/utils/handle-error";
import type { MedicalRecordRequest } from "../types/MedicalRecordRequest";
import type { MedicalRecordResponse } from "../types/MedicalRecordResponse";
import axiosInstance from "@/config/axiosInstance";

export const createMedicalRecord = async (request: MedicalRecordRequest): Promise<MedicalRecordResponse> => {
  try {
    const { data } = await axiosInstance.post<MedicalRecordResponse>('/medical-records', request);
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export const getAllMedicalRecordsByPatientId = (patientId: string) => async (): Promise<MedicalRecordResponse[]> => {
  try {
    const { data } = await axiosInstance.get<MedicalRecordResponse[]>(`/medical-records/patient/${patientId}`);
    return data;
  } catch (error) {
    throw handleError(error);
  }
}