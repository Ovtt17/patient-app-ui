import PageHeader from "@/shared/components/Header/PageHeader";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface DoctorHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export const DoctorHeader = ({
  search,
  onSearchChange,
}: DoctorHeaderProps) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <PageHeader title="Doctores" />
    </div>
  );
};
