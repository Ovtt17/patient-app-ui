import { cn } from "@/lib/utils";
import type { SpecialtyResponse } from "../../types/SpecialtyResponse";
import { SpecialtyCard } from "../SpecialtyCard/SpecialtyCard";
import { SpecialtyEmptyState } from "../SpecialtyEmptyState/SpecialtyEmptyState";

interface SpecialtyGridProps {
  specialties: SpecialtyResponse[];
}

export const SpecialtyGrid = ({ specialties }: SpecialtyGridProps) => {
  const hasSpecialties = specialties?.length > 0;

  return (
    <div
      className={cn(
        "grid gap-6",
        hasSpecialties ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
      )}
    >
      {hasSpecialties ? (
        specialties.map((specialty) => (
          <SpecialtyCard key={specialty.id} specialty={specialty} />
        ))
      ) : (
        <SpecialtyEmptyState />
      )}
    </div>
  );
};
