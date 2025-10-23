import { useState } from "react";
import { mockDoctors } from "@/modules/doctors/mocks/mockDoctors";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CheckIcon } from "@heroicons/react/24/solid";
import { mockAvailability } from "@/modules/doctors/mocks/availability";
import PageHeader from "@/shared/components/Header/PageHeader";

export const ScheduleAppointmentPage = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedInterval, setSelectedInterval] = useState<{ date: string; intervalIndex: number } | null>(null);

  const handleSelectDoctor = (doctorId: string) => {
    setSelectedDoctorId(doctorId);
    setSelectedInterval(null);
  };

  const handleSelectInterval = (date: string, intervalIndex: number) => {
    setSelectedInterval({ date, intervalIndex });
  };

  const availabilityForDoctor = selectedDoctorId ? mockAvailability.availability : [];

  return (
    <section>
      <PageHeader title="Agendar Nueva Cita" />
      {/* Selección de doctor */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {mockDoctors.map((doctor) => (
          <button
            key={doctor.id}
            className={`p-5 rounded-3xl border shadow-lg transition transform hover:scale-105
              ${selectedDoctorId === doctor.id
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700"
              }`}
            onClick={() => handleSelectDoctor(doctor.id)}
          >
            <p className="font-semibold text-lg">{`${doctor.firstName} ${doctor.lastName}`}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{doctor.specialties.join(", ")}</p>
          </button>
        ))}
      </div>

      {/* Disponibilidad en “grid cards” */}
      {selectedDoctorId && (
        <div className="space-y-6 mt-8">
          {availabilityForDoctor.map((day) => (
            <div key={day.date} className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 shadow-inner">
              <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
                {format(parseISO(day.date), "EEEE, dd MMM yyyy", { locale: es })}
              </h2>
              <div className="flex flex-wrap gap-3 justify-start">
                {day.intervals.map((interval, idx) => {
                  const isUnavailable = day.unavailable.some(
                    (u) => u.start === interval.start && u.end === interval.end
                  );
                  const isSelected =
                    selectedInterval?.date === day.date && selectedInterval?.intervalIndex === idx;

                  return (
                    <button
                      key={interval.start}
                      disabled={isUnavailable}
                      className={`px-4 py-2 rounded-xl border font-medium transition duration-200 flex items-center gap-1
                        ${isUnavailable
                          ? "bg-red-100 dark:bg-red-700 text-red-700 cursor-not-allowed"
                          : isSelected
                            ? "bg-blue-500 text-white border-blue-600 shadow-lg"
                            : "bg-green-100 dark:bg-green-700 text-green-900 hover:bg-green-200 dark:hover:bg-green-600"
                        }`}
                      onClick={() => handleSelectInterval(day.date, idx)}
                    >
                      {format(parseISO(interval.start), "hh:mm a", { locale: es }).toLowerCase()} -{" "}
                      {format(parseISO(interval.end), "hh:mm a", { locale: es }).toLowerCase()}
                      {isSelected && <CheckIcon className="w-4 h-4" />}
                    </button>
                  );
                })}

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmar cita */}
      {selectedInterval && selectedDoctorId && (
        <div className="mt-8 text-center">
          <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-700 transition transform hover:scale-105">
            Confirmar Cita
          </button>
        </div>
      )}
    </section>
  );
};
