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
    <section className="flex flex-col gap-5 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors p-5">
      <PageHeader title="Horarios" />

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <label
          htmlFor="dayOfWeek"
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Filtrar por día:
        </label>
        <select
          id="dayOfWeek"
          value={dayOfWeek || ""}
          onChange={(e) => setDayOfWeek(e.target.value || undefined)}
          className="
            w-fit rounded-lg border border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-800
            px-3 py-2 text-sm font-medium
            text-gray-800 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            transition-colors
          "
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
      </div>

      {errors && <ErrorDisplay errors={errors} />}
      <div className="transition-colors">
        <ScheduleGrid schedules={schedules || []} />
      </div>
    </section>
  );
};

export default Schedule;
