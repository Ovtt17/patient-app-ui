import { useQuery } from '@tanstack/react-query';
import type { AppointmentResponse } from '../types/AppointmentResponse';

interface UseAppointmentsBaseProps {
  queryKey: string[];
  fetchFn: () => Promise<AppointmentResponse[]>;
}

export const useAppointmentsBase = ({ queryKey, fetchFn }: UseAppointmentsBaseProps) => {
  return useQuery({
    queryKey,
    queryFn: fetchFn,
    staleTime: 1000 * 60 * 5,
  });
};