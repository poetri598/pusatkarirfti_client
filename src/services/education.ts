import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { EducationItem } from "@/types/education";

// ✅ CREATE
export async function createEducation(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ education_id: number }>>("/educations", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat data pendidikan"),
    };
  }
}

// ✅ GET ALL
export async function getEducationAll() {
  try {
    const res = await api.get<ApiResponse<EducationItem[]>>("/educations");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data pendidikan"),
    };
  }
}

// ✅ GET BY ID
export async function getEducationById(education_id: number) {
  try {
    const res = await api.get<ApiResponse<EducationItem>>(`/educations/${education_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil detail pendidikan"),
    };
  }
}

// ✅ UPDATE
export async function updateEducationById(education_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/educations/${education_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui data pendidikan"),
    };
  }
}

// ✅ DELETE
export async function deleteEducationById(education_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/educations/${education_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data pendidikan"),
    };
  }
}

// ✅ SEARCH FILTER SORT
export async function searchEducations(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<EducationItem[]>>(`/educations/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari/memfilter data pendidikan"),
    };
  }
}
