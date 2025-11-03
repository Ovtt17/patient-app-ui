import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import type { PatientResponse } from "../types/PatientResponse";
import type { PatientMedicalInfo } from "../types/PatientMedicalInfo";
import { patientMedicalValidation } from "../validations/patientMedicalValidation";
import { updatePatientMedicalInfo } from "../api/patient.api";

export const usePatientForm = (patient: PatientResponse, onClose: () => void) => {
  const queryClient = useQueryClient();

  const form = useForm<PatientMedicalInfo>({
    defaultValues: {
      weight: patient.weight || null,
      height: patient.height || null,
      birthDate: patient.birthDate || null,
      notes: patient.notes || null,
    },
    resolver: zodResolver(patientMedicalValidation)
  });

  const mutation = useMutation({
    mutationFn: (request: PatientMedicalInfo) => updatePatientMedicalInfo(patient.userId, request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient', patient.id] });
      toast.success('Información médica del paciente actualizada con éxito.');
      onClose();
    }
  });

  const onSubmit: SubmitHandler<PatientMedicalInfo> = async (data) => {
    await mutation.mutateAsync(data);
  };

  return {
    form,
    onSubmit,
    error: mutation.error as ProcessedError | null,
    isLoading: mutation.isPending
  };
};
