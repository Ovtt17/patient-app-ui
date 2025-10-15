import { handleError } from "@/modules/errors/utils/handle-error";
import axiosInstance from "@/config/axiosInstance";
import type { DoctorMedicalInfo } from "../types/doctor.medicalinfo";
import type { PatientMedicalInfo } from "../types/patient.medicalinfo";;
import type { ScheduleRes, ScheduleReq, DayOfWeek } from "../types/schedule.types";
import type { DoctorUnavailabilityReq, DoctorUnavailabilityRes } from "../types/doctorUnavailability.types";
import type { DoctorAvailabilityRes } from "../types/doctorAvailability.type";
import type { SpecialtyRes } from "../types/specialty.type";
import type { AppointmentReq, AppointmentRes, AppointmentStatus } from "@/shared/types/appointment.type";
import type { Doctor } from "../types/doctor.types";
import type { Patient } from "@/modules/patient/types/patient.types";


export const updateDoctorMedicalInfo = async (userId: string, request: DoctorMedicalInfo) : Promise<Doctor> => {
  try {
    const response = await axiosInstance.put(`/doctors/${userId}/medical-info`, request);
    const doctor: Doctor = response.data;
    return doctor;
  } catch (error) {
    throw handleError(error);
  }
};

export const getPatientById = async (id: string) : Promise<Patient> => {
  try {
    const response = await axiosInstance.get(`/patients/${id}`);
    const patient: Patient = response.data;
    return patient;
  } catch (error) {
    throw handleError(error);
  }
};

export const getPatientByUserId = async (userId: string) : Promise<Patient> => {
  try {
    const response = await axiosInstance.get(`/patients/user/${userId}`);
    const patient: Patient = response.data;
    return patient;
  } catch (error) {
    throw handleError(error);
  }
};

export const updatePatientMedicalInfo = async (userId: string,request : PatientMedicalInfo) : Promise<Patient> => {
  try {
    const response = await axiosInstance.put(`/patients/${userId}/medical-info`, request);
    const patient: Patient = response.data;
    return patient;
  } catch (error) {
    throw handleError(error);
  }
};

export const deactivatePatient = async (id: string) : Promise<string> => {
  try {
    const response = await axiosInstance.delete(`/patients/${id}`);
    const message: string = response.data; 
    return message;
  } catch (error) {
    throw handleError(error);
  }
};

export const createSchedule = async (request: ScheduleReq) : Promise<ScheduleRes> => {
  try {
    const response = await axiosInstance.post("/schedules", request);
    const schedule: ScheduleRes = response.data;
    return schedule;
  } catch (error) {
    throw handleError(error);
  }
};

export const getSchedulesByDoctor = async (doctorId: string, dayOfWeek?: DayOfWeek) : Promise<ScheduleRes[]> => {
  try {
    const response = await axiosInstance.get(`/schedules/doctor/${doctorId}`, {
      params: dayOfWeek ? { dayOfWeek } : {},
    });
    const schedules: ScheduleRes[] = response.data;
    return schedules;
  } catch (error) {
    throw handleError(error);
  }
};

export const getScheduleById = async (id: number) : Promise<ScheduleRes> => {
  try {
    const response = await axiosInstance.get(`/schedules/${id}`);
    const schedule: ScheduleRes = response.data;
    return schedule;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateSchedule = async (id: number, request: ScheduleReq) : Promise<ScheduleRes> => {
  try {
    const response = await axiosInstance.put(`/schedules/${id}`, request);
    const schedule: ScheduleRes = response.data;
    return schedule;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteSchedule = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/schedules/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};

export const createDoctorUnavailability = async (request: DoctorUnavailabilityReq) : Promise<DoctorUnavailabilityRes> => {
  try {
    const response = await axiosInstance.post("/doctor-unavailabilities", request);
    const unavailability: DoctorUnavailabilityRes = response.data;
    return unavailability;
  } catch (error) {
    throw handleError(error);
  }
};

export const getDoctorUnavailabilitiesByDoctorId = async (doctorId: string) : Promise<DoctorUnavailabilityRes[]> => {
  try {
    const response = await axiosInstance.get(`/doctor-unavailabilities/doctor/${doctorId}`);
    const unavailabilities: DoctorUnavailabilityRes[] = response.data;
    return unavailabilities;
  } catch (error) {
    throw handleError(error);
  }
};

export const deleteDoctorUnavailability = async (id: number) : Promise<void> => {
  try {
    await axiosInstance.delete(`/doctor-unavailabilities/${id}`);
  } catch (error) {
    throw handleError(error);
  }
};

export const getDoctorAvailabilityByDoctorId = async ( doctorId: string) : Promise<DoctorAvailabilityRes> => {
  try {
    const response = await axiosInstance.get(`/doctor-availability/${doctorId}`);
    const availability: DoctorAvailabilityRes = response.data;
    return availability;
  } catch (error) {
    throw handleError(error);
  }
};

export const getAllSpecialties = async () : Promise<SpecialtyRes[]> => {
  try {
    const response = await axiosInstance.get<SpecialtyRes[]>(`/specialty`);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
};


export const getSpecialtyById = async (id : number) : Promise<SpecialtyRes> => {
  try {
    const response = await axiosInstance.get<SpecialtyRes>(`/specialty/${id}`);
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

export const getAppointmentsByDoctor = async (doctorId : string, fromDate? : string) : Promise<AppointmentRes[]> => {
  try {
    const { data } = await axiosInstance.get<AppointmentRes[]>(`/appointments/doctor/${doctorId}`,
      { params: fromDate ? { fromDate } : undefined }
    );
    return data;
  } catch (error) {
    throw handleError(error);
  }
};

export const updateAppointmentStatus = async (appointmentId : number, status : AppointmentStatus) : Promise<void> => {
  try {
    await axiosInstance.patch(`/appointments/${appointmentId}/status`, null, { params: { status },});
  } catch (error) {
    throw handleError(error);
  }
};



