import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { HeightItem } from "@/types/height";

// ✅ CREATE
export async function createHeight(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ height_id: number }>>("/heights", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan tinggi badan") };
  }
}

// ✅ GET ALL
export async function getAllHeights() {
  try {
    const res = await api.get<ApiResponse<HeightItem[]>>("/heights");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data tinggi badan") };
  }
}

// ✅ GET BY ID
export async function getHeightById(height_id: number) {
  try {
    const res = await api.get<ApiResponse<HeightItem>>(`/heights/${height_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail tinggi") };
  }
}

// ✅ UPDATE BY ID
export async function updateHeightById(height_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/heights/${height_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data tinggi") };
  }
}

// ✅ DELETE
export async function deleteHeightById(height_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/heights/${height_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data tinggi") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchHeights(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<HeightItem[]>>(`/heights/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data tinggi") };
  }
}
