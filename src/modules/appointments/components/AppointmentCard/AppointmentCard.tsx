import type { FC } from "react";
import { CalendarDays, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

interface AppointmentCardProps {
  id: number;
  patientName: string;
  appointmentDate: string;
  endTime: string;
  reason: string;
  notes: string;
  status: string;
}

const statusColors: Record<string, string> = {
  PENDIENTE: "bg-yellow-50 text-yellow-800 border-yellow-200",
  CONFIRMADA: "bg-green-50 text-green-800 border-green-200",
  COMPLETADA: "bg-blue-50 text-blue-800 border-blue-200",
  CANCELADA: "bg-red-50 text-red-800 border-red-200",
  AUSENTE: "bg-gray-50 text-gray-800 border-gray-200",
};

export const AppointmentCard: FC<AppointmentCardProps> = ({
  patientName,
  appointmentDate,
  endTime,
  reason,
  notes,
  status,
}) => {
  const formatDate = (iso: string) => format(parseISO(iso), "PPP", { locale: es });
  const formatTime = (iso: string) => format(parseISO(iso), "hh:mm a", { locale: es }).toLowerCase();

  return (
    <Card className="border rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-0">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-3 text-lg font-semibold text-gray-900">
            <CalendarDays className="w-5 h-5 text-blue-500" />
            {patientName}
          </span>
          <Badge className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
            {status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2 space-y-2">
        <div className="flex items-center gap-2 text-gray-700">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="font-medium">
            {formatTime(appointmentDate)} - {formatTime(endTime)}
          </span>
        </div>
        <div className="text-gray-600 text-sm space-y-1">
          <p>
            <span className="font-semibold">Fecha:</span> {formatDate(appointmentDate)}
          </p>
          <p>
            <span className="font-semibold">Motivo:</span> {reason}
          </p>
          {notes && (
            <p className="italic text-gray-500">
              <span className="font-semibold">Notas:</span> {notes}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
