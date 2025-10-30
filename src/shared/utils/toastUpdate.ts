import { toastAction, type ToastActionParams } from './toastAction';

export async function toastUpdate<T>({
  actionFn,
  pendingMessage = 'Actualizando...',
  successMessage = 'Actualizado correctamente',
  errorMessage = 'Error al actualizar',
  timeout = 3000,
  onSuccess,
}: ToastActionParams<T>) {
  return toastAction({
    actionFn,
    pendingMessage,
    successMessage,
    errorMessage,
    timeout,
    onSuccess,
  });
}
