import type { FC } from "react";
import SignUp from "@/modules/auth/pages/SignUp";

const DoctorCreate: FC = () => (
  <SignUp role="DOCTOR" />
);

export default DoctorCreate;