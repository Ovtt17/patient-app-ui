import type { Gender } from "@/shared/types/Gender";

export interface UserRequest {
  firstName: string;
  lastName: string;
  phone: string;
  gender: Gender;
  bio?: string | null;
}