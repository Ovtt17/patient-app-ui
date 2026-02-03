import {
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  IdentificationIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type { DoctorResponse } from "@/modules/doctors/types/DoctorResponse";
import { useAuth } from "@/shared/context/auth/useAuth";
import ActionButtons from "@/shared/components/Button/ActionButtons";

interface DoctorCardProps {
  doctor: DoctorResponse;
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  const { isUserAdmin } = useAuth();

  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    gender,
    profilePictureUrl,
    medicalLicense,
    officeNumber,
    specialties,
  } = doctor;

  const onView = (doctorId: string) => {
    console.log("Ver doctor:", doctorId);
  };

  const onEdit = (doctorId: string) => {
    console.log("Editar doctor:", doctorId);
  };

  const onDelete = (doctorId: string) => {
    console.log("Eliminar doctor:", doctorId);
  };

  return (
    <article
      key={id}
      className={cn(
        "rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900",
        "shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col justify-between"
      )}
    >
      {/* Header con avatar */}
      <div className="flex items-center gap-5 mb-5">
        {profilePictureUrl ? (
          <img
            src={profilePictureUrl}
            alt={`${firstName} ${lastName}`}
            className="w-16 h-16 flex-shrink-0 rounded-full object-cover border border-gray-300 dark:border-gray-700"
          />
        ) : (
          <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 border border-blue-200 dark:border-blue-800">
            <UserIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        )}

        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mt-0.5">
            {gender ?? "No especificado"}
          </p>
        </div>
      </div>

      {/* Info principal */}
      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
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
          <span>Licencia: {medicalLicense || "—"}</span>
        </div>

        <div className="flex items-center gap-2">
          <BuildingOfficeIcon className="w-4 h-4 text-gray-400" />
          <span>Consultorio: {officeNumber || "—"}</span>
        </div>
      </div>

      {/* Especialidades */}
      <div className="mt-4 flex flex-wrap gap-2">
        {specialties?.length ? (
          specialties.map((spec) => (
            <span
              key={spec.id}
              className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md"
            >
              {spec.name}
            </span>
          ))
        ) : (
          <span className="text-xs text-gray-400 italic">Sin especialidades</span>
        )}
      </div>
      {
        (isUserAdmin) && (
          <div className="flex justify-end mt-5 pt-4 border-t border-gray-200 dark:border-gray-800">
            <ActionButtons
              entityId={id}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </div>
        )
      }
    </article>
  );
};