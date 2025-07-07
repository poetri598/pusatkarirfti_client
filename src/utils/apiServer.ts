import axios, { AxiosInstance } from "axios";

export function createApiServer(accessToken?: string): AxiosInstance {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });
}
