import { type FC } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import type { AppointmentSummary } from "@/modules/admin/types/AppointmentSummary";
import { AppointmentStatus } from "@/modules/appointments/types/AppointmentStatus";
import { useAuth } from "@/shared/context/auth/useAuth";

interface RecentAppointmentsListProps {
  appointments: AppointmentSummary[];
}

export const RecentAppointmentsList: FC<RecentAppointmentsListProps> = ({ appointments }) => {
  const { isUserDoctor, isUserPatient } = useAuth();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Citas Recientes</h2>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {appointments.map(app => {
          const formattedDate = dayjs(app.date)
            .locale("es")
            .format("DD/MM/YYYY hh:mm A");

          // Condicional: muestra solo el nombre que corresponde
          const userNameDisplay = isUserDoctor
            ? app.patientName
            : isUserPatient
              ? app.doctorName
              : `${app.patientName} con ${app.doctorName}`;

          return (
            <li key={app.id} className="flex justify-between py-2 items-center">
              <div>
                <span className="font-medium">{userNameDisplay}</span>
              </div>

              <div className="text-gray-500 dark:text-gray-400 text-sm">
                {formattedDate}
              </div>

              <div
                className={`ml-4 font-semibold ${app.status === AppointmentStatus.PENDIENTE
                    ? "text-yellow-500"
                    : app.status === AppointmentStatus.CONFIRMADA
                      ? "text-green-500"
                      : app.status === AppointmentStatus.CANCELADA
                        ? "text-red-500"
                        : "text-gray-400"
                  }`}
              >
                {app.status}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};