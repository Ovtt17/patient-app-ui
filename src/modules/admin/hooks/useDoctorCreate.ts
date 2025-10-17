import { useMutation } from "@tanstack/react-query";
import { createDoctor } from "../api/admin.api";
import type { DoctorRequest } from "../types/DoctorRequest";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { doctorRequestValidation } from "../validations/doctorRequestValidation";
import { useNavigate } from "react-router-dom";
import { RoutesAdmin } from "../routes/RoutesAdmin";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

const defaultDoctor: DoctorRequest = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  gender: "HOMBRE",
}

export const useDoctorCreate = () => {
  const navigate = useNavigate();

  const form = useForm<DoctorRequest>({
    defaultValues: defaultDoctor,
    resolver: zodResolver(doctorRequestValidation)
  });

  const mutation = useMutation({
    mutationFn: (doctor: DoctorRequest) => createDoctor(doctor),
    onSuccess: () => navigate(RoutesAdmin.ADMIN_DOCTORS)
  });

  const handleSubmit: SubmitHandler<DoctorRequest> = async (doctor) => {
    await mutation.mutateAsync(doctor);
  };

  return {
    form,
    handleSubmit,
    error: mutation.error as ProcessedError | null,
    isPending: mutation.isPending,
  };
};
