import axiosInstance from "@/config/axiosInstance";
import type { AdminDashboardResponse } from "@/modules/admin/types/AdminDashboardResponse";
import type { DoctorDashboardResponse } from "@/modules/doctors/types/DoctorDashboardResponse";
import { handleError } from "@/modules/errors/utils/handle-error";

export const getAdminDashboard = async (): Promise<AdminDashboardResponse> => {
  try {
    const { data } = await axiosInstance.get<AdminDashboardResponse>("/dashboard/admin");
    return data;
  } catch (error) {
    throw handleError(error);
  }
}

export const getDoctorDashboard = async (doctorId: string): Promise<DoctorDashboardResponse> => {
  try {
    const { data } = await axiosInstance.get<DoctorDashboardResponse>(`/dashboard/doctor/${doctorId}`);
    return data;
  } catch (error) {
    throw handleError(error);
  }
}