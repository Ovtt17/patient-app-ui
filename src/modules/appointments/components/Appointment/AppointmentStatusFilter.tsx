import { useState, type FC } from 'react';
import { APPOINTMENT_STATUSES, type AppointmentStatus } from '../../types/AppointmentStatus';
import { useAppointmentFilters } from '../../context/AppointmentFiltersContext';

interface AppointmentStatusFilterProps { }

const AppointmentStatusFilter: FC<AppointmentStatusFilterProps> = () => {
  const { filters, updateFilters } = useAppointmentFilters();

  const [selected, setSelected] = useState<AppointmentStatus | undefined>(filters.status);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const statusSelected = e.target.value as AppointmentStatus;
    setSelected(statusSelected);
    updateFilters({ status: statusSelected || undefined });
  };

  return (
    <div className="flex justify-end w-full my-3">
      <div className="w-full sm:w-56">
        <label
          className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1"
        >
          Estado de la cita
        </label>
        <div className="relative">
          <select
            value={selected}
            onChange={handleChange}
            className="w-full cursor-pointer appearance-none py-3 pl-4 pr-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-boxdark text-sm text-gray-800 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
            aria-label="Selecciona el estado de la cita"
          >
            <option value="">TODAS LAS CITAS</option>
            {APPOINTMENT_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          {/* Icono de flecha */}
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStatusFilter;