import type { ExceptionResponse, ProcessedError } from "../types/exception-response.types";

export const processExceptionResponse = (errorResponse: ExceptionResponse): ProcessedError => {
  const processedError: ProcessedError = {};

  if (errorResponse.error) {
    processedError.mainError = errorResponse.error;
  }

  if (errorResponse.validationErrors) {
    processedError.validationErrors = Array.from(errorResponse.validationErrors);
  }

  return processedError;
};
