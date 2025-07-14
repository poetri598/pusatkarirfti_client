import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { PlatformItem } from "@/types/platform";

// ✅ CREATE
export async function createPlatform(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ platform_id: number }>>("/platforms", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") return { success: true, data: res.data.data };
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat data platform") };
  }
}

// ✅ GET ALL
export async function getPlatformAll() {
  try {
    const res = await api.get<ApiResponse<PlatformItem[]>>("/platforms");
    if (res.data.status === "success") return { success: true, data: res.data.data };
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data platform") };
  }
}

// ✅ GET BY ID
export async function getPlatformById(platform_id: number) {
  try {
    const res = await api.get<ApiResponse<PlatformItem>>(`/platforms/${platform_id}`);
    if (res.data.status === "success") return { success: true, data: res.data.data };
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data platform") };
  }
}

// ✅ UPDATE
export async function updatePlatformById(platform_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/platforms/${platform_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") return { success: true };
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui data platform") };
  }
}

// ✅ DELETE
export async function deletePlatformById(platform_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/platforms/${platform_id}`);
    if (res.data.status === "success") return { success: true };
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data platform") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchPlatforms(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<PlatformItem[]>>(`/platforms/search?${query}`);
    if (res.data.status === "success") return { success: true, data: res.data.data };
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter data platform"),
    };
  }
}
