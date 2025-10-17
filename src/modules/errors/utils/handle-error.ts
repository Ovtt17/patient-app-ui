import axios from "axios";
import type { ExceptionResponse, ProcessedError } from "../types/exception-response.types";

export const processExceptionResponse = (exception: ExceptionResponse): ProcessedError => ({
  mainError: exception.error || exception.businessErrorDescription,
  validationErrors: exception.validationErrors ? Array.from(exception.validationErrors) : undefined
});

export const handleError = (error: unknown): ProcessedError => {
  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      const exceptionResponse = error.response.data as ExceptionResponse;
      return processExceptionResponse(exceptionResponse);
    }
    return { mainError: "Error en la solicitud. No se recibió una respuesta del servidor." };
  }

  if (error instanceof TypeError) {
    return { mainError: "No se pudo conectar con el servidor. Por favor, intente más tarde." };
  }

  if (error instanceof Error) {
    return { mainError: error.message };
  }

  return { mainError: "Ha ocurrido un error inesperado. Por favor, intente de nuevo o contacte al administrador." };
};
