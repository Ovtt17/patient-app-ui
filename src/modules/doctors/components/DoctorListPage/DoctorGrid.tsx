import { cn } from "@/lib/utils";
import { DoctorCard } from "./DoctorCard";
import { DoctorEmptyState } from "./DoctorEmptyState";
import type { DoctorResponse } from "@/modules/doctors/types/DoctorResponse";
import SearchBar from "@/shared/components/SearchBar/SearchBar";
import { useState } from "react";

interface DoctorGridProps {
  doctors: DoctorResponse[];
}

export const DoctorGrid = ({ doctors }: DoctorGridProps) => {
  const [filtering, setFiltering] = useState("");
  const hasDoctors = doctors?.length > 0;

  const filteredDoctors = hasDoctors
    ? doctors.filter((doctor) =>
      `${doctor.firstName} ${doctor.lastName}`
        .toLowerCase()
        .includes(filtering.toLowerCase())
    )
    : [];

  return (
    <>
      <SearchBar filtering={filtering} setFiltering={setFiltering} placeholder="Buscar doctor..." />
      <div
        className={cn(
          "grid gap-6",
          hasDoctors ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        )}
      >
        {hasDoctors ? (
          filteredDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)
        ) : (
          <DoctorEmptyState />
        )}
      </div>
    </>
  );
};
