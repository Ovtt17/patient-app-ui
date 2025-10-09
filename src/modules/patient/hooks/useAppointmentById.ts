import { useQuery } from "@tanstack/react-query";
import { getAppointmentById } from "../api/patient.api";
import type { AppointmentRes } from "@/shared/types/appointment.type";

export const useAppointmentById = (id: number) => {
  return useQuery<AppointmentRes, Error>({
    queryKey: ["appointment", id],
    queryFn: () => getAppointmentById(id),
    enabled: Number.isFinite(id) && id > 0, 
    staleTime: 1000 * 60, 
  });
};
