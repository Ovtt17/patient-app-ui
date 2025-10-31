import PageHeader from "@/shared/components/Header/PageHeader";
import type { FC, ReactNode } from "react";
import UserMetaCard from "../components/UserMetaCard/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import { useFetchUserProfile } from "../hooks/useFetchUserProfile";
import { useAuth } from "@/shared/context/auth/useAuth";
import DoctorInfoCard from "@/modules/doctors/components/DoctorInfoCard/DoctorInfoCard";

interface UserProfileProps {
  children?: ReactNode;
}

const UserProfiles: FC<UserProfileProps> = ({ children }) => {
  const { isUserDoctor } = useAuth();
  const {
    user,
    isLoading,
    isError,
  } = useFetchUserProfile();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-gray-600 dark:text-gray-300 animate-pulse text-lg font-medium">
          Cargando perfil...
        </p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-72 text-red-500">
        <p>Ocurrió un error al cargar el perfil. Intenta nuevamente.</p>
      </div>
    );

  if (!user) {
    return (
      <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            No hay información de usuario disponible
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Por favor, asegúrate de haber iniciado sesión o intenta actualizar la página.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <PageHeader title="Perfil" />
      <div className="rounded-2xl space-y-6 border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <UserMetaCard user={user} />
        <UserInfoCard user={user} />
        {isUserDoctor && <DoctorInfoCard userId={user.id} />}
        {children}
      </div>
    </section>
  )
};

export default UserProfiles;
