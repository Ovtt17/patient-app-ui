import type { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import type { ChangePasswordRequest } from '../types/ChangePasswordRequest';
import { useLocation } from 'react-router-dom';
import { changePassword } from '../api/auth.api';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import PasswordInput from '@/shared/components/Input/PasswordInput';
import { useAuth } from '@/shared/context/auth/useAuth';

const ChangePassword: FC = () => {
  const { logout } = useAuth();
  const methods = useForm<ChangePasswordRequest>({
    defaultValues: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
  });

  const location = useLocation();
  const { userFullName } = location.state as {
    userId: string;
    userFullName: string;
    fromLogin?: boolean;
  };

  const mutation = useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),
    onSuccess: () => {
      toast.success("Contraseña actualizada correctamente");
      logout();
    },
    onError: (err: unknown) => {
      console.error(err);
      toast.error("Error al actualizar la contraseña");
    },
  });

  const onSubmit = async (data: ChangePasswordRequest) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    await mutation.mutateAsync(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white text-center">
          Hola, {userFullName} 👋
        </h2>
        <p className="text-center mb-4 text-gray-600 dark:text-gray-300">
          Necesitamos que cambies tu contraseña para continuar.
        </p>
        <p className="text-center mb-6 text-xs text-gray-500 dark:text-gray-400">
          Probablemente la contraseña actual sea temporal enviada a tu correo. Si ya estabas usando otra contraseña, introdúcela aquí.
        </p>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <PasswordInput
              id="oldPassword"
              label="Contraseña actual"
              placeholder="Ingresa tu contraseña actual"
            />
            <PasswordInput
              id="newPassword"
              label="Nueva contraseña"
              placeholder="Ingresa tu nueva contraseña"
            />
            <PasswordInput
              id="confirmNewPassword"
              label="Confirmar nueva contraseña"
              placeholder="Confirma tu nueva contraseña"
            />

            <Button
              type="submit"
              disabled={mutation.isPending}
              className="mt-2 w-full bg-gradient-to-br from-primary to-secondary hover:to-secondary-hover text-white font-semibold py-3 rounded-lg"
            >
              {mutation.isPending ? "Actualizando..." : "Actualizar contraseña"}
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ChangePassword;
