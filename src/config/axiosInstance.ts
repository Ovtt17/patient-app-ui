import axios from 'axios';
import { getCsrfToken, refreshToken } from '@/modules/auth/api/auth.api';

const BASE_API_URL = `${import.meta.env.VITE_API_URL}`;

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor para agregar CSRF token si es necesario
axiosInstance.interceptors.request.use(
  async (config) => {
    if (
      ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '') &&
      !config?.headers?.['X-XSRF-TOKEN']
    ) {
      const csrfToken = await getCsrfToken();
      if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar 401 y refrescar token
axiosInstance.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevención del bucle infinito
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (originalRequest.url.includes('/auth/refresh')) {
          await refreshToken(); // intenta renovar sesión
        }
        return axiosInstance(originalRequest); // vuelve a intentar la original
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
