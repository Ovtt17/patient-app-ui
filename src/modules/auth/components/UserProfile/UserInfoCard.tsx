import { Button } from "@/components/ui/button";
import { Modal } from "@/shared/components/modal";
import { useModal } from "@/shared/hooks/useModal";
import { PencilIcon } from "@heroicons/react/24/outline";
import type { User } from "../../types/user.types";
import type { FC } from "react";
import EditUserModal from "../UserMetaCard/EditUserModal";
import { useAuth } from "@/shared/context/auth/useAuth";

interface UserInfoCardProps {
  user: User;
}

const UserInfoCard: FC<UserInfoCardProps> = ({ user }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { isUserDoctor, isUserAdmin } = useAuth();

  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Información Personal
          </h4>
          <p className="lg:mb-6 text-xs leading-normal text-gray-500 dark:text-gray-400">
            ID: {user?.id}
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Nombres
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.firstName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Apellidos
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.lastName}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Correo Electrónico
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.email}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Teléfono
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.phone}
              </p>
            </div>

            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Biografía
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                {user?.bio}
              </p>
            </div>
          </div>
        </div>

        {(isUserDoctor || isUserAdmin) && (
          <Button
            onClick={openModal}
            size="sm"
            variant="outline"
            className="dark:bg-boxdark lg:w-auto w-full rounded-3xl px-8 py-6 flex items-center justify-center gap-2 border-gray-300"
          >
            <PencilIcon className="w-4 h-4" />
            Editar
          </Button>
        )}
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <EditUserModal onClose={closeModal} />
      </Modal>
    </div>
  );
}

export default UserInfoCard;