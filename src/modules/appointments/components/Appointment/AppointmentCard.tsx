import type { FC } from "react";
import { useState } from "react";
import dayjs from "dayjs";
import { Clock, Clipboard, User2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AppointmentResponse } from "../../types/AppointmentResponse";
import { useAuth } from "@/shared/context/auth/useAuth";
import Select from "@/shared/components/Select/Select";
import { toastUpdate } from "@/shared/utils/toastUpdate";
import { updateAppointmentStatus } from "../../api/appointment.api";
import { useQueryClient } from "@tanstack/react-query";
import { useAppointmentFilters } from "../../context/AppointmentFiltersContext";

interface AppointmentCardProps {
  appointment: AppointmentResponse;
}

const selectStyles: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-700/80 dark:text-yellow-300",
  CONFIRMADA: "bg-green-100 text-green-800 border-green-200 dark:bg-green-700/80 dark:text-green-300",
  CANCELADA: "bg-red-100 text-red-800 border-red-200 dark:bg-red-700/80 dark:text-red-300",
  COMPLETADA: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700/80 dark:text-gray-300",
  AUSENTE: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-700/80 dark:text-orange-300",
};

const optionStyles: Record<string, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-200",
  CONFIRMADA: "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-200",
  CANCELADA: "bg-red-100 text-red-900 dark:bg-red-900 dark:text-red-200",
  COMPLETADA: "bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-200",
  AUSENTE: "bg-orange-100 text-orange-900 dark:bg-orange-900 dark:text-orange-200",
};

const AppointmentCard: FC<AppointmentCardProps> = ({ appointment }) => {
  const queryClient = useQueryClient();
  const { isUserDoctor, isUserPatient, isUserAdmin } = useAuth();
  const { filters } = useAppointmentFilters();
  const [status, setStatus] = useState(appointment.status);

  const APPOINTMENT_STATUSES: typeof status[] = ["PENDIENTE", "CONFIRMADA", "CANCELADA", "COMPLETADA", "AUSENTE"];

  const handleChangeStatus = async (newStatus: typeof status) => {
    if (newStatus === status) return;

    const updated = await toastUpdate({
      actionFn: () => updateAppointmentStatus(appointment.id, newStatus),
      successMessage: `Cita actualizada a ${newStatus}`,
      errorMessage: "Error al actualizar el estado de la cita",
      pendingMessage: "Actualizando estado de la cita...",
      timeout: 3000,
    });

    if (updated) setStatus(newStatus);
    queryClient.invalidateQueries({
      queryKey: ['appointments', 'filter', JSON.stringify(filters)]
    });
  };

  return (
    <Card className="group relative overflow-hidden border border-border/60 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300 bg-card/60 backdrop-blur-md">
      <CardContent className="p-5 space-y-4">
        {/* Header Nombre + Estado */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <User2 className="h-5 w-5 text-primary" />
              <div className="flex flex-col leading-tight">
                {isUserDoctor && <span className="font-semibold text-base text-foreground">Paciente: {appointment.patientName}</span>}
                {isUserPatient && <span className="font-semibold text-base text-foreground">Doctor: {appointment.doctorName}</span>}
                {isUserAdmin && (
                  <>
                    <span className="font-semibold text-base text-foreground">Doctor: {appointment.doctorName}</span>
                    <span className="font-semibold text-base text-foreground">Paciente: {appointment.patientName}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Estado editable si no es paciente, sino badge */}
          {isUserPatient ? (
            <Badge
              className={`text-xs px-3 py-1.5 font-medium capitalize border rounded-full ${selectStyles[status]}`}
            >
              {status}
            </Badge>
          ) : (
            <Select
              value={status}
              onChange={e => handleChangeStatus(e.target.value as typeof status)}
              className={`text-xs px-3 py-1.5 font-medium capitalize border rounded-full ${selectStyles[status]}`}
              options={APPOINTMENT_STATUSES.map(s => ({ value: s, label: s, className: optionStyles[s] }))}
            />
          )}
        </div>

        {/* Hora */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 text-primary/80" />
          <span className="font-medium">
            {dayjs(appointment.appointmentStart).format("dddd, MMM D · hh:mm A")}
          </span>
        </div>

        {/* Motivo */}
        {appointment.reason && (
          <div className="flex items-start gap-2">
            <Clipboard className="h-4 w-4 mt-1 text-primary/80" />
            <p className="text-sm text-muted-foreground leading-snug">
              <span className="font-medium text-foreground">Motivo: </span>
              {appointment.reason}
            </p>
          </div>
        )}
      </CardContent>

      {/* Microinteracción decorativa */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br from-primary/40 to-transparent transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};

export default AppointmentCard;