import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { GenderItem } from "@/types/gender";

// ✅ CREATE
export async function createGender(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ gender_id: number }>>("/genders", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat gender"),
    };
  }
}

// ✅ GET ALL
export async function getAllGenders() {
  try {
    const res = await api.get<ApiResponse<GenderItem[]>>("/genders");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data gender"),
    };
  }
}

// ✅ GET BY ID
export async function getGenderById(gender_id: number) {
  try {
    const res = await api.get<ApiResponse<GenderItem>>(`/genders/${gender_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil detail gender"),
    };
  }
}

// ✅ UPDATE BY ID
export async function updateGenderById(gender_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/genders/${gender_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengubah data gender"),
    };
  }
}

// ✅ DELETE BY ID
export async function deleteGenderById(gender_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/genders/${gender_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus gender"),
    };
  }
}

// ✅ SEARCH / FILTER / SORT
export async function searchGenders(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<GenderItem[]>>(`/genders/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari atau memfilter gender"),
    };
  }
}
