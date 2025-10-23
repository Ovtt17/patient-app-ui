import PageHeader from "@/shared/components/Header/PageHeader";
import type { FC, ReactNode } from "react";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";

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
        {children}
      </div>
    </section>
  )
};

export default UserProfiles;
