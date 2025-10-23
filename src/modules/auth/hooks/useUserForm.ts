import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidation } from "../validations/userValidation";
import type { UserRequest } from "../types/UserRequest";
import { updateUser } from "../api/user.api";
import { toast } from "react-toastify";
import type { ProcessedError } from "@/modules/errors/types/exception-response.types";
import { useFetchUserProfile } from "./useFetchUserProfile";

export const useUserForm = (onClose: () => void) => {
  const queryClient = useQueryClient();
  const {
    user,
    isLoading
  } = useFetchUserProfile();

  const form = useForm<UserRequest>({
    defaultValues: user || {},
    resolver: zodResolver(userValidation)
  });

  const mutation = useMutation({
    mutationFn: (request: UserRequest) => updateUser(user?.id || '', request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Información de personal actualizada con éxito.');
      onClose();
    }
  })

  const onSubmit: SubmitHandler<UserRequest> = async (request) => {
    await mutation.mutateAsync(request);
  }

  return {
    form,
    onSubmit,
    error: mutation.error as ProcessedError | null,
    isLoading: isLoading || mutation.isPending
  }
}