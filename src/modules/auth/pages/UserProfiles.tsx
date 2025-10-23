import PageHeader from "@/shared/components/Header/PageHeader";
import type { FC, ReactNode } from "react";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";

interface UserProfileProps {
  children?: ReactNode;
}

const UserProfiles: FC<UserProfileProps> = ({ children }) => {
  return (
    <section>
      <PageHeader title="Perfil" />
      <div className="space-y-6">
        <UserMetaCard />
        <UserInfoCard />
        <UserAddressCard />
      </div>
      {children}
    </section>
  )
};

export default UserProfiles;
