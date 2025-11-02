import { type FC } from "react";
import type { AppointmentSummary } from "../../types/AppointmentSummary";

interface RecentAppointmentsListProps {
  appointments: AppointmentSummary[];
}

export const RecentAppointmentsList: FC<RecentAppointmentsListProps> = ({ appointments }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
    <h2 className="text-xl font-semibold mb-4">Citas Recientes</h2>
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {appointments.map(app => (
        <li key={app.id} className="flex justify-between py-2 items-center">
          <div>
            <span className="font-medium">{app.patientName}</span> con{" "}
            <span className="text-gray-700 dark:text-gray-300">{app.doctorName}</span>
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">
            {new Date(app.date).toLocaleString("es-ES")}
          </div>
          <div className={`ml-4 font-semibold ${app.status === "PENDIENTE" ? "text-yellow-500" :
              app.status === "CONFIRMADA" ? "text-green-500" :
                app.status === "CANCELADA" ? "text-red-500" : "text-gray-400"
            }`}>
            {app.status}
          </div>
        </li>
      ))}
    </ul>
  </div>
);
