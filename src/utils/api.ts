import axios, { AxiosError, InternalAxiosRequestConfig, AxiosRequestHeaders } from "axios";
import { getStorage, clearUserData } from "./storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

// ✅ Interceptor: Tambahkan token dari storage (jika ada)
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (typeof window !== "undefined") {
    const storage = getStorage();
    const token = storage?.getItem("access_token");
    if (token) {
      (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// ✅ Interceptor: Handle 401 -> Refresh token (kecuali di endpoint login/refresh)
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // Jangan refresh token jika di /auth/login atau /auth/refresh
    const isAuthEndpoint = originalRequest.url?.includes("/auth/login") || originalRequest.url?.includes("/auth/refresh");

    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint && typeof window !== "undefined") {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh");
        const newToken = res.data?.data?.access_token;

        if (newToken) {
          const storage = getStorage();
          storage?.setItem("access_token", newToken);
          (originalRequest.headers as AxiosRequestHeaders).Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        clearUserData();
        window.location.href = "/masuk";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
