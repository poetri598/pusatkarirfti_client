import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { CVItem } from "@/types/cv";

// ✅ GET CV BY USERNAME
export async function getCVByUsername(username: string) {
  try {
    const res = await api.get<ApiResponse<CVItem>>(`/cv/username/${username}`);

    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }

    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data CV berdasarkan username"),
    };
  }
}
