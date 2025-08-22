import React from 'react';
import type { ProcessedError } from '../types/exception-response.types';

interface ErrorDisplayProps {
  errors: ProcessedError | null;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ errors }) => {
  if (!errors) return null;

  return (
    <div className="bg-red-100 text-red-500 p-2 rounded mb-2">
      {errors.mainError && <p>{errors.mainError}</p>}
      {errors.validationErrors && errors.validationErrors.map((err: string, index: number) => (
        <p key={index}>{err}</p>
      ))}
    </div>
  );
};

export default ErrorDisplay;