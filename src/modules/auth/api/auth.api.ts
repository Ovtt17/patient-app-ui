import { handleError } from "@/modules/errors/utils/handle-error";
import type { RegisterRequest } from "../types/register-request.types";
import axiosInstance from "@/config/axiosInstance";
import type { LoginRequest } from "../types/login-request.types";
import type { User } from "../types/user.types";

export const createUser = async (request: RegisterRequest): Promise<string> => {
  try {
    const response = await axiosInstance.post('/auth/register', request);
    const message: string = response.data;
    return message;
  } catch (error) {
    throw handleError(error);
  }
}

export const activateUser = async (token: string): Promise<string> => {
  try {
    const response = await axiosInstance.post(`/auth/activate-account?token=${token}`);
    const message: string = response.data;
    return message;
  } catch (error) {
    throw handleError(error);
  }
};

export const signInUser = async (loginRequest: LoginRequest): Promise<User> => {
  try {
    const response = await axiosInstance.post('/auth/login', loginRequest);
    const user: User = response.data;
    return user;
  } catch (error) {
    throw handleError(error);
  }
}

export const getCurrentUserInfo = async (): Promise<User> => {
  try {
    const response = await axiosInstance.get('/auth/me');
    const user: User = response.data;
    return user;
  } catch (error) {
    throw handleError(error);
  }
}

export const refreshToken = async (): Promise<void> => {
  try {
    await axiosInstance.post('/auth/refresh');
  } catch (error) {
    throw handleError(error);
  }
}

export const logoutUser = async (): Promise<void> => {
  try {
    await axiosInstance.post('/auth/logout');
  } catch (error) {
    throw handleError(error);
  }
}

export const getCsrfToken = async (): Promise<string> => {
  try {
    const response = await axiosInstance.get(`/csrf/token`, { withCredentials: true });
    return response.data.token;
  } catch (error) {
    throw handleError(error);
  }
}