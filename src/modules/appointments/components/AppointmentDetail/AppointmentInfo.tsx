import type { FC } from 'react';
import dayjs from 'dayjs';
import type { AppointmentResponse } from '../../types/AppointmentResponse';

interface AppointmentInfoProps {
  appointment: AppointmentResponse;
}

export const AppointmentInfo: FC<AppointmentInfoProps> = ({ appointment }) => {
  const formatDateTime = (date?: string) => (date ? dayjs(date).format('DD/MM/YYYY hh:mm A') : 'N/A');

  return (
    <div className="p-6 bg-whiter dark:bg-gray-800 rounded-xl shadow-lg space-y-3 text-sm text-gray-800 dark:text-gray-200">
      <h2 className="text-lg font-semibold">Información de la Cita</h2>
      <p><span className="font-medium">Fecha:</span> {formatDateTime(appointment.appointmentStart)}</p>
      <p><span className="font-medium">Motivo:</span> {appointment.reason || 'N/A'}</p>
      <p><span className="font-medium">Estado:</span> {appointment.status || 'N/A'}</p>
    </div>
  );
};
