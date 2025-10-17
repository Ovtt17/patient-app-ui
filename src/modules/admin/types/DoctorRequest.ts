import type { Gender } from "@/shared/types/Gender";

export type DoctorRequest = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
};
