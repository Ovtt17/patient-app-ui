import { useState, type FC } from "react";
import { APPOINTMENT_STATUSES, type AppointmentStatus } from "../../types/AppointmentStatus";
import { useAppointmentFilters } from "../../context/AppointmentFiltersContext";

const AppointmentStatusDropdown: FC = () => {
  const { filters, updateFilters } = useAppointmentFilters();
  const [selected, setSelected] = useState<AppointmentStatus | "">(
    filters.status || ""
  );

  const handleChange = (value: AppointmentStatus | "") => {
    setSelected(value);
    updateFilters({ status: value || undefined });
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Estado de la cita
      </label>
      <select
        value={selected}
        onChange={(e) => handleChange(e.target.value as AppointmentStatus | "")}
        className="
          w-full cursor-pointer py-3.5 px-4 rounded-lg border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm
          focus:outline-none focus:ring-2 focus:ring-indigo-400 transition
        "
      >
        <option value="">Todas las citas</option>
        {APPOINTMENT_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AppointmentStatusDropdown;
