import { useNavigate, useParams } from "react-router-dom";
import type { ScheduleRequest } from "../types/ScheduleRequest";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { scheduleValidationSchema } from "../validations/scheduleValidationSchema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSchedule,
  getScheduleById,
  updateSchedule,
} from "../api/schedule.api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import { RoutesDoctor } from "../routes/RoutesDoctor";

export const useScheduleForm = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id: scheduleId } = useParams<{ id: string }>();
  const isEdit = !!scheduleId;

  const defaultSchedule: ScheduleRequest = {
    dayOfWeek: "MONDAY",
    startTime: "08:00",
    endTime: "16:00"
  };

  const form = useForm<ScheduleRequest>({
    defaultValues: defaultSchedule,
    resolver: zodResolver(scheduleValidationSchema),
  });

  const { data: schedule, error } = useQuery({
    queryKey: ["schedule", scheduleId],
    queryFn: () => getScheduleById(Number(scheduleId)),
    enabled: isEdit && !!scheduleId,
  });

  useEffect(() => {
    if (schedule) {
      form.reset(schedule);
    }
  }, [schedule, form, scheduleId]);

  const mutation = useMutation({
    mutationFn: (request: ScheduleRequest) =>
      isEdit && scheduleId
        ? updateSchedule(Number(scheduleId), request)
        : createSchedule(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) =>
          Array.isArray(query.queryKey) && query.queryKey[0] === "schedules",
      });
      toast.success(`Horario ${isEdit ? "actualizado" : "creado"} exitosamente.`);
      navigate(RoutesDoctor.DOCTOR_SCHEDULES);
    },
  });

  const onSubmit: SubmitHandler<ScheduleRequest> = async (data) => {
    await mutation.mutateAsync(data);
  };

  useEffect(() => {
    if (form.formState.errors) {
      console.log("Form Errors:", form.formState.errors);
    }
  }, [form.formState.errors]);

  return {
    form,
    onSubmit,
    isEdit,
    error: mutation.error as ProcessedError | null,
    errorFetch: error as ProcessedError | null,
  };
};