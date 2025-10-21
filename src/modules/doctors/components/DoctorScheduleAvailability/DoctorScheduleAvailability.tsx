import type { FC } from "react";
import type { DoctorAvailabilityResponse } from "../../types/DoctorAvailabilityResponse";
import type { ScheduleResponse } from "../../types/ScheduleResponse";
import { CalendarDays, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parse } from "date-fns";
import { es } from "date-fns/locale";

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

// ✅ Función robusta que maneja "08:00" o ISO completo ("2025-10-20T08:00:00Z")
const formatTime = (value: string) => {
  try {
    if (!value) return "";
    let date;

    if (value.includes("T")) {
      // viene en formato ISO
      date = new Date(value);
    } else {
      // viene como "HH:mm" → se interpreta como hora local
      date = parse(value, "HH:mm", new Date());
    }

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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sortedSchedules.map((schedule) => {
        const dayAvail = getDayAvailability(schedule.dayOfWeek);

        return (
          <Card
            key={schedule.id}
            className="shadow-sm border border-gray-200 hover:shadow-md transition-all"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                {dayLabels[schedule.dayOfWeek]}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex items-center gap-2 text-gray-700 mb-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-medium">
                  {formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}
                </span>
              </div>

              {dayAvail ? (
                <>
                  <p className="text-sm text-gray-500 mb-1">
                    Fecha:{" "}
                    {format(new Date(dayAvail.date), "PPP", { locale: es })}
                  </p>

                  <div className="space-y-2">
                    {dayAvail.intervals.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-green-700 mb-1">
                          Disponibles:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {dayAvail.intervals.map((i, idx) => (
                            <Badge
                              key={idx}
                              className="bg-green-100 text-green-800 border-green-300"
                            >
                              {formatTime(i.start)} - {formatTime(i.end)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {dayAvail.unavailable.length > 0 && (
                      <div>
                        <p className="text-sm font-medium text-red-700 mb-1">
                          No disponibles:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {dayAvail.unavailable.map((u, idx) => (
                            <Badge
                              key={idx}
                              className="bg-red-100 text-red-800 border-red-300"
                            >
                              {formatTime(u.start)} - {formatTime(u.end)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-400 italic mt-2">
                  Sin disponibilidad registrada.
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
