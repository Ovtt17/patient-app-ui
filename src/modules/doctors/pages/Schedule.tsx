import { ScheduleGrid } from "../components/ScheduleGrid/ScheduleGrid";
import { mockSchedules } from "../mocks/schedules";

const Schedule = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Horarios del Doctor</h2>
      <ScheduleGrid schedules={mockSchedules} />
    </div>
  );
}

export default Schedule;