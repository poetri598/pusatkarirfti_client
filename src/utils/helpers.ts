import axios, { AxiosError } from "axios";
import type { ApiFail, ApiErrorResponse } from "@/utils/responseController";

export function extractErrorMessage(err: unknown, fallback: string = "Terjadi kesalahan"): string {
  if (axios.isAxiosError(err)) {
    const axiosErr = err as AxiosError<ApiFail | ApiErrorResponse>;

    // Jika error dari response server ada message
    if (axiosErr.response?.data?.message) {
      return axiosErr.response.data.message;
    }

    // Jika hanya ada message umum dari axios (misalnya network error)
    if (axiosErr.message) {
      return axiosErr.message;
    }
  }

  // Jika bukan error dari axios
  if (err instanceof Error && err.message) {
    return err.message;
  }

  return fallback;
}
