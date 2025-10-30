import { toastAction, ToastActionParams } from './toastAction';

export async function toastCreate<T>({
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
