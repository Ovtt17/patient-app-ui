import { DoctorScheduleAvailability } from "../components/DoctorScheduleAvailability/DoctorScheduleAvailability";
import PageHeader from "@/shared/components/Header/PageHeader";
import { useDoctorAvailability } from "../hooks/useAllAvailability";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import { useAllSchedules } from "../hooks/useAllSchedules";

const DoctorScheduleAvailabilityPage = () => {
  const { entities: schedules, loading: schedulesLoading, errors: schedulesErrors } = useAllSchedules();
  const { availability, loading: availabilityLoading, errors: availabilityErrors } = useDoctorAvailability();

  if (schedulesLoading || availabilityLoading)
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando disponibilidad...
        </p>
      </div>
    );

  return (
    <div className="p-6">
      <PageHeader title="Horarios y Disponibilidad" />
      {schedulesErrors && <ErrorDisplay errors={schedulesErrors} />}
      {availabilityErrors && <ErrorDisplay errors={availabilityErrors} />}
      <DoctorScheduleAvailability
        schedules={schedules}
        availability={availability }
      />
    </div>
  );
};

export default DoctorScheduleAvailabilityPage;
