import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { CounselingTypeItem } from "@/types/counselingType";

// ✅ CREATE
export async function createCounselingType(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ counseling_type_id: number }>>("/counseling-types", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat data jenis konseling"),
    };
  }
}

// ✅ GET ALL
export async function getAllCounselingTypes() {
  try {
    const res = await api.get<ApiResponse<CounselingTypeItem[]>>("/counseling-types");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data jenis konseling"),
    };
  }
}

// ✅ GET BY ID
export async function getCounselingTypeById(counseling_type_id: number) {
  try {
    const res = await api.get<ApiResponse<CounselingTypeItem>>(`/counseling-types/${counseling_type_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil detail jenis konseling"),
    };
  }
}

// ✅ UPDATE
export async function updateCounselingTypeById(counseling_type_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/counseling-types/${counseling_type_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui data jenis konseling"),
    };
  }
}

// ✅ DELETE
export async function deleteCounselingTypeById(counseling_type_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/counseling-types/${counseling_type_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data jenis konseling"),
    };
  }
}

// ✅ SEARCH FILTER SORT
export async function searchCounselingTypes(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<CounselingTypeItem[]>>(`/counseling-types/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari/memfilter data jenis konseling"),
    };
  }
}
