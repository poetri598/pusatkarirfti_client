import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { ExpoTypeItem } from "@/types/expoType";

// ✅ CREATE
export async function createExpoType(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ expo_type_id: number }>>("/expo-types", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat jenis expo"),
    };
  }
}

// ✅ GET ALL
export async function getAllExpoTypes() {
  try {
    const res = await api.get<ApiResponse<ExpoTypeItem[]>>("/expo-types");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data jenis expo"),
    };
  }
}

// ✅ GET BY ID
export async function getExpoTypeById(expo_type_id: number) {
  try {
    const res = await api.get<ApiResponse<ExpoTypeItem>>(`/expo-types/${expo_type_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil detail jenis expo"),
    };
  }
}

// ✅ UPDATE
export async function updateExpoTypeById(expo_type_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/expo-types/${expo_type_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui data jenis expo"),
    };
  }
}

// ✅ DELETE
export async function deleteExpoTypeById(expo_type_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/expo-types/${expo_type_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data jenis expo"),
    };
  }
}

// ✅ SEARCH FILTER SORT
export async function searchExpoTypes(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<ExpoTypeItem[]>>(`/expo-types/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari/memfilter data jenis expo"),
    };
  }
}
