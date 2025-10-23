import type { FC, ReactNode } from "react";

interface InfoItemProps {
  label: string;
  value?: ReactNode;
}

const InfoItem: FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div>
      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
        {label}
      </p>
      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
        {value || "N/A"}
      </p>
    </div>
  );
};

export default InfoItem;
