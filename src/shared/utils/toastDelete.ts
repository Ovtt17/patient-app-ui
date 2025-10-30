import { toast } from 'react-toastify';
import { toastAction, ToastActionParams } from './toastAction';

export interface ToastDeleteParams<T> extends ToastActionParams<T> {
  undoFn?: () => Promise<any>;
  undoMessage?: string;
  undoPendingMessage?: string;
  undoSuccessMessage?: string;
  undoErrorMessage?: string;
  undoTimeout?: number;
  undoSuccess?: () => void;
}

export async function toastDelete<T>({
  actionFn,
  pendingMessage,
  successMessage,
  errorMessage,
  timeout = 6000,
  onSuccess,
  undoFn,
  undoMessage,
  undoPendingMessage,
  undoSuccessMessage,
  undoErrorMessage,
  undoTimeout = 6000,
  undoSuccess,
}: ToastDeleteParams<T>) {
  const result = await toastAction<T>({
    actionFn,
    pendingMessage,
    successMessage,
    errorMessage,
    timeout,
    onSuccess,
  });

  if (result && undoFn) {
    const undoToastId = toast.warning(undoMessage, {
      autoClose: undoTimeout,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      position: 'bottom-left',
      onClick: async () => {
        try {
          const undoResult = await toastAction({
            actionFn: undoFn,
            pendingMessage: undoPendingMessage,
            successMessage: undoSuccessMessage,
            errorMessage: undoErrorMessage,
            timeout: 3000,
          });

          if (undoResult && undoSuccess) {
            toast.dismiss(undoToastId);
            undoSuccess();
          }
        } catch {
          toast.error(undoErrorMessage);
        }
      },
    });

    setTimeout(() => {
      toast.dismiss(undoToastId);
    }, undoTimeout);

  }
}
