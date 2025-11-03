import type { AppointmentResponse } from "@/modules/appointments/types/AppointmentResponse";
import type { PatientResponse } from "@/modules/patient/types/PatientResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { MedicalRecordRequest } from "../types/MedicalRecordRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { medicalRecordValidation } from "../validations/medicalRecordValidation";
import { toast } from "react-toastify";
import { createMedicalRecord } from "../api/medical-record.api";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useMedicalRecordForm = (patient: PatientResponse, appointment: AppointmentResponse, onClose: () => void) => {
  const queryClient = useQueryClient();

  const form = useForm<MedicalRecordRequest>({
    defaultValues: {
      patientId: patient.id,
      doctorId: appointment.doctorId,
      appointmentId: appointment.id,
      weight: patient.weight || null,
      height: patient.height || null,
      bloodType: null,
      allergies: null,
      chronicDiseases: null,
      medications: null,
      diagnostic: null,
    },
    resolver: zodResolver(medicalRecordValidation)
  });

  const mutation = useMutation({
    mutationFn: (request: MedicalRecordRequest) => createMedicalRecord(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medical-records-by-patient-id', patient.id] });
      toast.success('Registro médico creado con éxito.');
      onClose();
    }
  });

  const onSubmit: SubmitHandler<MedicalRecordRequest> = async (request) => {
    await mutation.mutateAsync(request);
  }

  return {
    form,
    onSubmit,
    errors: mutation.error as ProcessedError | null,
    isLoading: mutation.isPending
  }
}