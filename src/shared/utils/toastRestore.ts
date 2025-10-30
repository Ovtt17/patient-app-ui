import { toastAction, ToastActionParams } from './toastAction';

export async function toastRestore<T>({
  actionFn,
  pendingMessage,
  successMessage,
  errorMessage,
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