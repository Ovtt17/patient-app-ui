import type { FC } from "react";
import dayjs from "dayjs";
import type { AppointmentResponse } from "../../types/AppointmentResponse";
import AppointmentCard from "./AppointmentCard";

interface TimelineItemProps {
  date: string;
  appointments: AppointmentResponse[];
}

export const TimelineItem: FC<TimelineItemProps> = ({ date, appointments }) => (
  <div className="relative pb-10">
    {/* Punto del timeline */}
    <div className="absolute left-0 top-2 w-4 h-4 -translate-x-1/2 rounded-full bg-primary border-2 border-background shadow-sm z-10" />

    {/* Fecha del bloque */}
    <h3 className="text-lg font-semibold text-foreground mb-4">
      Para el día {dayjs(date).format("DD [de] MMMM YYYY")}
    </h3>

    <div className="space-y-4">
      {appointments
        .sort(
          (a, b) =>
            dayjs(a.appointmentStart).valueOf() -
            dayjs(b.appointmentStart).valueOf()
        )
        .map((appt) => (
          <AppointmentCard key={appt.id} appointment={appt} />
        ))}
    </div>
  </div>
);