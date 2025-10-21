import { mockSchedules } from "@/modules/doctors/mocks/schedules";
import { mockAvailability } from "@/modules/doctors/mocks/availability";
import { DoctorScheduleAvailability } from "../components/DoctorScheduleAvailability/DoctorScheduleAvailability";

const DoctorScheduleAvailabilityPage = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Horarios y Disponibilidad</h2>
      <DoctorScheduleAvailability
        schedules={mockSchedules}
        availability={mockAvailability}
      />
    </div>
  );
};

export default DoctorScheduleAvailabilityPage;
