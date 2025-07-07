import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { AgeItem } from "@/types/age";

// ✅ CREATE
export async function createAge(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ age_id: number }>>("/ages", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal membuat data umur") };
  }
}

// ✅ GET ALL
export async function getAllAges() {
  try {
    const res = await api.get<ApiResponse<AgeItem[]>>("/ages");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data umur") };
  }
}

// ✅ GET BY ID
export async function getAgeById(age_id: number) {
  try {
    const res = await api.get<ApiResponse<AgeItem>>(`/ages/${age_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal mengambil data umur") };
  }
}

// ✅ UPDATE
export async function updateAgeById(age_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/ages/${age_id}`, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal memperbarui data umur") };
  }
}

// ✅ DELETE
export async function deleteAgeById(age_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/ages/${age_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return { success: false, error: extractErrorMessage(err, "Gagal menghapus data umur") };
  }
}

// ✅ SEARCH & FILTER & SORT
export async function searchAges(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });
    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<AgeItem[]>>(`/ages/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter data umur"),
    };
  }
}
