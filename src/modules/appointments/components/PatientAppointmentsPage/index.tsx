import type { FC, JSX } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { CalendarDays, Clock, Clipboard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/shared/components/Loader/Skeleton";
import { appointmentStatusColors } from "../../utils/appointmentStatusColors";
import { useAppointmentsByRole } from "../../hooks/useAppointmentsByRole";
import PageHeader from "@/shared/components/Header/PageHeader";

dayjs.locale("es");

const PatientAppointmentsPage: FC = () => {
  const { data, isLoading, isError } = useAppointmentsByRole();

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-44 w-full rounded-2xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-600 font-medium">
        Ocurrió un error al cargar las citas.
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No tienes citas programadas.
      </div>
    );
  }

  const renderInfoRow = (icon: JSX.Element, text: string) => (
    <div className="flex items-center gap-2">
      {icon}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <PageHeader title="Mis Citas" />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.map((appointment) => (
          <Card
            key={appointment.id}
            className="group hover:shadow-md border border-border rounded-2xl transition-all duration-200"
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div>
                <CardTitle className="text-lg font-semibold text-foreground">
                  {appointment.doctorName}
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  Doctor
                </p>
              </div>
              <Badge
                className={`text-xs px-2 py-1 capitalize font-medium border ${appointmentStatusColors[appointment.status]
                  }`}
              >
                {appointment.status}
              </Badge>
            </CardHeader>

            <CardContent className="space-y-3 text-sm text-muted-foreground pt-0">
              {renderInfoRow(
                <CalendarDays className="h-4 w-4 text-primary" />,
                dayjs(appointment.appointmentStart).format("DD MMMM, YYYY")
              )}
              {renderInfoRow(
                <Clock className="h-4 w-4 text-primary" />,
                dayjs(appointment.appointmentStart).format("hh:mm A")
              )}
              {appointment.reason &&
                renderInfoRow(
                  <Clipboard className="h-4 w-4 text-primary" />,
                  appointment.reason
                )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientAppointmentsPage;