import { useModal } from "@/shared/hooks/useModal";
import { Modal } from "@/shared/components/modal";
import UserAvatarSection from "./UserAvatarSection";
import EditUserModal from "./EditUserModal";
import { Button } from "@/components/ui/button";
import { PencilIcon, QrCodeIcon } from "@heroicons/react/24/outline";
import type { User } from "../../types/user.types";
import type { FC } from "react";
import { useAuth } from "@/shared/context/auth/useAuth";
import { QRCodeCanvas } from "qrcode.react";

interface UserMetaCardProps {
  user: User;
}

const UserMetaCard: FC<UserMetaCardProps> = ({ user }) => {
  const { isOpen: isEditOpen, openModal: openEditModal, closeModal: closeEditModal } = useModal();
  const { isOpen: isQROpen, openModal: openQRModal, closeModal: closeQRModal } = useModal();

  const { isUserSuperAdmin, isUserAdmin, isUserDoctor } = useAuth();
  const canEdit = isUserSuperAdmin || isUserAdmin || isUserDoctor;

  const patientId = user.patientId || "N/A";

  return (
    <>
      <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <UserAvatarSection user={user} />

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            {canEdit && (
              <Button
                onClick={openEditModal}
                size="sm"
                variant="outline"
                className="dark:bg-boxdark rounded-3xl px-6 py-3 sm:px-8 sm:py-6 flex items-center justify-center gap-2 w-full sm:w-auto border-gray-300"
              >
                <PencilIcon className="w-4 h-4" />
                Editar
              </Button>
            )}

            <Button
              size="sm"
              variant="outline"
              className="dark:bg-boxdark rounded-3xl px-6 py-3 sm:px-8 sm:py-6 flex items-center justify-center gap-2 w-full sm:w-auto border-gray-300"
              onClick={openQRModal}
            >
              <QrCodeIcon className="w-4 h-4" />
              QR
            </Button>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      <Modal isOpen={isEditOpen} onClose={closeEditModal} className="max-w-[700px] m-4">
        <EditUserModal onClose={closeEditModal} />
      </Modal>

      {/* Modal del QR */}
      <Modal isOpen={isQROpen} onClose={closeQRModal} className="max-w-[400px] m-4">
        <div className="flex flex-col items-center gap-4 p-5">
          <h2 className="text-lg font-semibold">QR del perfil</h2>
          <QRCodeCanvas value={patientId} size={200} />
          <p className="text-sm text-center text-gray-500 break-all">{patientId}</p>
        </div>
      </Modal>
    </>
  );
};

export default UserMetaCard;