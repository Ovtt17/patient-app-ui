import type { FC } from "react";
import { Clock, CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ScheduleResponse } from "../../types/ScheduleResponse";
import { parse, format } from "date-fns";
import { es } from "date-fns/locale";

interface ScheduleGridProps {
  schedules: ScheduleResponse[];
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

const formatTime = (time: string) => {
  try {
    // Interpretamos la hora como local (sin convertir zona)
    const date = parse(time, "HH:mm", new Date());
    return format(date, "hh:mm a", { locale: es }).toLowerCase();
  } catch {
    return time;
  }
};

export const ScheduleGrid: FC<ScheduleGridProps> = ({ schedules }) => {
  const sorted = [...schedules].sort(
    (a, b) => dayOrder[a.dayOfWeek] - dayOrder[b.dayOfWeek]
  );

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {sorted.map((s) => (
        <Card
          key={s.id}
          className={cn(
            "shadow-sm border border-gray-200 hover:shadow-md transition-all"
          )}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-blue-500" />
              {dayLabels[s.dayOfWeek]}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-medium">
                {formatTime(s.startTime)} - {formatTime(s.endTime)}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};