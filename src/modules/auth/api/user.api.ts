import axiosInstance from "@/config/axiosInstance";
import type { UserRequest } from "../types/UserRequest";
import type { User } from "../types/user.types";
import { handleError } from "@/modules/errors/utils/handle-error";

// Utilidad síncrona para obtener la URL de avatar por nombre de usuario
export function getAvatarUrl(username: string): string {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`;
}

export const updateUser = async (userId: string, request: UserRequest): Promise<User> => {
  try {
    const response = await axiosInstance.patch<User>(`/users/${userId}`, request);
    return response.data;
  } catch (error) {
    throw handleError(error);
  }
}