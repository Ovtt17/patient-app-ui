import { useForm, type SubmitHandler } from "react-hook-form";
import type { AppointmentRequest } from "../types/AppointmentRequest";
import { useMutation } from "@tanstack/react-query";
import { createAppointment } from "../api/appointment.api";
import { toast } from "react-toastify";
import { useAuth } from "@/shared/context/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/shared/constants/routes";

export const useAppointmentForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const form = useForm<AppointmentRequest>({
    defaultValues: {
      doctorId: '',
      userId: user?.id || '',
      appointmentStart: null,
      reason: null,
    },
  });

  const mutation = useMutation({
    mutationFn: (request: AppointmentRequest) => createAppointment(request),
    onSuccess: () => {
      toast.success('Cita creada con éxito');
      form.reset();
      navigate(Routes.APPOINTMENTS);
    }
  });

  const onSubmit: SubmitHandler<AppointmentRequest> = async (request) => {
    await mutation.mutateAsync(request);
  }

  return {
    form,
    onSubmit
  }
}