import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { RegisterRequest } from '../types/register-request.types';
import { useNavigate } from 'react-router-dom';
import type { ProcessedError } from '@/modules/errors/types/exception-response.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpValidationSchema } from '../validations/signUpValidationSchema';
import { createUser } from '../api/auth.api';
import { Routes } from '@/shared/constants/routes';

const defaultUser: RegisterRequest = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

export function useSignUpForm() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<ProcessedError | null>(null);

  const form = useForm<RegisterRequest>({
    defaultValues: defaultUser,
    resolver: zodResolver(signUpValidationSchema),
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const message = await createUser(data);
      setSuccessMessage(message);
      form.reset(defaultUser);
    } catch (err) {
      setError(err as ProcessedError);
    }
  };

  const handleSuccessClose = () => {
    setSuccessMessage(null);
    navigate(Routes.ACTIVATE_ACCOUNT);
  }

  return {
    form,
    onSubmit,
    successMessage,
    handleSuccessClose,
    error,
    setError,
  };
}
