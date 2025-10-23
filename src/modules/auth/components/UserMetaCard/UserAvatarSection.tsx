import { capitalize } from "lodash";
import type { User } from "../../types/user.types";

interface Props {
  user: User;
}

export default function UserAvatarSection({ user }: Props) {
  return (
    <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
      <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
        <img
          src={user.profilePictureUrl || "https://randomuser.me/api/portraits/men/10.jpg"}
          alt="user avatar"
        />
      </div>

      <div className="order-3 xl:order-2">
        <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
          {user.firstName} {user.lastName}
        </h4>
        <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {capitalize(user.roles?.[0]) || "Paciente"}
          </p>
          <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
