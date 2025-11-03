import type { FC } from 'react';

interface PatientAvatarProps {
  src?: string;
  alt?: string;
}

export const PatientAvatar: FC<PatientAvatarProps> = ({ src, alt }) => (
  <div className="flex-shrink-0">
    {src ? (
      <img
        src={src}
        alt={alt || 'Paciente'}
        className="w-28 h-28 rounded-full object-cover border border-border shadow-sm"
      />
    ) : (
      <div className="w-28 h-28 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300 font-medium">
        N/A
      </div>
    )}
  </div>
);