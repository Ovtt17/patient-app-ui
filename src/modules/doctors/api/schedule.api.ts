import axiosInstance from "@/config/axiosInstance";
import type { ScheduleResponse } from "../types/ScheduleResponse";
import { handleError } from "@/modules/errors/utils/handle-error";
import type { ScheduleRequest } from "../types/ScheduleRequest";

export const createSchedule = async (request: ScheduleRequest): Promise<ScheduleResponse> => {
  try {
    const response = await axiosInstance.post<ScheduleResponse>("/schedules", request);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getScheduleById = async (id: number): Promise<ScheduleResponse> => {
  try {
    const response = await axiosInstance.get<ScheduleResponse>(`/schedules/${id}`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const getAllSchedules = async (dayOfWeek?: string): Promise<ScheduleResponse[]> => {
  try {
    const response = await axiosInstance.get<ScheduleResponse[]>("/schedules/me", {
      params: { dayOfWeek },
    });
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateSchedule = async (id: number, request: ScheduleRequest): Promise<ScheduleResponse> => {
  try {
    const response = await axiosInstance.put<ScheduleResponse>(`/schedules/${id}`, request);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};
