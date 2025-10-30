import { useEffect, useRef } from 'react';
import type { FC } from 'react';
import type { AppointmentResponse } from '../../types/AppointmentResponse';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import AppointmentCard from './AppointmentCard';

dayjs.locale('es');

interface AppointmentTimelineProps {
  appointments: AppointmentResponse[];
}

export const AppointmentTimeline: FC<AppointmentTimelineProps> = ({ appointments }) => {
  const today = dayjs().startOf('day');
  const upcomingAppointments = appointments.filter((a) =>
    dayjs(a.appointmentStart).isSame(today, 'day') ||
    dayjs(a.appointmentStart).isAfter(today)
  );

  const groupedByDate = upcomingAppointments.reduce<Record<string, AppointmentResponse[]>>(
    (acc, appointment) => {
      const date = dayjs(appointment.appointmentStart).format('YYYY-MM-DD');
      if (!acc[date]) acc[date] = [];
      acc[date].push(appointment);
      return acc;
    },
    {}
  );

  const sortedDates = Object.keys(groupedByDate).sort(
    (a, b) => dayjs(a).valueOf() - dayjs(b).valueOf()
  );

  const itemsRef = useRef<(HTMLLIElement | null)[]>(Array(sortedDates.length).fill(null));

  useEffect(() => {
    if (!itemsRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const dot = entry.target.querySelector('.dot');
          if (dot) dot.classList.toggle('active-dot', entry.isIntersecting);
        });
      },
      { root: null, threshold: 0.1 }
    );

    itemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => {
      itemsRef.current.forEach((item) => {
        if (item) observer.unobserve(item);
      });
    };
  }, [sortedDates]);

  if (sortedDates.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-10">
        <p>No hay próximas citas programadas.</p>
      </div>
    );
  }

  return (
    <ol className="timeline">
      {sortedDates.map((date, idx) => {
        const formattedDate = dayjs(date).format('DD [de] MMMM YYYY');
        const dateObj = dayjs(date).startOf('day');
        const daysDiff = dateObj.diff(today, 'day');
        const isToday = daysDiff === 0;
        const daysText =
          isToday
            ? 'Hoy'
            : `Faltan ${daysDiff} ${daysDiff === 1 ? 'día' : 'días'}`;

        const totalAppointments = groupedByDate[date].length;

        return (
          <li
            key={date}
            ref={(el) => { itemsRef.current[idx] = el; }}
            className="appointment-item relative transition-all duration-300"
          >
            {/* Punto de la línea */}
            <div
              className='dot'
            />

            {/* Encabezado */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
              <h3 className="text-lg font-semibold text-foreground">
                Para el día {formattedDate}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className={`font-medium ${isToday ? 'text-primary' : 'text-emerald-600'}`}>
                  {daysText}
                </span>
                <span className="text-foreground/70">
                  {totalAppointments} {totalAppointments === 1 ? 'cita' : 'citas'}
                </span>
              </div>
            </div>

            {/* Citas */}
            <div className="space-y-3">
              {groupedByDate[date]
                .sort(
                  (a, b) =>
                    dayjs(a.appointmentStart).valueOf() -
                    dayjs(b.appointmentStart).valueOf()
                )
                .map((appointment) => (
                  <AppointmentCard key={appointment.id} appointment={appointment} />
                ))}
            </div>
          </li>
        );
      })}
    </ol>
  );
};