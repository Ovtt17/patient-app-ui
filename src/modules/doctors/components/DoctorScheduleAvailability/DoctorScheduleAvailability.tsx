import type { FC } from "react";
import type { DoctorAvailabilityResponse } from "../../types/DoctorAvailabilityResponse";
import type { ScheduleResponse } from "../../types/ScheduleResponse";
import { CalendarDays, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface DoctorScheduleAvailabilityProps {
  schedules: ScheduleResponse[];
  availability: DoctorAvailabilityResponse;
}

const dayOrder: Record<string, number> = {
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
  SUNDAY: 7,
};

const dayLabels: Record<string, string> = {
  MONDAY: "Lunes",
  TUESDAY: "Martes",
  WEDNESDAY: "Miércoles",
  THURSDAY: "Jueves",
  FRIDAY: "Viernes",
  SATURDAY: "Sábado",
  SUNDAY: "Domingo",
};

// ✅ Formatea "08:00" o ISO ("2025-10-20T08:00:00Z") → "8:00 am"
const formatTime = (value: string) => {
  try {
    if (!value) return "";
    let date;
    if (value.includes("T")) date = new Date(value);
    else date = parse(value, "HH:mm", new Date());
    return format(date, "hh:mm a", { locale: es }).toLowerCase();
  } catch {
    return value;
  }
};

export const DoctorScheduleAvailability: FC<DoctorScheduleAvailabilityProps> = ({
  schedules,
  availability,
}) => {
  const sortedSchedules = [...schedules].sort(
    (a, b) => dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek]
  );

  const getDayAvailability = (dayOfWeek: string) =>
    availability.availability.find((a) => a.dayOfWeek === dayOfWeek);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sortedSchedules.map((schedule) => {
        const dayAvail = getDayAvailability(schedule.dayOfWeek);

        return (
          <Card
            key={schedule.id}
            className={cn(
              "border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 rounded-2xl overflow-hidden",
              "hover:border-blue-300 hover:bg-blue-50/30",
              "dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-500/40 dark:hover:bg-gray-750/50"
            )}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-100">
                <CalendarDays className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                {dayLabels[schedule.dayOfWeek]}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {formatTime(schedule.startTime)} – {formatTime(schedule.endTime)}
                </span>
              </div>

              {dayAvail ? (
                <div className="space-y-3 mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <span>Fecha:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">
                      {format(new Date(dayAvail.date), "PPP", { locale: es })}
                    </span>
                  </div>

                  {dayAvail.intervals.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-green-700 dark:text-green-400 mb-1">
                        Disponibles
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {dayAvail.intervals.map((i, idx) => (
                          <Badge
                            key={idx}
                            className="bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/40 dark:text-green-300 dark:border-green-800 font-medium px-2 py-1"
                          >
                            {formatTime(i.start)} - {formatTime(i.end)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {dayAvail.unavailable.length > 0 && (
                    <div>
                      <p className="text-sm font-semibold text-red-700 dark:text-red-400 mb-1">
                        No disponibles
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {dayAvail.unavailable.map((u, idx) => (
                          <Badge
                            key={idx}
                            className="bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/40 dark:text-red-300 dark:border-red-800 font-medium px-2 py-1"
                          >
                            {formatTime(u.start)} - {formatTime(u.end)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400 dark:text-gray-500 italic mt-2">
                  Sin disponibilidad registrada
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
