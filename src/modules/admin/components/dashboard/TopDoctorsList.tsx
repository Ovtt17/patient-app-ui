import { type FC } from "react";
import type { DoctorSummary } from "../../types/DoctorSummary";

interface TopDoctorsListProps {
  doctors: DoctorSummary[];
}

export const TopDoctorsList: FC<TopDoctorsListProps> = ({ doctors }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
    <h2 className="text-xl font-semibold mb-4">Doctores Más Activos</h2>
    <ul className="divide-y divide-gray-200 dark:divide-gray-700">
      {doctors.map(doc => (
        <li key={doc.id} className="flex justify-between py-2">
          <span className="font-medium">{doc.fullName}</span>
          <span className="text-indigo-600 font-bold">{doc.appointmentsCount} citas</span>
        </li>
      ))}
    </ul>
  </div>
);
