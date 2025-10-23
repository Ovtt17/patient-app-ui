import type { DoctorAvailabilityResponse } from "../types/DoctorAvailabilityResponse";
import { getAllDoctorAvailability } from "../api/availability.api";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import { useQuery } from "@tanstack/react-query";

export const useDoctorAvailability = () => {
  const {
    data: availability,
    isLoading: loading,
    error,
  } = useQuery<DoctorAvailabilityResponse, ProcessedError>({
    queryKey: ["doctor-availability", "me"],
    queryFn: getAllDoctorAvailability,
    retry: false,
  });

  return {
    availability: availability ?? {} as DoctorAvailabilityResponse,
    loading,
    errors: error ?? null,
  };
};