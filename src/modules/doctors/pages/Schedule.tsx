import { useState } from "react";
import PageHeader from "@/shared/components/Header/PageHeader";
import { useAllSchedules } from "../hooks/useAllSchedules";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import { ScheduleGrid } from "../components/ScheduleGrid/ScheduleGrid";

const Schedule = () => {
  const [dayOfWeek, setDayOfWeek] = useState<string>();
  const { entities: schedules, loading, errors } = useAllSchedules(dayOfWeek);

  if (loading)
    return (
      <div className="flex mx-auto max-w-7xl justify-center items-center h-72">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando horarios...
        </p>
      </div>
    );

  return (
    <section className="p-6 flex flex-col gap-4">
      <PageHeader title="Horarios" />

      <select
        value={dayOfWeek || ""}
        onChange={(e) => setDayOfWeek(e.target.value || undefined)}
        className="w-fit border rounded-lg px-3 py-2 text-sm text-gray-700 dark:text-gray-200"
      >
        <option value="">Todos los días</option>
        <option value="MONDAY">Lunes</option>
        <option value="TUESDAY">Martes</option>
        <option value="WEDNESDAY">Miércoles</option>
        <option value="THURSDAY">Jueves</option>
        <option value="FRIDAY">Viernes</option>
        <option value="SATURDAY">Sábado</option>
        <option value="SUNDAY">Domingo</option>
      </select>

      {errors && <ErrorDisplay errors={errors} />}
      <ScheduleGrid schedules={schedules || []} />
    </section>
  );
};

export default Schedule;
