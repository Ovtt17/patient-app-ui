import type { Gender } from "@/shared/types/gender.types";

export type DoctorRequest = {
  firstName: string; 
  lastName: string;
  email: string;
  phone: string;
  gender: Gender;
};
