import {
  EnvelopeIcon,
  PhoneIcon,
  IdentificationIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type { PatientResponse } from "@/modules/patient/types/PatientResponse";
import type { FC } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import type { AppointmentRequest } from "@/modules/appointments/types/AppointmentRequest";

interface SelectablePatientCardProps {
  patient: PatientResponse;
}

const SelectablePatientCard: FC<SelectablePatientCardProps> = ({ patient }) => {
  const { firstName, lastName, email, phone, gender, profilePictureUrl, userId } = patient;

  const { setValue } = useFormContext<AppointmentRequest>();
  const selectedPatientId = useWatch({ name: 'userId' });

  const isSelected = selectedPatientId === userId;

  const handleSelect = () => {
    setValue('userId', userId, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div
      className={cn(
        "flex flex-col rounded-2xl overflow-hidden transition-all duration-300 w-full sm:w-72 m-2 border cursor-pointer hover:shadow-md",
        isSelected
          ? "border-blue-500 dark:border-purple-500 bg-blue-50 dark:bg-purple-900/20 shadow-[0_0_15px_4px_rgb(59,130,246)] dark:shadow-[0_0_15px_4px_rgb(139,92,246)] ring-2 ring-blue-400 dark:ring-purple-400 animate-pulse"
          : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm"
      )}
      onClick={handleSelect}
    >
      {/* Imagen */}
      <div className="w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 relative">
        {profilePictureUrl ? (
          <img
            src={profilePictureUrl}
            alt={`${firstName} ${lastName}`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-100 dark:bg-blue-900">
            <span className="text-gray-500 dark:text-gray-300 text-lg font-semibold">
              {firstName[0]}{lastName[0]}
            </span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col gap-2 text-gray-700 dark:text-gray-300">
        <div className="text-center">
          <h2 className="font-semibold text-lg text-gray-900 dark:text-white">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {gender ?? "No especificado"}
          </p>
        </div>

        <div className="space-y-1 text-sm">
          <div className="flex items-center gap-2">
            <EnvelopeIcon className="w-4 h-4 text-gray-400" />
            <span className="truncate">{email}</span>
          </div>
          <div className="flex items-center gap-2">
            <PhoneIcon className="w-4 h-4 text-gray-400" />
            <span>{phone || "—"}</span>
          </div>
          <div className="flex items-center gap-2">
            <IdentificationIcon className="w-4 h-4 text-gray-400" />
            <span>ID Usuario: {userId}</span>
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={handleSelect}
          type="button"
          className={cn(
            "mt-4 w-full font-medium py-2 rounded-lg transition-colors",
            isSelected
              ? "bg-blue-700 text-white hover:bg-blue-800"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
        >
          {isSelected ? "Seleccionado" : "Seleccionar"}
        </button>
      </div>
    </div>
  );
};

export default SelectablePatientCard;