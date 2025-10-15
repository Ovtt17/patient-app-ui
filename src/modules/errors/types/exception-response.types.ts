export interface ExceptionResponse {
  businessErrorCode: string;
  businessErrorDescription: string;
  error: string;
  validationErrors?: Set<string>;
}

export interface ProcessedError {
  message: string;
  mainError?: string;
  validationErrors?: string[];
}
