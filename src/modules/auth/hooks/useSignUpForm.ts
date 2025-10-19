import { useForm, type SubmitHandler } from 'react-hook-form';
import type { RegisterRequest } from '../types/register-request.types';
import type { ProcessedError } from '@/modules/errors/types/exception-response.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpValidationSchema } from '../validations/signUpValidationSchema';
import { createUser } from '../api/auth.api';
import type { Role } from '../types/role.types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export function useSignUpForm(role: Role) {
  const defaultUser: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: 'HOMBRE',
    role
  };

  const form = useForm<RegisterRequest>({
    defaultValues: defaultUser,
    resolver: zodResolver(signUpValidationSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: RegisterRequest) => createUser(data),
    onSuccess: () => {
      toast.success('Cuenta creada exitosamente. Por favor, verifica tu correo electrónico para activar tu cuenta.');
      form.reset();
    }
  });

  const onSubmit: SubmitHandler<RegisterRequest> = async (request) => {
    await mutation.mutateAsync(request);
  }

  return {
    form,
    onSubmit,
    error: mutation.error as ProcessedError | null,
  };
}
