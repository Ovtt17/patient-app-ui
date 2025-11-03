import {
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  IdentificationIcon,
  ClipboardDocumentIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import type { FC } from "react";
import type { PatientResponse } from "../../types/PatientResponse";
import ActionButtons from "@/shared/components/Button/ActionButtons";
import { useAuth } from "@/shared/context/auth/useAuth";

const getAge = (birthDate: string | Date): number | null => {
  if (!birthDate) return null;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
};

interface PatientCardProps {
  patient: PatientResponse;
}

const PatientCard: FC<PatientCardProps> = ({ patient }) => {
  const { isUserAdmin, isUserDoctor } = useAuth();

  const {
    id,
    firstName,
    lastName,
    email,
    phone,
    gender,
    profilePictureUrl,
    weight,
    height,
    birthDate,
    notes,
  } = patient;

  const age = getAge(birthDate);

  const onView = (patientId: string) => {
    // Lógica para ver el paciente
    console.log("Ver paciente:", patientId);
  }

  const onEdit = (patientId: string) => {
    // Lógica para editar el paciente
    console.log("Editar paciente:", patientId);
  }

  const onDelete = (patientId: string) => {
    // Lógica para eliminar el paciente
    console.log("Eliminar paciente:", patientId);
  }

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
          <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800">
            <UserIcon className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
        )}

        <div className="flex flex-col">
          <h2 className="font-semibold text-gray-900 dark:text-white text-lg leading-tight">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize mt-0.5">
            {gender ?? "No especificado"} {age && `• ${age} años`}
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
          <span>ID Usuario: {patient.userId || "—"}</span>
        </div>

        <div className="flex items-center gap-2">
          <HeartIcon className="w-4 h-4 text-gray-400" />
          <span>
            {weight ? `${weight} kg` : "Peso no registrado"} •{" "}
            {height ? `${height} cm` : "Altura no registrada"}
          </span>
        </div>
      </div>

      {/* Notas */}
      <div className="mt-4">
        <div className="flex items-center gap-2 mb-1">
          <ClipboardDocumentIcon className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Notas
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 italic line-clamp-2">
          {notes || "Sin notas registradas"}
        </p>
      </div>
      {
        (isUserAdmin || isUserDoctor) && (
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

export default PatientCard;
