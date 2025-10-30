import { ProcessedError } from '@/app/error/processErrorResponse';
import { toast } from 'react-toastify';

export interface ToastActionParams<T> {
  actionFn: () => Promise<T>;
  pendingMessage?: string | ((data?: any) => string);
  successMessage?: string | ((data?: T) => string);
  errorMessage?: string | ((error?: any) => string);
  timeout?: number;
  onSuccess?: (data: T) => Promise<void>;
}

function isProcessedError(obj: any): obj is ProcessedError {
  return obj && typeof obj === 'object' && ('mainError' in obj || 'validationErrors' in obj);
}

export async function toastAction<T>({
  actionFn,
  pendingMessage,
  successMessage,
  errorMessage,
  timeout = 3000,
  onSuccess,
}: ToastActionParams<T>): Promise<T | undefined> {
  try {
    const result = await toast.promise(actionFn(), {
      pending: typeof pendingMessage === 'function' ? pendingMessage() : pendingMessage,
      success: {
        render: (data) =>
          typeof successMessage === 'function' ? successMessage(data.data) : successMessage,
        autoClose: timeout,
      },
      error: {
        render: (data) => {
          const raw = data.data;
          let parsed: ProcessedError;

          if (isProcessedError(raw)) {
            parsed = raw;
          } else {
            const fallback = typeof errorMessage === 'function' ? errorMessage(raw) : errorMessage;
            parsed = { mainError: fallback };
          }

          return (
            <div className="text-sm space-y-1">
              <p className="font-semibold">{parsed.mainError}</p>
              {(parsed.validationErrors?.length ?? 0) > 0 && (
                <ul className="list-disc pl-5 text-xs text-gray-100">
                  {parsed.validationErrors?.map((msg, i) => (
                    <li key={i}>{msg}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        },
        autoClose: timeout + 2000,
      },
    }, {
      position: 'bottom-left',
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      theme: 'colored',
    });

    if (onSuccess) await onSuccess(result);
    return result;

  } catch {
    // No es necesario hacer nada aquí: toast ya maneja la notificación.
    return undefined;
  }
}
