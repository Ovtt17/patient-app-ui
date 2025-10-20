import { useNavigate, useParams } from "react-router-dom";
import type { SpecialtyRequest } from "../types/SpecialtyRequest";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { specialtyValidationSchema } from "../validations/specialtyValidationSchema";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createSpecialty, getSpecialtyById, updateSpecialty } from "../api/specialty.api";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { RoutesAdmin } from "@/modules/admin/routes/RoutesAdmin";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";

export const useSpecialtyForm = () => {
  const navigate = useNavigate();
  const { id: specialtyId } = useParams<{ id: string }>();
  const isEdit = !!specialtyId;

  const defaultSpecialty: SpecialtyRequest = {
    name: "",
    description: ""
  }

  const form = useForm<SpecialtyRequest>({
    defaultValues: defaultSpecialty,
    resolver: zodResolver(specialtyValidationSchema),
  });

  const {
    data: specialty,
    error
  } = useQuery({
    queryKey: ['specialty', specialtyId],
    queryFn: () => getSpecialtyById(Number(specialtyId)),
    enabled: isEdit && !!specialtyId,
  });

  useEffect(() => {
    if (specialty) {
      form.reset(specialty);
    }
  }, [specialty, form, specialtyId]);

  const mutation = useMutation({
    mutationFn: (request: SpecialtyRequest) => isEdit && specialtyId
      ? updateSpecialty(Number(specialtyId), request)
      : createSpecialty(request),
    onSuccess: () => {
      toast.success(`Especialidad ${isEdit ? 'actualizada' : 'creada'} exitosamente.`);
      navigate(RoutesAdmin.ADMIN_SPECIALTIES);
    }
  })

  const onSubmit: SubmitHandler<SpecialtyRequest> = async (data) => {
    await mutation.mutateAsync(data);
  }

  return {
    form,
    onSubmit,
    isEdit,
    error: mutation.error as ProcessedError | null,
    errorFetch: error as ProcessedError | null,
  }

}