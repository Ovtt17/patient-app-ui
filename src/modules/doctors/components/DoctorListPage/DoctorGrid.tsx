import { cn } from "@/lib/utils";
import { DoctorCard } from "./DoctorCard";
import { DoctorEmptyState } from "./DoctorEmptyState";
import type { DoctorResponse } from "@/modules/doctors/types/DoctorResponse";

interface DoctorGridProps {
  doctors: DoctorResponse[];
}

export const DoctorGrid = ({ doctors }: DoctorGridProps) => {
  const hasDoctors = doctors?.length > 0;

  return (
    <div
      className={cn(
        "grid gap-6",
        hasDoctors ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}
    >
      {hasDoctors ? (
        doctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
      ) : (
        <DoctorEmptyState />
      )}
    </div>
  );
};
