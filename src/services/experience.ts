import api from "@/utils/api";
import { extractErrorMessage } from "@/utils/helpers";
import type { ApiResponse } from "@/utils/responseController";
import type { ExperienceItem } from "@/types/experience";

// ✅ CREATE
export async function createExperience(payload: FormData) {
  try {
    const res = await api.post<ApiResponse<{ experience_id: number }>>("/experiences", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal membuat data pengalaman"),
    };
  }
}

// ✅ GET ALL
export async function getAllExperiences() {
  try {
    const res = await api.get<ApiResponse<ExperienceItem[]>>("/experiences");
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil data pengalaman"),
    };
  }
}

// ✅ GET BY ID
export async function getExperienceById(experience_id: number) {
  try {
    const res = await api.get<ApiResponse<ExperienceItem>>(`/experiences/${experience_id}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mengambil detail pengalaman"),
    };
  }
}

// ✅ UPDATE
export async function updateExperienceById(experience_id: number, payload: FormData) {
  try {
    const res = await api.put<ApiResponse<null>>(`/experiences/${experience_id}`, payload, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal memperbarui data pengalaman"),
    };
  }
}

// ✅ DELETE
export async function deleteExperienceById(experience_id: number) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/experiences/${experience_id}`);
    if (res.data.status === "success") {
      return { success: true };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal menghapus data pengalaman"),
    };
  }
}

// ✅ SEARCH FILTER SORT
export async function searchExperiences(filters: Record<string, any>) {
  try {
    const cleanedFilters: Record<string, string> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        cleanedFilters[key] = String(value);
      }
    });

    const query = new URLSearchParams(cleanedFilters).toString();
    const res = await api.get<ApiResponse<ExperienceItem[]>>(`/experiences/search?${query}`);
    if (res.data.status === "success") {
      return { success: true, data: res.data.data };
    }
    return { success: false, error: res.data.message };
  } catch (err) {
    return {
      success: false,
      error: extractErrorMessage(err, "Gagal mencari/memfilter data pengalaman"),
    };
  }
}
