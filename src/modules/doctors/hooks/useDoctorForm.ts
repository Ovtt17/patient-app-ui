import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { DoctorResponse } from "../types/DoctorResponse";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { DoctorMedicalInfo } from "../types/DoctorMedicalInfo";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorMedicalValidation } from "../validations/doctorMedicalValidation";
import { updateMedicalInfo } from "../api/doctor.api";
import { toast } from "react-toastify";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useDoctorForm = (doctor: DoctorResponse, onClose: () => void) => {
  const queryClient = useQueryClient();

  const form = useForm<DoctorMedicalInfo>({
    defaultValues: {
      ...doctor,
      specialtyIds: doctor.specialties?.map(spec => spec.id) || []
    },
    resolver: zodResolver(doctorMedicalValidation)
  });

  const mutation = useMutation({
    mutationFn: (request: DoctorMedicalInfo) => updateMedicalInfo(doctor.userId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctor-by-user-id', doctor.userId] });
      toast.success('Información médica del doctor actualizada con éxito.');
      onClose();
    }
  });

  const onSubmit: SubmitHandler<DoctorMedicalInfo> = async (request) => {
    await mutation.mutateAsync(request);
  }

  return {
    form,
    onSubmit,
    error: mutation.error as ProcessedError | null,
    isLoading: mutation.isPending
  }
}