import { useModal } from "@/shared/hooks/useModal";
import { Modal } from "@/shared/components/modal";
import UserAvatarSection from "./UserAvatarSection";
import EditUserModal from "./EditUserModal";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "@heroicons/react/24/outline";
import type { User } from "../../types/user.types";
import type { FC } from "react";
import { useAuth } from "@/shared/context/auth/useAuth";

interface UserMetaCardProps {
  user: User;
}


const UserMetaCard: FC<UserMetaCardProps> = ({ user }) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { isUserDoctor, isUserAdmin } = useAuth();

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <UserAvatarSection user={user} />
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
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <EditUserModal onClose={closeModal} />
      </Modal>
    </>
  );
}

export default UserMetaCard;