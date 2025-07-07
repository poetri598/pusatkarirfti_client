import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { ModeItem } from "@/types/mode";

// ✅ CREATE
export async function createMode(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ mode_id: number }>>("/modes", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menambahkan data mode") };
  }
}

// ✅ GET ALL
export async function getModeAll() {
  try {
    const res = await api.get<ApiResponse<ModeItem[]>>("/modes");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data mode") };
  }
}

// ✅ GET BY ID
export async function getModeById(mode_id: number) {
  try {
    const res = await api.get<ApiResponse<ModeItem>>(`/modes/${mode_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil detail data mode") };
  }
}

// ✅ UPDATE BY ID
export async function updateModeById(mode_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/modes/${mode_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengubah data mode") };
  }
}

// ✅ DELETE BY ID
export async function deleteModeById(mode_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/modes/${mode_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data mode") };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchModes(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<ModeItem[]>>(`/modes/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mencari data mode") };
  }
}
